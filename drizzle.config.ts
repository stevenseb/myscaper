// drizzle.config.ts

import type { Config } from "drizzle-kit"; // Import the type for Config
import * as dotenv from "dotenv"; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

export default {
  schema: "./db/schema.ts", // Path to your schema definition file
  out: "./db/migrations", // Output folder for migrations
  dialect: "postgresql", // Specify PostgreSQL as the dialect (not driver)
  dbCredentials: {
    host: process.env.POSTGRES_HOST as string,
    port: parseInt(process.env.POSTGRES_PORT as string, 10),
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
  },
} satisfies Config; // Ensure the object satisfies the Config type
