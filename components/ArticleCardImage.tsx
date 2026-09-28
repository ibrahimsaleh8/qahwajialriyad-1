"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MotionImage = motion(Image);

type Props = {
  coverImage: string;
  title: string;
};

export default function ArticleCardImage({ coverImage, title }: Props) {
  return (
    <div className="relative w-full aspect-4/3 overflow-hidden">
      <MotionImage
        src={coverImage}
        alt={title}
        fill
        className="object-cover"
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}
