// db/seeds/seedUser.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import { users } from "../schema.js";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: ".env.local" });

console.log(process.env.DATABASE_URL);

export const seedUsers = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  const plainPassword = "password";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Generate dummy data for users with the same hashed password of "password"
  const data = Array.from({ length: 20 }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.username(),
    hashedPassword,
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    secondaryPhone: faker.string.numeric(10),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zip: faker.location.zipCode("#####"),
    notes: faker.lorem.paragraph(),
    servicesInterested: faker.lorem.words(3).split(" "),
    currentProviders: faker.lorem.words(3).split(" "),
    points: faker.number.int(100),
    profileImage: faker.image.avatar(),
  }));

  console.log("Seeding users...");

  await db.insert(users).values(data);

  console.log("Users seeding complete");
};

seedUsers().catch((error) => console.error(error));
