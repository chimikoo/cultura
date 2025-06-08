// /lib/sanity.client.ts
import { createClient } from "next-sanity"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2025-08-06", // use the current date
  useCdn: false, // false for fresh data (true for cached data in production)
})
