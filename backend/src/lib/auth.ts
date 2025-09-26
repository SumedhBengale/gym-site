import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

// Define Role enum
export enum Role {
  STUDENT = "STUDENT",
  CREATOR = "CREATOR",
  ADMIN = "ADMIN",
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  // Allow requests from the frontend development server
  trustedOrigins: ["http://localhost:5173"],
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL as string,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    // Uncomment when you have GitHub OAuth credentials
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // },
  },
  user: {
    additionalFields: {
      roles: {
        type: [Role.STUDENT, Role.CREATOR, Role.ADMIN],
        required: true,
        defaultValue: [Role.STUDENT],
      },
    },
  },
});
