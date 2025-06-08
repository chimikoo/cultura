"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Calendar, User, Share2, Clock, Copy, Check, Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { NewsPost } from "@/types";
import { urlFor } from "@/lib/sanity.image"; // Import the helper!

interface NewsModalProps {
  post: NewsPost;
  onClose: () => void;
  formatDate: (dateString: string) => string;
}

export function NewsModal({ post, onClose, formatDate }: NewsModalProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper to get image URL
  const getImageSrc = (image: any, width: number = 600) => {
    return image ? urlFor(image).width(width).url() : "/placeholder.svg";
  };

  // Render content
  const renderContent = (content: any[]) => {
    if (!content) return null;
    return content.map((block, index) => {
      if (block._type === "block") {
        return (
          <p key={index} className="text-mocha-700 leading-relaxed mb-6">
            {block.children?.map((child: any, i: number) => (
              <span key={i}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  };

  // Clipboard
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/news/${post.slug.current}`;
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log("Failed to copy:", error);
    }
  };

  // Social sharing
  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    let shareLink = "";
    if (platform === "facebook") shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    if (platform === "twitter") shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
    if (platform === "linkedin") shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    window.open(shareLink, "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  const estimatedReadTime = Math.ceil((post.content?.length || 3) * 1.5);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
        <div className="relative">
          {post.featuredImage && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={getImageSrc(post.featuredImage)}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 bg-white/90">
            <X className="h-5 w-5" />
          </Button>
          <div className="absolute top-4 left-4">
            <Badge className="bg-burgundy-600 text-white">{post.category?.title}</Badge>
          </div>
        </div>
        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-mocha-900 mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-mocha-600 mb-6 pb-6 border-b border-mocha-200">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDate(post.publishedAt)}</div>
            <div className="flex items-center gap-2"><User className="h-4 w-4" />{post.author}</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{estimatedReadTime} min read</div>
          </div>
          <div className="bg-forest-50 border-l-4 border-forest-400 p-4 mb-8 rounded-r-lg">
            <p className="text-lg text-mocha-800 italic leading-relaxed">{post.excerpt}</p>
          </div>
          <div className="prose prose-lg max-w-none">{post.content ? renderContent(post.content) : null}</div>
        </div>
        <div className="border-t border-mocha-200 p-6 md:p-8 bg-mocha-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-mocha-600">Published in <span className="font-semibold text-burgundy-600">{post.category?.title}</span></div>
            <div className="flex items-center gap-3 relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="border-burgundy-200 text-burgundy-700 hover:bg-burgundy-50"
              >
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-mocha-200 p-2 min-w-[200px] z-10">
                  <button onClick={copyToClipboard} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-mocha-700 hover:bg-mocha-50 rounded-md transition-colors">
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button onClick={() => shareToSocial("facebook")} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-mocha-700 hover:bg-mocha-50 rounded-md">
                    <Facebook className="h-4 w-4 text-blue-600" /> Share on Facebook
                  </button>
                  <button onClick={() => shareToSocial("twitter")} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-mocha-700 hover:bg-mocha-50 rounded-md">
                    <Twitter className="h-4 w-4 text-blue-400" /> Share on Twitter
                  </button>
                  <button onClick={() => shareToSocial("linkedin")} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-mocha-700 hover:bg-mocha-50 rounded-md">
                    <Linkedin className="h-4 w-4 text-blue-700" /> Share on LinkedIn
                  </button>
                </div>
              )}
              <Button size="sm" className="bg-burgundy-600 hover:bg-burgundy-700 text-white" onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
