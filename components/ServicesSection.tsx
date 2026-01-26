import { Coffee, Users, Building2, Heart } from "lucide-react";

const services = [
  {
    icon: Coffee,
    title: "خدمة القهوة العربية",
    description:
      "قهوة عربية أصيلة محضّرة بعناية فائقة، مقدمة بأوانٍ فاخرة وتمور ممتازة من أجود المزارع السعودية.",
  },
  {
    icon: Users,
    title: "طاقم ضيافة محترف",
    description:
      "فريق مدرب على أعلى معايير الضيافة، بمظهر أنيق وسلوك راقي يليق بمناسباتكم الخاصة.",
  },
  {
    icon: Heart,
    title: "حفلات الزفاف",
    description:
      "نضفي على ليلة العمر لمسة من الفخامة والأصالة مع خدمة ضيافة متكاملة تسعد ضيوفكم.",
  },
  {
    icon: Building2,
    title: "فعاليات الشركات",
    description:
      "خدمات ضيافة احترافية للمؤتمرات والاجتماعات والفعاليات الرسمية بمستوى عالمي.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[hsl(var(--secondary))]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[hsl(var(--primary))] font-semibold text-sm tracking-wider mb-4 block">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-6">
            خدمات ضيافة{" "}
            <span className="text-[hsl(var(--primary))]">متكاملة</span>
          </h2>
          <div className="w-20 h-1 bg-[hsl(var(--primary))] mx-auto mb-6" />
          <p className="text-[hsl(var(--muted-foreground))] text-lg">
            نقدم مجموعة شاملة من خدمات الضيافة العربية لتلبية احتياجات جميع
            المناسبات
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="group">
              <div className="bg-[hsl(var(--card))] rounded-2xl p-8 h-full shadow-[0_4px_20px_hsl(var(--shadow-soft))] hover:shadow-[0_8px_40px_hsl(var(--shadow-luxury))] transition-all duration-300 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center mb-6 group-hover:bg-[hsl(var(--primary))] group-hover:shadow-[0_4px_20px_hsl(var(--shadow-gold))] transition-all duration-300">
                  <service.icon className="w-8 h-8 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">
                  {service.title}
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
