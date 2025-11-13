import { BASE_API_URL } from "@/shared/lib/utils";
import { createAuthClient } from "better-auth/react"

export const authService = createAuthClient({
  baseURL: BASE_API_URL,
});
