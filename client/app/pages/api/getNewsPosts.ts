import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

// Fetch news posts
export async function GET() {
  const query = groq`*[_type == "newsPost"]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    publishedAt,
    author,
    "featuredImage": featuredImage.asset->url,
    "category": category->{_id, title, "slug": slug.current}
  } | order(publishedAt desc)`;

  const newsPosts = await client.fetch(query);

  return NextResponse.json(newsPosts);
}
