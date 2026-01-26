import gallery1 from "@images/gallary-1.webp";
import gallery2 from "@images/gallary-2.webp";
import gallery3 from "@images/gallary-3.webp";
import gallery4 from "@images/gallary-4.webp";
import gallery5 from "@images/gallary-5.webp";
import gallery6 from "@images/gallary-6.webp";
import Image from "next/image";

const images = [
  { src: gallery1, alt: "حفل زفاف فاخر" },
  { src: gallery2, alt: "فعالية شركات" },
  { src: gallery3, alt: "خدمة القهوة العربية" },
  { src: gallery4, alt: "أواني القهوة الفاخرة" },
  { src: gallery5, alt: "ضيافة عربية أصيلة" },
  { src: gallery6, alt: "مناسبة خاصة" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-[hsl(var(--secondary))]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[hsl(var(--primary))] font-semibold text-sm tracking-wider mb-4 block">
            معرض الصور
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-6">
            لقطات من{" "}
            <span className="text-[hsl(var(--primary))]">مناسباتنا</span>
          </h2>
          <div className="w-20 h-1 bg-[hsl(var(--primary))] mx-auto mb-6" />
          <p className="text-[hsl(var(--muted-foreground))] text-lg">
            نعتز بثقة عملائنا ونفخر بمشاركتكم لحظات من أعمالنا السابقة
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative bg-white/60 overflow-hidden rounded-2xl cursor-pointer group shadow-soft hover:shadow-luxury transition-all duration-300`}>
              <div className={`aspect-square `}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-[hsl(var(--coffee-dark)/0)] group-hover:bg-[hsl(var(--coffee-dark)/0.4)] transition-colors duration-300 flex items-center justify-center rounded-2xl">
                <span className="text-[hsl(var(--cream))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold text-center px-2">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
