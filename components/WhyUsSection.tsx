import { WhyUsSectionData } from "@/lib/responseType";
import WhyUsIcon from "./WhyUsIcon";

export function WhyUsSection({
  description,
  features,
  label,
  title,
}: WhyUsSectionData) {
  return (
    <section id="why-us" className="py-24 bg-main-bg">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div>
            <span className="text-main-color font-semibold text-sm tracking-wider mb-4 block">
              {label}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main-color mb-6">
              {title}
            </h2>
            <div className="w-20 h-1 bg-main-color mb-8" />

            <p className="text-low-color text-lg leading-relaxed mb-10">
              {description}
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features &&
                features.map((feature) => {
                  return (
                    <div key={feature.title} className="flex gap-4">
                      <WhyUsIcon icon={feature.icon} />
                      <div>
                        <h3 className="font-bold text-black mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-low-color text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Visual Stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-main-color/10 rounded-2xl p-8 text-center">
                  <span className="text-5xl font-bold text-main-color">
                    +500
                  </span>
                  <p className="text-low-color mt-2">مناسبة ناجحة</p>
                </div>

                <div className="bg-[#563C29] rounded-2xl p-8 text-center">
                  <span className="text-5xl font-bold text-white">+50</span>
                  <p className="text-white/60 mt-2">قهوجي محترف</p>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <div className="bg-second-bg rounded-2xl p-8 text-center">
                  <span className="text-5xl font-bold text-main-color">
                    +10
                  </span>
                  <p className="text-low-color mt-2">سنوات خبرة</p>
                </div>

                <div className="bg-main-color rounded-2xl p-8 text-center shadow-[0_4px_20px_hsl(var(--shadow-gold))]">
                  <span className="text-5xl font-bold text-white">5</span>
                  <p className="text-white/60 mt-2">نجوم تقييم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
