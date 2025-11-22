import Image from "next/image"

const galleryImages = [
  {
    src: "/sri-lankan-dancers.png",
    alt: "Traditional Kandyan Dancers",
    class: "md:row-span-2",
  },
  {
    src: "/beach-sunset.png",
    alt: "Golden Sunsets",
    class: "",
  },
  {
    src: "/temple-ruins.png",
    alt: "Ancient History",
    class: "",
  },
  {
    src: "/kandy-perahera.png",
    alt: "Kandy Esala Perahera",
    class: "md:row-span-2",
  },
  {
    src: "/hero-sri-lanka.png",
    alt: "Scenic Landscapes",
    class: "",
  },
  {
    src: "/beach-sunset.png",
    alt: "Coastal Vibes",
    class: "",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-tropical-turquoise font-semibold tracking-wider uppercase text-sm">Travel Gallery</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-navy mt-3">Moments from Ceylon</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[800px] md:h-[600px]">
          {/* Custom Masonry-style Grid using CSS Grid */}
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden group ${i === 0
                  ? "col-span-2 row-span-2"
                  : i === 3
                    ? "col-span-1 row-span-2 md:col-span-1"
                    : "col-span-1 row-span-1"
                }`}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <p className="text-white font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
