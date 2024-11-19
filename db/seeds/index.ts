// db/seeds/index.ts

import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env.local" });

import { seedUsers } from "./seedUser.js";
import { seedProviders } from "./seedProvider.js";
import { seedJobs } from "./seedJob.js";
import { seedPosts } from "./seedPost.js";
import { seedReviews } from "./seedReview.js";
import { seedMessages } from "./seedMessage.js";

const runAllSeeds = async () => {
  try {
    await seedUsers();
    await seedProviders();
    await seedJobs();
    await seedPosts();
    await seedReviews();
    await seedMessages();

    console.log("All seeds completed successfully.");
  } catch (error) {
    console.error("Error running seeds:", error);
  }
};

runAllSeeds();
