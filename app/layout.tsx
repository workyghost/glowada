import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Glowada | LED Tabela & Kutu Harf Sistemleri",
  description: "Göz alıcı, enerji tasarruflu ve kaliteli LED tabela, kayan yazı, krom kutu harf ve aydınlatmalı reklam panoları.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get pathname from custom middleware header
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin") || pathname === "/login";

  // Fetch settings from DB
  let settings: any = null;
  try {
    settings = await prisma.setting.findUnique({
      where: { id: "default" },
    });
  } catch (error) {
    console.error("Failed to fetch settings in layout:", error);
  }

  // Fallbacks if database settings are not seeded yet
  const displaySettings = settings || {
    logoUrl: "Glowada",
    phone: "+90 555 123 45 67",
    email: "info@glowada.com",
    whatsapp: "+90 555 123 45 67",
    address: "İkitelli OSB, İSDÖK Sanayi Sitesi, Başakşehir / İstanbul",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    instagramUrl: "https://instagram.com/glowada",
    facebookUrl: "https://facebook.com/glowada",
    footerText: "© 2026 Glowada LED & Tabela Sistemleri. Tüm hakları saklıdır.",
  };

  return (
    <html lang="tr" className={`${outfit.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {!isAdmin && <Header settings={displaySettings} />}
        <main className="flex-grow">{children}</main>
        {!isAdmin && <Footer settings={displaySettings} />}
      </body>
    </html>
  );
}
