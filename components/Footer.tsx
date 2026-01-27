import { FooterData } from "@/lib/responseType";
import { Mail, MapPin, Phone } from "lucide-react";

const currentYear = new Date().getFullYear();

export function Footer({
  address,
  phone,
  brandName,
  email,
  description,
}: FooterData & { description?: string }) {
  return (
    <footer className="bg-[#563C29] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between flex-wrap gap-12 mb-12">
          {/* Brand */}
          <div>
            {brandName && (
              <h3 className="text-2xl font-bold mb-4">
                {brandName.split(" ").length == 2 ? (
                  <span>
                    {brandName.split(" ")[0]}{" "}
                    <span className="text-main-color">
                      {brandName.split(" ")[1]}
                    </span>
                  </span>
                ) : (
                  <span className="text-white/80">{brandName}</span>
                )}{" "}
              </h3>
            )}

            <p className="text-white/70 leading-relaxed">
              {description ?? ""}{" "}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-white/70 hover:text-white transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/70 hover:text-white transition-colors">
                  خدماتنا
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-white/70 hover:text-white transition-colors">
                  معرض الصور
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/70 hover:text-white transition-colors">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {phone}
              </li>
              {email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {email}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            direction: "ltr",
          }}
          className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/70 text-sm">
            © {currentYear} {brandName}. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
