import { z } from "zod";

// Define regex patterns for phone and zip code validation
const phoneRegex = /^[0-9]{10}$/;
const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

// List of valid US states (use 'as const' to treat it as a tuple)
const stateList = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
] as const; // Use 'as const' to make this a readonly tuple

// Define a Zod schema for user input validation
export const userSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number format" }),
  secondaryPhone: z.string().regex(phoneRegex).optional(),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.enum(stateList), // Pass the tuple directly to z.enum()
  zip: z.string().regex(zipRegex, { message: "Invalid ZIP code format" }),
});

// Define a TypeScript interface for user data (matching Zod schema)
interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  address: string;
  city: string;
  state: (typeof stateList)[number]; // This ensures state is one of the valid states
  zip: string;
}

// Example usage in a form handler or API route
export const validateUserInput = (data: UserData) => {
  try {
    userSchema.parse(data); // Validate using Zod schema
    return { success: true }; // Return success if validation passes
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return success as false and include detailed error messages
      return { success: false, errors: error.errors };
    } else {
      // In case it's another type of error
      return {
        success: false,
        errors: [{ message: "Unknown error occurred" }],
      };
    }
  }
};
