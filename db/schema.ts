import {
  pgTable,
  text,
  varchar,
  boolean,
  date,
  integer,
  pgEnum,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

// Define the PostgreSQL table schema for users
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  username: text("username").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  secondaryPhone: varchar("secondary_phone", { length: 10 }),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 5 }).notNull(),
  notes: text("notes"),
  servicesInterested: text("services_interested").array(),
  currentProviders: text("current_providers").array(),
  points: integer("points").default(0).notNull(),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define the PostgreSQL table schema for providers
export const providers = pgTable("providers", {
  id: uuid("id").defaultRandom().primaryKey(),
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
  profileImage: text("profile_image"),
  logoImage: text("logo_image"),
  showcaseImages: text("showcase_images").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define the status enum
const jobStatusEnum = pgEnum("job_status", [
  "pending",
  "scheduled",
  "completed",
  "cancelled",
]);

// Jobs table
export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  dateRequested: date("date_requested").notNull(),
  dateOfService: date("date_of_service").notNull(),
  services: text("services").array().notNull(),
  status: jobStatusEnum("status").notNull().default("pending"),
  paid: boolean("paid").notNull().default(false),
  jobRating: integer("job_rating"),
  jobFeedback: text("job_feedback"),
  quoteImages: text("quote_images").array(),
  beforeImage: text("before_image"),
  afterImage: text("after_image"),
  providerID: integer("provider_id")
    .notNull()
    .references(() => providers.id),
  userID: integer("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Message table
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  sender: integer("sender").notNull(),
  recipient: integer("recipient").notNull(),
  content: text("content").notNull(),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  providerID: integer("provider_id")
    .notNull()
    .references(() => providers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Posts table
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  images: text("images").array(),
  upvotes: integer("upvotes").default(0).notNull(),
  providerID: integer("provider_id")
    .notNull()
    .references(() => providers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
