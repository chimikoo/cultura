import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_chef.png"
          alt="Delicious food spread"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-mocha-900/60" />
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Taste the
          <span className="text-forest-200 block">Culture</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-mocha-100 max-w-2xl mx-auto">
          Where authentic flavors meet modern culinary artistry. Experience a journey through global food culture.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-burgundy-700 hover:bg-burgundy-800 text-lg px-8 py-3">
            Explore Menu
          </Button>
          <Button
            size="lg"
            className="text-white bg-[rgb(66,111,92)] hover:bg-white hover:text-stone-900 text-lg px-8 py-3"
          >
            Our Story
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white" />
      </div>
    </section>
  )
}
