import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2025-06-08",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query = `*[_type == "menuItem"]{
      _id,
      name,
      description,
      price,
      category,
      isSpicy,
      isVegetarian,
      "image": image.asset->url
    }`;

    const menuItems = await client.fetch(query);
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Error fetching menu items" });
  }
}
