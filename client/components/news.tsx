"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import { NewsModal } from "./news-modal";
import { NewsPost, Category } from "@/types";
import { urlFor } from "@/lib/sanity.image";

export function News() {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch("/api/getNewsPosts"),
          fetch("/api/getCategories"),
        ]);
        const postsData: NewsPost[] = await postsRes.json();
        const categoriesData: Category[] = await categoriesRes.json();
        console.log("Fetched posts:", postsData);
        console.log("Fetched categories:", categoriesData);
        setNewsPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts =
    activeCategory === "all"
      ? newsPosts
      : newsPosts.filter(
          (post) => (post.category?.slug ?? "") === activeCategory
        );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePostClick = (post: NewsPost) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const getImageSrc = (image: any, width: number = 600) => {
    return image ? urlFor(image).width(width).url() : "/placeholder.svg";
  };

  if (loading) {
    return (
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-burgundy-600" />
          <p className="mt-4 text-mocha-600">Loading latest news...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-mocha-900 mb-4">
              Latest <span className="text-burgundy-700">News</span>
            </h2>
            <p className="text-lg text-mocha-700 max-w-2xl mx-auto">
              Stay updated with the latest happenings at Cultura, new menu
              additions, and culinary stories.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-burgundy-700 text-white"
                  : "bg-mocha-100 text-mocha-700 hover:bg-burgundy-50"
              }`}
            >
              All News
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() =>
                  setActiveCategory(category.slug as unknown as string)
                }
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  activeCategory === (category.slug as unknown as string)
                    ? "bg-burgundy-700 text-white"
                    : "bg-mocha-100 text-mocha-700 hover:bg-burgundy-50"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <div className="mb-16">
              <div
                className="bg-gradient-to-r from-burgundy-50 to-forest-50 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => handlePostClick(filteredPosts[0])}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src={getImageSrc(filteredPosts[0].featuredImage)}
                      alt={filteredPosts[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-burgundy-100 text-burgundy-800 hover:bg-burgundy-200">
                      Featured • {filteredPosts[0].category?.title}
                    </Badge>
                    <h3 className="text-3xl font-bold text-mocha-900 mb-4 group-hover:text-burgundy-700 transition-colors">
                      {filteredPosts[0].title}
                    </h3>
                    <p className="text-mocha-700 mb-6 leading-relaxed">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-mocha-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(filteredPosts[0].publishedAt)}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {filteredPosts[0].author}
                      </div>
                    </div>
                    <Button className="w-fit bg-burgundy-700 hover:bg-burgundy-800 group/btn">
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Card
                key={post._id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getImageSrc(post.featuredImage)}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-mocha-800 hover:bg-white">
                      {post.category?.title}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-mocha-900 mb-3 line-clamp-2 group-hover:text-burgundy-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-mocha-700 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-mocha-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-burgundy-600 hover:text-burgundy-700 p-0 h-auto"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-mocha-600 text-lg">
                No news posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* News Modal */}
      {selectedPost && (
        <NewsModal
          post={selectedPost}
          onClose={closeModal}
          formatDate={formatDate}
        />
      )}
    </>
  );
}
