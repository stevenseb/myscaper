import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobs, providers, users } from "../schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.development" });

export const seedJobs = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  // Fetch existing provider and user IDs
  const providerIds = await db.select({ id: providers.id }).from(providers);
  const userIds = await db.select({ id: users.id }).from(users);

  // Generate dummy data for jobs
  const data = Array.from({ length: 30 }, () => ({
    dateRequested: faker.date.past().toISOString(),
    dateOfService: faker.date.future().toISOString(),
    services: faker.helpers.arrayElements(
      ["lawncare", "hedge-trim", "tree-trim"],
      { min: 1, max: 3 }
    ),
    status: faker.helpers.arrayElement([
      "pending",
      "scheduled",
      "completed",
      "cancelled",
    ]),
    paid: faker.datatype.boolean(),
    jobRating: faker.number.int({ min: 1, max: 5 }),
    jobFeedback: faker.lorem.paragraph(),
    quoteImages: [faker.image.url(), faker.image.url()],
    beforeImage: faker.image.url(),
    afterImage: faker.image.url(),
    providerID: Number(faker.helpers.arrayElement(providerIds).id),
    userID: Number(faker.helpers.arrayElement(userIds).id),
  }));

  console.log("Seeding jobs...");

  await db.insert(jobs).values(data);

  console.log("Jobs seeding complete");
};

seedJobs().catch((error) => console.error(error));
