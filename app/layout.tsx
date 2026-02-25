import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aminou Mohamadou — Web & App Developer",
  description: "Freelance web and app developer",
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
