import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-06-08",
  useCdn: false,
});

async function test() {
  try {
    const datasets = await client.datasets.list();
    console.log("✅ Connection successful! Datasets:", datasets);
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

test();
