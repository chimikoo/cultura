import { client } from "@/lib/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `
      *[_type == "newsPost"]{
        _id,
        title,
        "slug": slug.current,
        excerpt,
        content,
        publishedAt,
        author,
        featuredImage,
        "category": category->{
          _id,
          title,
          "slug": slug.current
        }
      } | order(publishedAt desc)
    `;
    const posts = await client.fetch(query);
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch news posts", { status: 500 });
  }
}
