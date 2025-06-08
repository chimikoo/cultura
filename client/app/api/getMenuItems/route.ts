// client/app/api/getMenuItems/route.ts
import { client } from "@/lib/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
const query = `*[_type == "menuItem"]{
  _id,
  name,
  description,
  price,
  category,
  isSpicy,
  isVegetarian,
  image,
  showImage,
  showItem
}`;

    const menuItems = await client.fetch(query);
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return new NextResponse("Failed to fetch menu items", { status: 500 });
  }
}