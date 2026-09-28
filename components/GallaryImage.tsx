"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  url: string;
  alt?: string;
  index: number;
};

export default function GallaryImage({ url, alt, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="relative bg-white/60 overflow-hidden rounded-2xl cursor-pointer group shadow-soft hover:shadow-luxury transition-all duration-300">
      <div className="aspect-square">
        <Image
          src={url}
          alt={alt ?? `صورة-${index + 1}`}
          width={1000}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--coffee-dark)/0)] group-hover:bg-[hsl(var(--coffee-dark)/0.4)] transition-colors duration-300 flex items-center justify-center rounded-2xl">
        <span className="text-[hsl(var(--cream))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold text-center px-2">
          {alt ?? `صورة-${index + 1}`}
        </span>
      </div>
    </motion.div>
  );
}
