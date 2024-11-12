CREATE TABLE IF NOT EXISTS "providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_name" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" varchar NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" varchar NOT NULL,
	"zip" varchar NOT NULL,
	"service_area" varchar[] NOT NULL,
	"available_hours" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"username" text NOT NULL,
	"hashed_password" text NOT NULL,
	"email" text NOT NULL,
	"phone" varchar NOT NULL,
	"secondary_phone" varchar,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" varchar NOT NULL,
	"zip" varchar NOT NULL,
	"notes" text,
	"services_interested" text[],
	"current_providers" varchar[],
	"stored_payment_methods" text[]
);
