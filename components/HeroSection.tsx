import { HeroSectionData } from "@/lib/responseType";
import heroImage from "@images/hero-coffee.webp";
import Image from "next/image";

export function HeroSection({
  headline,
  subheadline,
  whatsApp,
}: HeroSectionData) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="خدمة القهوة العربية الفاخرة"
          className="w-full h-full object-cover"
          priority
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[hsl(var(--coffee-dark)/0.7)] via-[hsl(var(--coffee-dark)/0.5)] to-[hsl(var(--coffee-dark)/0.8)]" />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[hsl(var(--cream))] mb-6 leading-tight">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[hsl(var(--cream)/0.8)] mb-10 max-w-2xl mx-auto leading-relaxed">
            {subheadline}{" "}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              target="_blank"
              href={`https://wa.me/${whatsApp?.includes("+") ? whatsApp.split("+").join("") : whatsApp}?text=`}
              className="bg-main-color hover:opacity-85 text-white text-lg px-8 py-4 rounded-lg shadow-[0_4px_20px_hsl(var(--shadow-gold))] transition-all">
              احجز خدمتك الآن
            </a>
            <a
              href="#services"
              className="border border-[hsl(var(--cream)/0.3)] bg-[hsl(var(--cream)/1)] text-black/60 hover:bg-[hsl(var(--cream)/0.1)] hover:text-white text-lg px-8 py-4 rounded-lg transition-all duration-500">
              تعرف على خدماتنا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
