import aboutImage from "@images/about-image.webp";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--shadow-luxury))]">
              <Image
                src={aboutImage}
                alt="خدمة الضيافة العربية"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[hsl(var(--primary)/0.3)] rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-[hsl(var(--primary))] font-semibold text-sm tracking-wider mb-4 block">
              من نحن
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-6">
              إرث عريق في{" "}
              <span className="text-[hsl(var(--primary))]">
                الضيافة السعودية
              </span>
            </h2>
            <div className="w-20 h-1 bg-[hsl(var(--primary))] mb-8" />

            <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed mb-6">
              نحن في قهوجيين الرياض نؤمن بأن القهوة العربية ليست مجرد مشروب، بل
              هي رمز للكرم والأصالة السعودية العريقة. نقدم خدمات الضيافة الفاخرة
              بأيدي فريق محترف يجسد قيم الضيافة العربية الأصيلة.
            </p>
            <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed mb-8">
              خبرة تمتد لسنوات في خدمة الفعاليات الكبرى، حفلات الزفاف الفاخرة،
              والمناسبات الرسمية للشركات والجهات الحكومية في الرياض والمملكة
              العربية السعودية.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] block">
                  +500
                </span>
                <span className="text-[hsl(var(--muted-foreground))] text-sm">
                  مناسبة
                </span>
              </div>
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] block">
                  +10
                </span>
                <span className="text-[hsl(var(--muted-foreground))] text-sm">
                  سنوات خبرة
                </span>
              </div>
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] block">
                  100%
                </span>
                <span className="text-[hsl(var(--muted-foreground))] text-sm">
                  رضا العملاء
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
