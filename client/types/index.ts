// /types/index.ts
export interface Category {
  _id: string
  title: string
  slug: { current: string }
}

export interface NewsPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content?: any[]
  category?: Category
  publishedAt: string
  author: string
  featuredImage?: string
}

export interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: string
  isVegetarian?: boolean
  isSpicy?: boolean
  image?: string
}