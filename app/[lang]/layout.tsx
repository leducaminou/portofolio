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
  return {
    title: isEn
      ? "Aminou Mohamadou — Web & App Developer"
      : "Aminou Mohamadou — Développeur Web & App",
    description: isEn
      ? "Premium freelance portfolio — Building modern web & mobile experiences for startups and SaaS."
      : "Portfolio freelance premium — Création d'expériences web & mobile modernes pour startups et SaaS.",
    keywords: isEn
      ? ["web developer", "next.js", "react", "freelance", "portfolio"]
      : ["développeur web", "next.js", "react", "freelance", "portfolio"],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: isEn
        ? "Aminou Mohamadou — Web & App Developer"
        : "Aminou Mohamadou — Développeur Web & App",
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
