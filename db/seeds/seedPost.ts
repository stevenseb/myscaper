import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import { posts, providers } from "../schema.js";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

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
    providerID: faker.helpers.arrayElement(providerIds).id.toString(),
  }));

  console.log("Seeding posts...");

  await db.insert(posts).values(data);

  console.log("Posts seeding complete");
};

seedPosts().catch((error) => console.error(error));
