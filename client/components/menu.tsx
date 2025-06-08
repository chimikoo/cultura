"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { MenuItem } from "@/types";

export function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch("/api/getMenuItems");
        const data: MenuItem[] = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = [
    "all",
    ...new Set(menuItems.map((item) => item.category)),
  ];
  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  if (loading) {
    return (
      <section id="menu" className="py-20 bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-burgundy-600" />
          <p className="mt-4 text-stone-600">Loading our delicious menu...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 bg-forest-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-mocha-900 mb-4">
            Our <span className="text-burgundy-700">Menu</span>
          </h2>
          <p className="text-lg text-mocha-700 max-w-2xl mx-auto">
            Discover our carefully crafted dishes, each telling a unique story
            of flavor and tradition.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                activeCategory === category
                  ? "bg-burgundy-700 text-white"
                  : "bg-white text-mocha-700 hover:bg-burgundy-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card
              key={item._id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.image && (
                <div className="h-48 bg-stone-200">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 35%" }}
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-stone-900">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-burgundy-600">
                    €{item.price}
                  </span>
                </div>
                <p className="text-mocha-700 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="flex gap-2">
                  {item.isVegetarian && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Vegetarian
                    </Badge>
                  )}
                  {item.isSpicy && (
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-800"
                    >
                      Spicy
                    </Badge>
                  )}
                  <Badge variant="outline" className="capitalize">
                    {item.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
