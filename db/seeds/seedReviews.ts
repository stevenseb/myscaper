import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { reviews, providers } from "../schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.development" });

export const seedReviews = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  // Fetch existing provider IDs
  const providerIds = await db.select({ id: providers.id }).from(providers);

  // Generate dummy data for reviews
  const data = Array.from({ length: 40 }, () => ({
    rating: faker.number.int({ min: 1, max: 5 }),
    content: faker.lorem.paragraph(),
    providerID: Number(faker.helpers.arrayElement(providerIds).id),
  }));

  console.log("Seeding reviews...");

  await db.insert(reviews).values(data);

  console.log("Reviews seeding complete");
};

seedReviews().catch((error) => console.error(error));
