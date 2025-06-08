// /schemas/menuItem.ts
import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (in euros)",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Mains", value: "mains" },
          { title: "Appetizers", value: "appetizers" },
          { title: "Desserts", value: "desserts" },
          { title: "Beverages", value: "beverages" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isVegetarian",
      title: "Vegetarian",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isSpicy",
      title: "Spicy",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
