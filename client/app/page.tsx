import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Menu } from "@/components/menu"
import { Contact } from "@/components/contact"
import { Navbar } from "@/components/navbar"
import { News } from "@/components/news"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero />
      <News />
      <About />
      <Menu />
      <Contact />
    </main>
  )
}
