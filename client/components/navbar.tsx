"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "News", href: "#news" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-stone-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-burgundy-700">Cultura</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const target = document.getElementById(item.href.slice(1));
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-mocha-800 hover:text-burgundy-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-burgundy-700 hover:bg-burgundy-800 text-white px-4 py-2 rounded"
            >
              Reserve Table
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-stone-200">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const target = document.getElementById(item.href.slice(1)); // Remove '#' for id
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-mocha-800 hover:text-burgundy-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}

            <div className="px-3 py-2">
              <Button className="w-full bg-burgundy-700 hover:bg-burgundy-800 text-white">
                Reserve Table
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
