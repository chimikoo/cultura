import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

// Fetch categories
export async function GET() {
  const query = groq`*[_type == "category"]{
    _id,
    title,
    "slug": slug.current
  } | order(title asc)`;

  const categories = await client.fetch(query);

  return NextResponse.json(categories);
}
