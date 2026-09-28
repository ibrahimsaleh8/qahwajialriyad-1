import { APP_URL, CurrentProjectId, currentURL } from "@/lib/ProjectId";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export type ArticlesDataType = {
  id: string;
  title: string;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  content: string | null;
};

export type GetArticlesResponse = {
  success: boolean;
  data: {
    articles: ArticlesDataType[];
    count: number;
  };
};

export const metadata: Metadata = {
  title: "مقالات الضيافة والقهوة العربية وتنظيم المناسبات",
  description:
    "اكتشف أحدث المقالات والنصائح حول الضيافة السعودية، القهوة العربية، تنظيم المناسبات، وتنسيق بوفيهات الضيافة لتقديم تجربة استثنائية لضيوفك.",
  alternates: {
    canonical: `${currentURL}/blog`,
  },
  openGraph: {
    title: "مقالات الضيافة والقهوة العربية وتنظيم المناسبات",
    description:
      "اكتشف أحدث المقالات والنصائح حول الضيافة السعودية، القهوة العربية، تنظيم المناسبات، وتنسيق بوفيهات الضيافة لتقديم تجربة استثنائية لضيوفك.",
    url: `${currentURL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مقالات الضيافة والقهوة العربية وتنظيم المناسبات",
    description:
      "اكتشف أحدث المقالات والنصائح حول الضيافة السعودية، القهوة العربية، تنظيم المناسبات، وتنسيق بوفيهات الضيافة لتقديم تجربة استثنائية لضيوفك.",
  },
};
export default async function ArticlesPage() {
  const res = await fetch(
    `${APP_URL}/api/project/${CurrentProjectId}/articles/category/خدمات-الضيافة`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data: GetArticlesResponse = await res.json();
  const articles = data.data.articles;

  return (
    <section id="articles" className="py-10 min-h-[60vh]">
      <div className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--main-color-dark)" }}>
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            العودة للرئيسية
          </Link>
          <div className="text-center">
            <span
              className="text-xs uppercase tracking-[3px] font-semibold mb-4 block"
              style={{ color: "var(--accent-gold)" }}>
              المدونة
            </span>
            <h1
              className="font-black text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-6"
              style={{ color: "var(--main-color)" }}>
              خدمات الضيافة
            </h1>
            <p
              className="text-base leading-relaxed max-w-xl mx-auto"
              style={{ color: "var(--main-color-dark)" }}>
              مقالات ونصائح حول فن الضيافة العربية والقهوة.
            </p>
          </div>
        </div>

        {articles.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl"
            style={{
              backgroundColor: "var(--card-background)",
              border: "1px solid var(--border-warm)",
            }}>
            <p
              className="text-base"
              style={{ color: "var(--main-color-dark)" }}>
              لا توجد مقالات متاحة حالياً.
            </p>
          </div>
        ) : (
          <div className="grid md:gap-6 gap-3 grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <Link
                href={`/${article.title.split(" ").join("-")}`}
                key={article.id}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--card-background)",
                  border: "1px solid var(--border-warm)",
                  boxShadow: "0 4px 20px rgba(44,24,16,0.06)",
                }}>
                {article.coverImage && (
                  <div className="relative w-full md:aspect-4/3 aspect-3/2 overflow-hidden">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 md:p-6 p-2">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h2
                      className="font-black md:text-lg text-base line-clamp-2"
                      style={{ color: "var(--main-color)" }}>
                      {article.title}
                    </h2>
                    <span
                      className="text-xs"
                      style={{ color: "var(--low-color)" }}>
                      {new Date(article.createdAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {article.content && (
                    <p
                      className="md:text-sm text-xs leading-relaxed line-clamp-3 flex-1 mb-4"
                      style={{ color: "var(--main-color-dark)" }}>
                      {article.content.replace(/<[^>]+>/g, "")}
                    </p>
                  )}

                  <p className="font-bold flex items-center text-xs md:text-base justify-center text-center py-2 gap-1 rounded-md bg-main-color text-white">
                    اقرأ المقال
                    <ArrowLeft className="w-3 h-3" strokeWidth={2} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
