"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "News", href: "#news" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = (href: string) => {
    const target = document.getElementById(href.slice(1))
    target?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false) // Close mobile menu after navigation
  }

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
                  onClick={() => handleNavClick(item.href)}
                  className="text-mocha-800 hover:text-burgundy-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick("#contact")}
              className="bg-burgundy-700 hover:bg-burgundy-800 text-white px-4 py-2 rounded"
            >
              Reserve Table
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full h-5/6 sm:w-80 p-0 [&>button]:hidden">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for mobile devices</SheetDescription>
                <div className="flex flex-col h-full bg-white">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-stone-200">
                    <h2 className="text-xl font-bold text-burgundy-700">Cultura</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2 px-6">
                      {navItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleNavClick(item.href)}
                          className="w-full text-left px-4 py-4 text-lg font-medium text-mocha-800 hover:text-burgundy-600 hover:bg-stone-50 rounded-lg transition-colors"
                        >
                          {item.name}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Reserve Button */}
                  <div className="p-6 border-t border-stone-200">
                    <Button
                      onClick={() => handleNavClick("#contact")}
                      className="w-full bg-burgundy-700 hover:bg-burgundy-800 text-white py-4 text-lg font-medium"
                    >
                      Reserve Table
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
