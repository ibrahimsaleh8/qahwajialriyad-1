import { Award, Clock, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "جودة استثنائية",
    description:
      "نستخدم أجود أنواع البن العربي والتمور الفاخرة لضمان تجربة لا تُنسى",
  },
  {
    icon: Clock,
    title: "التزام بالمواعيد",
    description:
      "دقة في التنفيذ والتواجد في الوقت المحدد لضمان سير مناسبتكم بسلاسة",
  },
  {
    icon: Shield,
    title: "موثوقية واحترافية",
    description: "فريق مدرب ومؤهل يحترم خصوصية مناسباتكم ويقدم خدمة راقية",
  },
  {
    icon: Sparkles,
    title: "تفاصيل مميزة",
    description:
      "اهتمام بأدق التفاصيل من الأواني الفاخرة إلى المظهر الأنيق للفريق",
  },
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-[hsl(var(--primary))] font-semibold text-sm tracking-wider mb-4 block">
              لماذا نحن
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-6">
              الخيار الأمثل
              <span className="text-[hsl(var(--primary))]"> لمناسباتكم</span>
            </h2>
            <div className="w-20 h-1 bg-[hsl(var(--primary))] mb-8" />

            <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed mb-10">
              نفخر بكوننا الخيار الأول للعديد من العائلات والشركات في الرياض.
              تميزنا ينبع من شغفنا بالضيافة السعودية الأصيلة وحرصنا على إرضاء
              عملائنا.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[hsl(var(--foreground))] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-[hsl(var(--primary)/0.1)] rounded-2xl p-8 text-center">
                  <span className="text-5xl font-bold text-[hsl(var(--primary))]">
                    +500
                  </span>
                  <p className="text-[hsl(var(--muted-foreground))] mt-2">
                    مناسبة ناجحة
                  </p>
                </div>
                <div className="bg-[hsl(var(--accent))] rounded-2xl p-8 text-center">
                  <span className="text-5xl font-bold text-[hsl(var(--accent-foreground))]">
                    +50
                  </span>
                  <p className="text-[hsl(var(--accent-foreground)/0.7)] mt-2">
                    قهوجي محترف
                  </p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-[hsl(var(--secondary))] rounded-2xl p-8 text-center">
                  <span className="text-5xl font-bold text-[hsl(var(--primary))]">
                    +10
                  </span>
                  <p className="text-[hsl(var(--muted-foreground))] mt-2">
                    سنوات خبرة
                  </p>
                </div>
                <div className="bg-[hsl(var(--primary))] rounded-2xl p-8 text-center shadow-[0_4px_20px_hsl(var(--shadow-gold))]">
                  <span className="text-5xl font-bold text-[hsl(var(--primary-foreground))]">
                    5
                  </span>
                  <p className="text-[hsl(var(--primary-foreground)/0.7)] mt-2">
                    نجوم تقييم
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
