"use client";
import { motion } from "motion/react";
import { PackageData } from "@/lib/responseType";
import { Check, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function PremiumPackagesSection({
  whatsapp,
  packages,
}: {
  whatsapp: string;
  packages: PackageData[];
}) {
  const whatsappNumber = whatsapp.includes("+")
    ? whatsapp.split("+").join("")
    : whatsapp;
  const waLink = `https://wa.me/${whatsappNumber}?text=`;

  if (!packages?.length) return null;

  return (
    <section
      id="packages"
      className="py-20 md:py-28 relative overflow-hidden bg-[#f5f0e8]">
      {/* Subtle top/bottom borders like the site */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#c9a84c]/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a84c]/20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header — matches site pattern: small label + big title */}
        <div className="text-center mb-14 md:mb-18 max-w-2xl mx-auto" dir="rtl">
          <span className="inline-block text-[#c9a84c] text-sm font-bold tracking-widest mb-3 uppercase">
            باقاتنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2b1f14] mb-4 leading-snug">
            اختر الباقة المناسبة لك
          </h2>
          <div className="w-16 h-1 bg-[#c9a84c] mx-auto rounded-full mb-4" />
          <p className="text-[#6b5744] text-base md:text-lg leading-relaxed">
            نقدم لك مجموعة متميزة من الباقات المصممة بعناية لتلبي احتياجاتك
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto w-full">
          {packages.map((pkg, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              key={pkg.id}
              className="group relative flex flex-col h-full w-full rounded-2xl overflow-hidden bg-white shadow-[0_2px_16px_rgba(43,31,20,0.08)] hover:shadow-[0_8px_40px_rgba(43,31,20,0.15)] transition-all duration-500 hover:-translate-y-1 border border-[#e8ddd0]">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-[#e8ddd0]">
                {pkg.image ? (
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#e8ddd0] to-[#f5f0e8]">
                    <span className="text-5xl font-extrabold text-[#c9a84c]/40">
                      {pkg.title?.charAt(0) ?? "?"}
                    </span>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                {/* Package badge */}
                <div className="absolute top-3 right-3" dir="rtl">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#c9a84c] text-white text-xs font-bold shadow">
                    الباقة {index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 md:p-7" dir="rtl">
                <h3 className="text-xl md:text-2xl font-extrabold text-[#2b1f14] mb-4 text-right">
                  {pkg.title}
                </h3>

                {/* Divider */}
                <div className="w-10 h-0.5 bg-[#c9a84c] rounded-full mb-4 mr-0" />

                {/* Features */}
                {pkg.features?.length > 0 ? (
                  <div className="flex-1 mb-6">
                    <p className="text-[#c9a84c] text-sm font-bold mb-3 text-right">
                      المميزات :
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-right">
                          <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#c9a84c]/10 flex items-center justify-center">
                            <Check
                              className="w-3 h-3 text-[#c9a84c]"
                              strokeWidth={3}
                            />
                          </span>
                          <span className="text-[#4a3728] text-sm md:text-base leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="flex-1 mb-6" />
                )}

                {/* CTA Button — matches site's green WhatsApp button style */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-3.5 px-6 rounded-xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 bg-[#25d366] text-white hover:bg-[#1ebe5d] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                  <MessageCircle className="w-5 h-5" />
                  اطلب الخدمة عبر واتساب
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
