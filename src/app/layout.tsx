import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { I18nProvider } from "@/i18n/context";
import { profile } from "@/data/profile";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} | Portfolio`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans bg-white text-gray-900 antialiased`}
      >
        <I18nProvider>
          <LayoutShell>{children}</LayoutShell>
        </I18nProvider>
      </body>
    </html>
  );
}
