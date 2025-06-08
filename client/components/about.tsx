import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-20 bg-mocha-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-stone-900 mb-6">
              Celebrating Food
              <span className="text-burgundy-700 block">Heritage</span>
            </h2>
            <p className="text-lg text-mocha-700 mb-6 leading-relaxed">
              At Cultura, we believe food is more than sustenance—it's a bridge between cultures, a storyteller of
              traditions, and a celebration of human creativity. Our kitchen is where time-honored recipes meet
              innovative techniques.
            </p>
            <p className="text-lg text-mocha-700 mb-8 leading-relaxed">
              Every dish tells a story, sourced from local farmers and inspired by global traditions. We're not just
              serving meals; we're preserving culinary heritage while creating new memories.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-burgundy-600 mb-2">15+</h3>
                <p className="text-mocha-700">Years of Excellence</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-burgundy-600 mb-2">50+</h3>
                <p className="text-mocha-700">Signature Dishes</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/news_carrot.png"
              alt="Chef preparing food"
              width={500}
              height={600}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-12 bg-forest-600 text-white p-4 rounded-lg shadow-lg">
              <p className="font-semibold text-lg">Farm to Table</p>
              <p className="text-sm opacity-90">Fresh ingredients daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
