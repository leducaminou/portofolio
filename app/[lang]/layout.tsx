import { Inter, JetBrains_Mono } from "next/font/google";
import { getDictionary, locales } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  const title = isEn
    ? "Woptimoz Soft — Web & App Development Team"
    : "Woptimoz Soft — Équipe de développement Web & App";
  return {
    title,
    description: isEn
      ? "Woptimoz Soft is a team of developers and designers building modern web & mobile products for startups and businesses."
      : "Woptimoz Soft est une équipe de développeurs et designers qui conçoit des produits web & mobile modernes pour startups et entreprises.",
    keywords: isEn
      ? ["Woptimoz Soft", "software agency", "web development", "next.js", "fastapi", "mobile apps"]
      : ["Woptimoz Soft", "agence de développement", "développement web", "next.js", "fastapi", "applications mobiles"],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", fr: "/fr" },
    },
    openGraph: {
      title,
      type: "website",
      locale: lang,
    },
  };
}

import { ModalProvider } from "@/components/modals/ModalContext";
import ModalRoot from "@/components/modals/ModalRoot";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <ModalProvider>
      <div
        className={`${inter.variable} ${jetbrains.variable} font-sans`}
        lang={lang}
      >
        {children}
        <ModalRoot />
      </div>
    </ModalProvider>
  );
}
