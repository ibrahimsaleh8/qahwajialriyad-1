import { FooterData } from "@/lib/responseType";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            {brandName && (
              <h3 className="text-2xl font-bold mb-4">{brandName}</h3>
            )}

            <p className="text-white/80 leading-relaxed">
              {description ?? ""}{" "}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#about"
                  className="text-white/80 hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-white/80 hover:text-white transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link
                  href="/#gallery"
                  className="text-white/80 hover:text-white transition-colors">
                  معرض الصور
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-white/80 hover:text-white transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-white/80">
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
          <p className="text-white/80 text-sm">
            © {currentYear} {brandName}. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
