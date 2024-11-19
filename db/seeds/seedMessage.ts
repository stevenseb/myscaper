import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import { messages, users, providers } from "../schema.js";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env.local" });

export const seedMessages = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  // Fetch existing user and provider IDs
  const userIds = await db.select({ id: users.id }).from(users);
  const providerIds = await db.select({ id: providers.id }).from(providers);

  // Generate dummy data for messages
  const data = Array.from({ length: 50 }, () => {
    const isFromProvider = faker.datatype.boolean();
    return {
      providerID: faker.helpers.arrayElement(providerIds).id,
      userID: faker.helpers.arrayElement(userIds).id,
      content: faker.lorem.paragraph(),
      isFromProvider: isFromProvider,
      images: faker.helpers.maybe(() => [faker.image.url()] as string[], {
        probability: 0.3,
      }),
      files: faker.helpers.maybe(() => [faker.system.filePath()] as string[], {
        probability: 0.2,
      }),
    };
  });

  console.log("Seeding messages...");

  await db.insert(messages).values(data);

  console.log("Messages seeding complete");
};

seedMessages().catch((error) => console.error(error));
