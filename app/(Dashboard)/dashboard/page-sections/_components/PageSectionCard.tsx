"use client";

import { useState } from "react";
import { PageSection } from "../page";
import { APP_URL } from "@/lib/ProjectId";
import { Toast } from "@/app/(Dashboard)/_components/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Pencil,
  Trash2,
  Check,
  X,
  Tag,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

interface PageSectionCardProps {
  section: PageSection;
  projectId: string;
  onUpdated: (section: PageSection) => void;
  onDeleted: (sectionId: string) => void;
}

type ContentType = "CONTENT" | "KEYWORDS";

export default function PageSectionCard({
  section,
  projectId,
  onUpdated,
  onDeleted,
}: PageSectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    title: section.title,
    contentType: section.contentType as ContentType,
    content: section.content ?? "",
    image: section.image ?? "",
    keyword: section.keyword ?? "",
    keywordDescription: section.keywordDescription ?? "",
  });

  const handleSave = async () => {
    if (!editData.title.trim()) {
      Toast({ icon: "warning", message: "العنوان مطلوب" });
      return;
    }
    if (editData.contentType === "KEYWORDS" && !editData.keyword.trim()) {
      Toast({ icon: "warning", message: "الكلمة المفتاحية مطلوبة" });
      return;
    }

    setIsSaving(true);
    try {
      const payload: Record<string, string> = {
        title: editData.title.trim(),
        contentType: editData.contentType,
      };

      if (editData.contentType === "CONTENT") {
        payload.content = editData.content.trim();
        payload.image = editData.image.trim();
      } else {
        payload.keyword = editData.keyword.trim();
        payload.keywordDescription = editData.keywordDescription.trim();
      }

      const res = await fetch(
        `${APP_URL}/api/dashboard/${projectId}/page-sections/${section.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        const data = await res.json();
        onUpdated(data.data);
        await fetch("/api/revalidate-main-data");
        Toast({ icon: "success", message: "تم تحديث القسم بنجاح" });
        setIsEditing(false);
      } else {
        const err = await res.json().catch(() => null);
        Toast({ icon: "error", message: err?.message || "فشل تحديث القسم" });
      }
    } catch {
      Toast({ icon: "error", message: "حدث خطأ أثناء الحفظ" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا القسم؟")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${APP_URL}/api/dashboard/${projectId}/page-sections/${section.id}`,
        { method: "DELETE" },
      );

      if (res.ok) {
        await fetch("/api/revalidate-main-data");
        Toast({ icon: "success", message: "تم حذف القسم بنجاح" });
        onDeleted(section.id);
      } else {
        Toast({ icon: "error", message: "فشل حذف القسم" });
      }
    } catch {
      Toast({ icon: "error", message: "حدث خطأ أثناء الحذف" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title: section.title,
      contentType: section.contentType,
      content: section.content ?? "",
      image: section.image ?? "",
      keyword: section.keyword ?? "",
      keywordDescription: section.keywordDescription ?? "",
    });
    setIsEditing(false);
  };

  const typeLabel = section.contentType === "CONTENT" ? "محتوى نصي" : "كلمات مفتاحية";
  const typeColor = section.contentType === "CONTENT"
    ? "bg-blue-50 text-blue-600"
    : "bg-purple-50 text-purple-600";

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        {isEditing ? (
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">العنوان</label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="عنوان القسم"
                disabled={isSaving}
              />
            </div>

            {/* Content Type toggle */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">نوع المحتوى</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditData({ ...editData, contentType: "CONTENT" })}
                  disabled={isSaving}
                  className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    editData.contentType === "CONTENT"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  محتوى نصي
                </button>
                <button
                  type="button"
                  onClick={() => setEditData({ ...editData, contentType: "KEYWORDS" })}
                  disabled={isSaving}
                  className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    editData.contentType === "KEYWORDS"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  كلمات مفتاحية
                </button>
              </div>
            </div>

            {/* CONTENT fields */}
            {editData.contentType === "CONTENT" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">المحتوى</label>
                  <Textarea
                    value={editData.content}
                    onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                    placeholder="المحتوى النصي"
                    rows={3}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">رابط الصورة</label>
                  <Input
                    value={editData.image}
                    onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    disabled={isSaving}
                  />
                </div>
              </>
            )}

            {/* KEYWORDS fields */}
            {editData.contentType === "KEYWORDS" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">الكلمة المفتاحية</label>
                  <Input
                    value={editData.keyword}
                    onChange={(e) => setEditData({ ...editData, keyword: e.target.value })}
                    placeholder="قهوة عربية الرياض"
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">وصف الكلمة المفتاحية</label>
                  <Textarea
                    value={editData.keywordDescription}
                    onChange={(e) => setEditData({ ...editData, keywordDescription: e.target.value })}
                    placeholder="وصف الكلمة المفتاحية"
                    rows={2}
                    disabled={isSaving}
                  />
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button size="sm" onClick={handleSave} disabled={isSaving} className="flex items-center gap-1">
                <Check className="w-4 h-4" />
                {isSaving ? "جاري الحفظ..." : "حفظ"}
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit} disabled={isSaving} className="flex items-center gap-1">
                <X className="w-4 h-4" />
                إلغاء
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
                  {typeLabel}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-800 truncate">{section.title}</h2>

              {/* Content preview */}
              {section.contentType === "CONTENT" && (
                <div className="mt-2 space-y-1">
                  {section.content && (
                    <p className="text-sm text-gray-500 line-clamp-2 flex items-start gap-1.5">
                      <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-400" />
                      {section.content}
                    </p>
                  )}
                  {section.image && (
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{section.image}</span>
                    </p>
                  )}
                </div>
              )}

              {section.contentType === "KEYWORDS" && (
                <div className="mt-2 space-y-1">
                  {section.keyword && (
                    <p className="text-sm font-medium text-purple-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 shrink-0" />
                      {section.keyword}
                    </p>
                  )}
                  {section.keywordDescription && (
                    <p className="text-xs text-gray-500 line-clamp-1">{section.keywordDescription}</p>
                  )}
                </div>
              )}

              <p className="mt-2 text-xs text-gray-400">
                {new Date(section.createdAt).toLocaleDateString("ar-EG")}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1"
              >
                <Pencil className="w-3.5 h-3.5" />
                تعديل
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {isDeleting ? "..." : "حذف"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
