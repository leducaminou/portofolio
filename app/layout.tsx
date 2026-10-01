import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Woptimoz Soft — Web & App Development Team",
  description: "Woptimoz Soft: a team building modern web and mobile products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
