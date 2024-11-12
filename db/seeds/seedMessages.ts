import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { messages, users } from "../schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.development" });

export const seedMessages = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  // Fetch existing user IDs
  const userIds = await db.select({ id: users.id }).from(users);

  // Generate dummy data for messages
  const data = Array.from({ length: 50 }, () => {
    const [sender, recipient] = faker.helpers.arrayElements(userIds, 2);
    return {
      sender: Number(sender.id),
      recipient: Number(recipient.id),
      content: faker.lorem.paragraph(),
      images: faker.helpers.maybe(() => [faker.image.url()] as string[], {
        probability: 0.3,
      }),
    };
  });

  console.log("Seeding messages...");

  await db.insert(messages).values(data);

  console.log("Messages seeding complete");
};

seedMessages().catch((error) => console.error(error));
