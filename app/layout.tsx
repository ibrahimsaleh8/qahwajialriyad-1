// app/layout.tsx
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { CurrentProjectId } from "@/lib/ProjectId";
import { getProjectContent } from "@/server-actions/main-data";

const cairoFont = Cairo({
  weight: ["1000", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getProjectContent(CurrentProjectId);

    const title =
      data.hero?.headline || data.header.brandName || "قهوجيين الرياض";
    const description =
      data.hero?.subheadline || "خدمات الضيافة العربية في الرياض";
    const brandName = data.header.brandName;

    return {
      title,
      description,
      keywords: data.footer?.brandName ? [data.footer.brandName] : [],
      creator: brandName,
      publisher: brandName,
      openGraph: {
        title,
        description,
        type: "website",
        locale: "ar_SA",
        siteName: brandName,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "قهوجيين الرياض",
      description: "خدمات الضيافة العربية في الرياض",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairoFont.className} antialiased`}>{children}</body>
    </html>
  );
}
