// This file is deprecated - moved to src/lib/auth-client.ts
// Keeping this for temporary backward compatibility
import { signIn } from "../lib/auth-client";

// Legacy export for existing components
export const signInWithGoogle = async () => {
  await signIn.social(
    { provider: "google" },
    {
      onSuccess: () => {
        console.log("Successfully signed in with Google");
        // Redirect will be handled by Better Auth
      },
      onError: (error: unknown) => {
        console.error("Google sign-in error:", error);
      },
    }
  );
};
