import { ServicesSectionData, ServiceItemData } from "@/lib/responseType";
import { LucideIcon } from "lucide-react";

import { Coffee, Users, Building2, Heart } from "lucide-react";

// Optional: map string names to actual Lucide icons
const iconMap: Record<string, LucideIcon> = {
  coffee: Coffee,
  users: Users,
  building: Building2,
  heart: Heart,
};

export function ServicesSection({
  description,
  items,
  label,
  title,
}: ServicesSectionData) {
  return (
    <section id="services" className="py-24 bg-second-bg">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-main-color font-semibold text-sm tracking-wider mb-4 block">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main-color mb-6">
            {title}
          </h2>
          <div className="w-20 h-1 bg-main-color mx-auto mb-6" />
          <p className="text-low-color text-lg">{description}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items &&
            items.map((service: ServiceItemData) => {
              // Determine icon component
              const IconComponent =
                iconMap[service.icon ? service.icon.toLowerCase() : ""] ||
                Coffee;

              return (
                <div key={service.title} className="group">
                  <div className="bg-main-bg rounded-2xl p-8 h-full shadow-[0_4px_20px_hsl(var(--shadow-soft))] hover:shadow-[0_8px_40px_hsl(var(--shadow-luxury))] transition-all duration-300 hover:-translate-y-2">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-main-color/10 flex items-center justify-center mb-6 group-hover:bg-main-color group-hover:shadow-[0_4px_20px_hsl(var(--shadow-gold))] transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-main-color group-hover:text-white transition-colors" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">
                      {service.title}
                    </h3>
                    <p className="text-low-color leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
