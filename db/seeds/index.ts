// db/seeds/index.ts

import * as dotenv from "dotenv";
dotenv.config({ path: "../.env.local" });

import { seedUsers } from "./seedUser";
import { seedProviders } from "./seedProvider";

const runAllSeeds = async () => {
  try {
    await seedUsers();
    await seedProviders();

    console.log("All seeds completed successfully.");
  } catch (error) {
    console.error("Error running seeds:", error);
  }
};

runAllSeeds();
