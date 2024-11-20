// src/db/seeds/seedProvider.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import { providers } from "../schema.js";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const seedProviders = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  // Generate dummy data for providers
  const data = Array.from({ length: 10 }, () => ({
    businessName: faker.company.name(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zip: faker.location.zipCode("#####"),
    serviceArea: [
      faker.location.zipCode("#####"),
      faker.location.zipCode("#####"),
    ],
    availableHours: ["08:00", "17:00"],
    services: ["lawncare", "hedge-trim", "tree-trim"],
    profileImage: faker.image.avatar(),
    logoImage: faker.image.url(),
    showcaseImages: [faker.image.url(), faker.image.url()],
  }));

  console.log("Seeding providers...");

  await db.insert(providers).values(data);

  console.log("Providers seeding complete");
};

seedProviders().catch((error) => console.error(error));
