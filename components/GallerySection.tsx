import { GalleryImageData } from "@/lib/responseType";
import GallaryImage from "./GallaryImage";

export function GallerySection({ images }: { images: GalleryImageData[] }) {
  return (
    <section id="gallery" className="py-24 pt-5 bg-second-bg overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <GallaryImage
              key={index}
              index={index}
              alt={image.alt}
              url={image.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
