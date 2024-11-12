import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { posts, providers } from "../schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.development" });

export const seedPosts = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  // Fetch existing provider IDs
  const providerIds = await db.select({ id: providers.id }).from(providers);

  // Generate dummy data for posts
  const data = Array.from({ length: 25 }, () => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    images: faker.helpers.maybe(
      () => [faker.image.url(), faker.image.url()] as string[],
      {
        probability: 0.7,
      }
    ),
    upvotes: faker.number.int({ min: 0, max: 100 }),
    providerID: Number(faker.helpers.arrayElement(providerIds).id),
  }));

  console.log("Seeding posts...");

  await db.insert(posts).values(data);

  console.log("Posts seeding complete");
};

seedPosts().catch((error) => console.error(error));
