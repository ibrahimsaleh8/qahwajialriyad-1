"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Toast } from "@/app/(Dashboard)/_components/Toast";
import { APP_URL } from "@/lib/ProjectId";
import { motion } from "framer-motion";

const STORAGE_KEY = (projectId: string) => `rating_${projectId}`;

interface RatingSectionProps {
  projectId: string;
  averageRating: number;
  totalRatings: number;
}

export default function RatingSection({
  projectId,
  averageRating,
  totalRatings,
}: RatingSectionProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY(projectId));
      if (stored) {
        const value = parseInt(stored, 10);
        if (value >= 1 && value <= 5) {
          setSubmitted(value);
        }
      }
    } catch {
      // localStorage not available
    }
    setMounted(true);
  }, [projectId]);

  const displayRating = hoverRating || selectedRating;

  const handleStarClick = async (value: number) => {
    if (submitted !== null) return;

    setSelectedRating(value);
    setIsLoading(true);

    try {
      const res = await fetch(`${APP_URL}/api/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          stars: value,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(value);
        try {
          localStorage.setItem(STORAGE_KEY(projectId), String(value));
        } catch {
          // localStorage not available
        }
        Toast({ icon: "success", message: "شكراً لتقييمك!" });
      } else {
        setSelectedRating(0);
        Toast({
          icon: "error",
          message: data.message || data.error || "حدث خطأ في التقييم",
        });
      }
    } catch {
      setSelectedRating(0);
      Toast({ icon: "error", message: "حدث خطأ في التقييم" });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (value: number, interactive = false) => (
    <div className="flex justify-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="relative inline-block">
          {interactive ? (
            <button
              type="button"
              disabled={isLoading || !mounted}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 rounded-lg transition-all duration-200 hover:scale-125 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color focus-visible:ring-offset-2"
              aria-label={`تقييم ${star} من 5`}>
              <Star
                className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-200 ${
                  star <= value
                    ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                    : "fill-stone-200 text-stone-200"
                }`}
              />
            </button>
          ) : (
            <Star
              className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${
                star <= value
                  ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                  : "fill-stone-200 text-stone-200"
              }`}
            />
          )}
        </span>
      ))}
    </div>
  );

  return (
    <section id="rating" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-stone-50 via-amber-50/30 to-stone-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,108,53,0.04)_0%,transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        {/* Card */}
        <motion.div
          className="rounded-3xl bg-white/90 backdrop-blur-sm border border-stone-100 shadow-[0_8px_40px_rgba(51,40,34,0.08)] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="p-8 md:p-12 text-center">
            {/* Section label */}
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-main-color/10 text-main-color text-sm font-semibold mb-6">
              آراء العملاء
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-main-black mb-3 leading-tight">
              قيّم تجربتك معنا
            </h2>
            <p className="text-low-color text-base md:text-lg mb-8 max-w-xl mx-auto">
              رأيك يهمنا! ساعدنا في التحسين من خلال تقييم تجربتك
            </p>

            {/* Stats row - show average & total when available */}
            {(averageRating > 0 || totalRatings > 0) && (
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
                {averageRating > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl md:text-3xl font-bold text-main-black">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-low-color">/ 5</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(averageRating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-stone-200 text-stone-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {totalRatings > 0 && (
                  <div className="text-low-color text-sm md:text-base">
                    <span className="font-semibold text-main-black">
                      {totalRatings}
                    </span>{" "}
                    {totalRatings === 1 ? "تقييم" : "تقييمات"}
                  </div>
                )}
              </div>
            )}

            {submitted !== null && mounted ? (
              <div className="py-4">
                {renderStars(submitted, false)}
                <p className="text-main-color font-semibold mt-4 text-lg">
                  شكراً لتقييمك!
                </p>
                <p className="text-low-color text-sm mt-1">
                  نسعد بتقييمك وسنعمل على تحسين تجربتك
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {renderStars(displayRating || 0, true)}
                <p className="text-low-color text-sm">
                  {mounted && !isLoading
                    ? "انقر على النجم المناسب للتقييم"
                    : ""}
                  {isLoading && "جاري الإرسال..."}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
