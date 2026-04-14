// app/layout.tsx
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { APP_URL, CurrentProjectId } from "@/lib/ProjectId";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import BrowserGuard from "@/components/BrowserGuard";

const cairoFont = Cairo({
  weight: ["1000", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
});
type MetaDataResponseDataType = {
  title: string;
  description: string;
  keywords: string[];
  brandName: string;
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(
      `${APP_URL}/api/project/${CurrentProjectId}/metadata`,
      {
        next: {
          tags: ["metadata"],
        },
      },
    );
    const data: MetaDataResponseDataType = await res.json();

    const title = data.title || data.brandName || "قهوجيين الرياض";
    const description = data.description || "خدمات الضيافة العربية في الرياض";
    const brandName = data.brandName || "قهوجيين الرياض";
    const keywords = data.keywords || [brandName];

    return {
      title,
      description,
      keywords,
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
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: process.env.NEXT_PUBLIC_APP_URL,
      },
      verification: {
        google: "5Duix7k5t4yRT2Hom81bfuH1ACJ9cjPu5KHNQmfJHV8",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(
    `${APP_URL}/api/project/${CurrentProjectId}/metadata`,
  );
  const data: MetaDataResponseDataType = await res.json();

  return (
    <html lang="ar" dir="rtl">
      <head>
        <StructuredData
          name={data.brandName || "قهوجيين الرياض"}
          description={data.description || "خدمات الضيافة العربية في الرياض"}
          url={process.env.NEXT_PUBLIC_APP_URL as string}
        />
      </head>
      <body className={`${cairoFont.className} antialiased`}>
        {children}
        <BrowserGuard />

        <Analytics />
        <Script
          id="clixtell-tracking"
          src="https://scripts.clixtell.com/track.js"
          strategy="afterInteractive"
        />

        {/* Fallback for users with JS disabled */}
        <noscript>
          <img
            src="https://tracker.clixtell.com/track/t.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </body>
    </html>
  );
}
