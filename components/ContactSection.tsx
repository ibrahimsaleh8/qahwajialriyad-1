import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider mb-4 block">
            تواصل معنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            احجز خدمتك <span className="text-[#D2962D]">الآن</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            تواصل معنا لحجز خدمات الضيافة لمناسبتك القادمة
          </p>
        </div>

        <div className="w-full">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#ECE7DF] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                معلومات التواصل
              </h3>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#E9DECC] flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#D2962D]" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">اتصل بنا</p>
                    <a
                      target="_blank"
                      href="tel:+966506451744"
                      className="text-foreground font-semibold text-lg hover:text-primary transition-colors">
                      966506451744+
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#E9DECC] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#D2962D]" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">واتساب</p>
                    <a
                      target="_blank"
                      href="https://wa.me/966506451744"
                      className="text-foreground font-semibold text-lg hover:text-primary transition-colors">
                      966506451744+
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#E9DECC] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#D2962D]" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      البريد الإلكتروني
                    </p>
                    <a
                      target="_blank"
                      href="mailto:info@qahwajialriyad.com"
                      className="text-foreground font-semibold text-lg hover:text-primary transition-colors">
                      info@qahwajialriyad.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#E9DECC] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#D2962D]" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">الموقع</p>
                    <p className="text-foreground font-semibold text-lg">
                      الرياض، المملكة العربية السعودية
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp CTA */}
            <a
              href="https://wa.me/966506451744"
              target="_blank"
              className="flex items-center justify-center gap-3 text-white w-fit min-w-60 bg-[#25D366] text-cream rounded-xl p-4 font-semibold text-lg hover:bg-[#20BD5A] transition-colors shadow-lg">
              <MessageCircle className="w-6 h-6" />
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
