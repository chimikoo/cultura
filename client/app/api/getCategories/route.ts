// /app/api/getCategories/route.ts
import { client } from "@/lib/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `*[_type == "category"]{ _id, title, "slug": slug.current }`;
    const categories = await client.fetch(query);
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch categories", { status: 500 });
  }
}

