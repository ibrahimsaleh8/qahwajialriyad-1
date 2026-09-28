"use client";

import { SocialMediaLinks } from "@/lib/responseType";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaPhone,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

type Props = {
  whatsapp: string;
  telephone: string;
  socialMedia: SocialMediaLinks | null;
};

export default function FloatedIcons({
  whatsapp,
  telephone,
  socialMedia,
}: Props) {
  return (
    <div className="fixed z-10 left-4 bottom-4 flex flex-col gap-3">
      <motion.a
        aria-label="whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/${
          whatsapp.includes("+") ? whatsapp.replace("+", "") : whatsapp
        }?text=`}
        className="flex items-center justify-center w-14 h-14 bg-[#25d366] rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: [0.9, 1, 0.9] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}>
        <FaWhatsapp className="w-9 h-9 text-white" />
      </motion.a>

      <a
        aria-label="telephone"
        href={`tel:${telephone}`}
        className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full">
        <FaPhone className="w-9 h-9 text-white rotate-110" />
      </a>

      {socialMedia && socialMedia.instagram && (
        <a
          aria-label="instagram"
          target="_blank"
          rel="noopener noreferrer"
          href={socialMedia.instagram}
          className="flex items-center justify-center w-14 h-14 bg-[#c13584] rounded-full hover:scale-105 duration-300">
          <FaInstagram className="w-9 h-9 text-white" />
        </a>
      )}

      {socialMedia && socialMedia.tiktok && (
        <a
          aria-label="tiktok"
          target="_blank"
          rel="noopener noreferrer"
          href={socialMedia.tiktok}
          className="flex items-center justify-center w-14 h-14 bg-black rounded-full hover:scale-105 duration-300">
          <FaTiktok className="w-9 h-9 text-white" />
        </a>
      )}

      {socialMedia && socialMedia.facebook && (
        <a
          aria-label="facebook"
          target="_blank"
          rel="noopener noreferrer"
          href={socialMedia.facebook}
          className="flex items-center justify-center w-14 h-14 bg-[#1877f2] rounded-full hover:scale-105 duration-300">
          <FaFacebookF className="w-9 h-9 text-white" />
        </a>
      )}

      {socialMedia && socialMedia.twitter && (
        <a
          aria-label="twitter"
          target="_blank"
          rel="noopener noreferrer"
          href={socialMedia.twitter}
          className="flex items-center justify-center w-14 h-14 bg-[#1da1f2] rounded-full hover:scale-105 duration-300">
          <FaTwitter className="w-9 h-9 text-white" />
        </a>
      )}

      {socialMedia && socialMedia.youtube && (
        <a
          aria-label="youtube"
          target="_blank"
          rel="noopener noreferrer"
          href={socialMedia.youtube}
          className="flex items-center justify-center w-14 h-14 bg-[#ff0000] rounded-full hover:scale-105 duration-300">
          <FaYoutube className="w-9 h-9 text-white" />
        </a>
      )}
    </div>
  );
}
