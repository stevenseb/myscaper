import {
  pgTable,
  text,
  serial,
  varchar,
  boolean,
  date,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

// Define the PostgreSQL table schema for users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  username: text("username").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  secondaryPhone: varchar("secondary_phone"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 5 }).notNull(),
  notes: text("notes"),
  servicesInterested: text("services_interested").array(),
  currentProviders: text("current_providers").array(),
});

// Define the PostgreSQL table schema for providers
export const providers = pgTable("providers", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 5 }).notNull(),
  services: text("services").array().notNull(),
  serviceArea: varchar("service_area", { length: 5 }).array().notNull(),
  availableHours: text("available_hours").array().notNull(),
});

// Define the status enum
const jobStatusEnum = pgEnum("job_status", [
  "scheduled",
  "completed",
  "cancelled",
]);

// Jobs table
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  dateRequested: date("date_requested").notNull(),
  dateOfService: date("date_of_service").notNull(),
  services: text("services").array().notNull(),
  status: jobStatusEnum("status").notNull(),
  paid: boolean("paid").notNull().default(false),
  providerID: integer("provider_id").notNull(),
  userID: integer("user_id").notNull(),
});

// Message table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  sender: integer("sender").notNull(),
  recipient: integer("recipient").notNull(),
  content: text("content").notNull(),
  images: text("images").array(),
});
