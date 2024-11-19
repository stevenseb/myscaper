import { relations } from "drizzle-orm";
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
  primaryKey,
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
  points: integer("points").default(0).notNull(),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userProviderConnections: many(userProviderConnections),
  jobs: many(jobs),
  messages: many(messages),
}));

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

export const providersRelations = relations(providers, ({ many }) => ({
  userProviderConnections: many(userProviderConnections),
  jobs: many(jobs),
  messages: many(messages),
  reviews: many(reviews),
  posts: many(posts),
}));

// Connected users and providers table
export const userProviderConnections = pgTable(
  "user_provider_connections",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.providerId] }),
  })
);

export const userProviderConnectionsRelations = relations(
  userProviderConnections,
  ({ one }) => ({
    user: one(users, {
      fields: [userProviderConnections.userId],
      references: [users.id],
    }),
    provider: one(providers, {
      fields: [userProviderConnections.providerId],
      references: [providers.id],
    }),
  })
);

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
  providerID: uuid("provider_id")
    .notNull()
    .references(() => providers.id),
  userID: uuid("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const jobsRelations = relations(jobs, ({ one }) => ({
  provider: one(providers, {
    fields: [jobs.providerID],
    references: [providers.id],
  }),
  user: one(users, {
    fields: [jobs.userID],
    references: [users.id],
  }),
}));

// Message table
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  providerID: uuid("provider_id")
    .notNull()
    .references(() => providers.id),
  userID: uuid("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  isFromProvider: boolean("is_from_provider").notNull(),
  images: text("images").array(),
  files: text("files").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  provider: one(providers, {
    fields: [messages.providerID],
    references: [providers.id],
  }),
  user: one(users, {
    fields: [messages.userID],
    references: [users.id],
  }),
}));

// Reviews table
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  providerID: uuid("provider_id")
    .notNull()
    .references(() => providers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  provider: one(providers, {
    fields: [reviews.providerID],
    references: [providers.id],
  }),
}));

// Posts table
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  images: text("images").array(),
  upvotes: integer("upvotes").default(0).notNull(),
  providerID: uuid("provider_id")
    .notNull()
    .references(() => providers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  provider: one(providers, {
    fields: [posts.providerID],
    references: [providers.id],
  }),
}));
