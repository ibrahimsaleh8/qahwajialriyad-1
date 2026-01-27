import { AboutSectionData } from "@/lib/responseType";
import Image from "next/image";

export function AboutSection({
  description1,
  label,
  title,
  image,
}: AboutSectionData) {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            {image && (
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--shadow-luxury))]">
                <Image
                  src={image}
                  width={1000}
                  height={1000}
                  alt="خدمة الضيافة العربية"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Decorative Frame */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-main-color font-semibold text-sm tracking-wider mb-4 block">
              {label}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main-color mb-6">
              {title}
            </h2>
            <div className="w-20 h-1 bg-main-color mb-8" />

            <p className="text-low-color text-lg leading-relaxed mb-6">
              {description1}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-main-color block">
                  +500
                </span>
                <span className="text-low-color text-sm">مناسبة</span>
              </div>
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-main-color block">
                  +10
                </span>
                <span className="text-low-color text-sm">سنوات خبرة</span>
              </div>
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-main-color block">
                  100%
                </span>
                <span className="text-low-color text-sm">رضا العملاء</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
