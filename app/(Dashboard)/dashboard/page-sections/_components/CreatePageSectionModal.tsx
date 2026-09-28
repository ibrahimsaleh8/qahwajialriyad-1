"use client";

import { useState } from "react";
import { PageSection } from "../page";
import { APP_URL } from "@/lib/ProjectId";
import { Toast } from "@/app/(Dashboard)/_components/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, FileText } from "lucide-react";
import ImageUploader from "@/app/(Dashboard)/_components/ImageUploader";
import ArticleEditor from "@/app/(Dashboard)/dashboard/articles/_components/ArticleEditor";

interface CreatePageSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onCreated: (section: PageSection) => void;
}

type ContentType = "CONTENT" | "KEYWORDS";

export default function CreatePageSectionModal({
  isOpen,
  onClose,
  projectId,
  onCreated,
}: CreatePageSectionModalProps) {
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState<ContentType>("CONTENT");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywordDescription, setKeywordDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      Toast({ icon: "warning", message: "العنوان مطلوب" });
      return;
    }
    if (contentType === "KEYWORDS" && !keyword.trim()) {
      Toast({ icon: "warning", message: "الكلمة المفتاحية مطلوبة عند اختيار نوع الكلمات المفتاحية" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Record<string, string> = {
        title: title.trim(),
        contentType,
      };

      if (contentType === "CONTENT") {
        if (content.trim()) payload.content = content.trim();
        if (image.trim()) payload.image = image.trim();
      } else {
        payload.keyword = keyword.trim();
        if (keywordDescription.trim()) payload.keywordDescription = keywordDescription.trim();
      }

      const res = await fetch(
        `${APP_URL}/api/dashboard/${projectId}/page-sections`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        const data = await res.json();
        onCreated(data.data);
        await fetch("/api/revalidate-main-data");
        Toast({ icon: "success", message: "تم إنشاء القسم بنجاح" });
        handleClose();
      } else {
        const err = await res.json().catch(() => null);
        Toast({ icon: "error", message: err?.message || "فشل إنشاء القسم" });
      }
    } catch {
      Toast({ icon: "error", message: "حدث خطأ أثناء الإنشاء" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setContentType("CONTENT");
    setContent("");
    setImage("");
    setKeyword("");
    setKeywordDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-gray-800">إنشاء قسم صفحة جديد</h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          id="create-page-section-form"
          className="overflow-y-auto flex-1 px-6 py-5 space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              عنوان القسم <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: لماذا تختار قهوتنا؟"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع المحتوى
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setContentType("CONTENT")}
                disabled={isSubmitting}
                className={`flex-1 py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                  contentType === "CONTENT"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                محتوى نصي
              </button>
              <button
                type="button"
                onClick={() => setContentType("KEYWORDS")}
                disabled={isSubmitting}
                className={`flex-1 py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                  contentType === "KEYWORDS"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                كلمات مفتاحية
              </button>
            </div>
          </div>

          {/* CONTENT fields */}
          {contentType === "CONTENT" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  المحتوى <span className="text-gray-400 font-normal">(اختياري)</span>
                </label>
                <ArticleEditor
                  content={content}
                  onChange={setContent}
                />
              </div>
              <ImageUploader
                value={image}
                onChange={setImage}
                label="صورة القسم (اختياري)"
                disabled={isSubmitting}
              />
            </>
          )}

          {/* KEYWORDS fields */}
          {contentType === "KEYWORDS" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  الكلمة المفتاحية <span className="text-red-500">*</span>
                </label>
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="مثال: قهوة عربية الرياض"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  وصف الكلمة المفتاحية <span className="text-gray-400 font-normal">(اختياري)</span>
                </label>
                <Textarea
                  value={keywordDescription}
                  onChange={(e) => setKeywordDescription(e.target.value)}
                  placeholder="اكتب وصفاً للكلمة المفتاحية..."
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            form="create-page-section-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإنشاء..." : "إنشاء القسم"}
          </Button>
        </div>
      </div>
    </div>
  );
}
