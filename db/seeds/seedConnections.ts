import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import { users, providers, userProviderConnections } from "../schema.js";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env.local" });

export const seedUserProviderConnections = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  // Fetch existing user and provider IDs
  const userIds = await db.select({ id: users.id }).from(users);
  const providerIds = await db.select({ id: providers.id }).from(providers);

  // Generate connections
  const connections = [];
  const connectionSet = new Set(); // To ensure unique connections

  for (let i = 0; i < 50; i++) {
    // Adjust the number of connections as needed
    const userId = faker.helpers.arrayElement(userIds).id;
    const providerId = faker.helpers.arrayElement(providerIds).id;
    const connectionKey = `${userId}-${providerId}`;

    if (!connectionSet.has(connectionKey)) {
      connections.push({
        userId,
        providerId,
      });
      connectionSet.add(connectionKey);
    }
  }

  console.log("Seeding user-provider connections...");

  // Insert connections in batches to avoid potential issues with large datasets
  const batchSize = 100;
  for (let i = 0; i < connections.length; i += batchSize) {
    const batch = connections.slice(i, i + batchSize);
    await db.insert(userProviderConnections).values(batch);
  }

  console.log("User-provider connections seeding complete");

  await client.end();
};

seedUserProviderConnections().catch((error) => console.error(error));
