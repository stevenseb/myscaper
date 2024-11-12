// src/db/seeds/seedProvider.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { providers } from "../schema"; // Import providers schema
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.development" });

export const seedProviders = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  // Generate dummy data for providers
  const data = Array.from({ length: 10 }, () => ({
    businessName: faker.company.name(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.string.numeric(10),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zip: faker.location.zipCode("#####"),
    serviceArea: [
      faker.location.zipCode("#####"),
      faker.location.zipCode("#####"),
    ],
    availableHours: JSON.stringify({ start: "08:00", end: "17:00" }),
  }));

  console.log("Seeding providers...");

  await db.insert(providers).values(data);

  console.log("Providers seeding complete");
};

seedProviders().catch((error) => console.error(error));
