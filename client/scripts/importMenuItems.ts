import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("Loaded environment variables:");
console.log({
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  SANITY_DATASET: process.env.SANITY_DATASET,
  SANITY_API_TOKEN: process.env.SANITY_API_TOKEN?.slice(0, 10) + "..."
});

// Setup Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-06-08",
  useCdn: false,
});

// The data you want to import
const mockMenuItems = [
  {
    name: "Heritage Paella",
    description: "Traditional Spanish rice dish with saffron, seafood, and locally sourced vegetables",
    price: 28,
    category: "mains",
    isSpicy: true,
  },
  {
    name: "Artisan Bruschetta",
    description: "House-made sourdough topped with heirloom tomatoes, basil, and aged balsamic",
    price: 14,
    category: "appetizers",
    isVegetarian: true,
  },
  {
    name: "Miso Glazed Salmon",
    description: "Wild-caught salmon with miso glaze, served with seasonal vegetables and jasmine rice",
    price: 32,
    category: "mains",
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla bean ice cream",
    price: 12,
    category: "desserts",
    isVegetarian: true,
  },
  {
    name: "Craft Cocktail Selection",
    description: "House-crafted cocktails featuring local spirits and fresh ingredients",
    price: 15,
    category: "beverages",
  },
  {
    name: "Mediterranean Bowl",
    description: "Quinoa, roasted vegetables, feta cheese, olives, and tahini dressing",
    price: 18,
    category: "mains",
    isVegetarian: true,
  },
  {
    name: "Truffle Mushroom Risotto",
    description: "Creamy risotto with wild mushrooms, white truffle oil, and parmesan cheese",
    price: 24,
    category: "mains",
    isVegetarian: true,
  },
  {
    name: "Crispy Calamari",
    description: "Lightly battered and fried calamari served with lemon aioli",
    price: 16,
    category: "appetizers",
  },
  {
    name: "Lamb Kofta Skewers",
    description: "Spiced lamb skewers with tzatziki sauce and grilled flatbread",
    price: 20,
    category: "mains",
  },
  {
    name: "Grilled Vegetable Platter",
    description: "Seasonal grilled vegetables with chimichurri sauce",
    price: 14,
    category: "appetizers",
    isVegetarian: true,
  },
  {
    name: "Spicy Tuna Tartare",
    description: "Fresh tuna tartare with avocado, sesame, and crispy wontons",
    price: 22,
    category: "appetizers",
    isSpicy: true,
  },
  {
    name: "Charcuterie Board",
    description: "Selection of cured meats, cheeses, olives, and artisanal bread",
    price: 25,
    category: "appetizers",
  },
  {
    name: "Classic Margherita Pizza",
    description: "Wood-fired pizza with tomato sauce, fresh mozzarella, and basil",
    price: 18,
    category: "mains",
    isVegetarian: true,
  },
  {
    name: "House Salad",
    description: "Mixed greens, cherry tomatoes, cucumber, and a light vinaigrette",
    price: 10,
    category: "appetizers",
    isVegetarian: true,
  },
  {
    name: "Lemon Sorbet",
    description: "Refreshing lemon sorbet for a light and tangy finish",
    price: 8,
    category: "desserts",
    isVegetarian: true,
  },
];


async function importMenuItems() {
  try {
    const created = await Promise.all(
      mockMenuItems.map(async (item) => {
        // Fill in any missing booleans with `false`
        const doc = {
          _type: "menuItem",
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          isVegetarian: item.isVegetarian ?? false,
          isSpicy: item.isSpicy ?? false,
        };

        return await client.create(doc);
      })
    );

    console.log("✅ Successfully imported menu items:");
    created.forEach((doc) => {
      console.log(`- ${doc.name} (${doc._id})`);
    });
  } catch (error) {
    console.error("❌ Error importing menu items:", error);
  }
}

importMenuItems();
