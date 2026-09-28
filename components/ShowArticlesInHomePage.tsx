import { ArticlesDataType } from "@/app/(main)/blog/page";
import { ArrowLeft, Clock10 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ArticleCardImage from "./ArticleCardImage";

type Props = {
  articles: ArticlesDataType[];
};
export default function ShowArticlesInHomePage({ articles }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 container mx-auto py-4 px-3 ">
      {articles.map((article) => (
        <Link
          href={`/${article.title.split(" ").join("-")}`}
          key={article.id}
          className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border bg-white"
          style={{
            boxShadow: "0 4px 20px rgba(44,24,16,0.06)",
          }}>
          {article.coverImage && (
            <ArticleCardImage
              coverImage={article.coverImage}
              title={article.title}
            />
          )}

          <div className="flex flex-col flex-1 p-6">
            <h2
              className="font-black text-lg mb-3 line-clamp-2"
              style={{ color: "var(--main-color)" }}>
              {article.title}
            </h2>

            {article.content && (
              <p
                className="text-sm leading-relaxed line-clamp-3 flex-1 mb-4"
                style={{ color: "var(--main-color-dark)" }}>
                {article.content.replace(/<[^>]+>/g, "")}
              </p>
            )}

            <div
              className="flex items-center justify-between mt-auto pt-4 border-t"
              style={{ borderColor: "var(--border-warm)" }}>
              <span className="text-xs" style={{ color: "var(--low-color)" }}>
                <Clock10 className="w-3 h-3" strokeWidth={2} />
                {new Date(article.createdAt).toLocaleDateString("ar-SA", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: "var(--accent-gold)" }}>
                اقرأ المقال
                <ArrowLeft className="w-3 h-3" strokeWidth={2} />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
