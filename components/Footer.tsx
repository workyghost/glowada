"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from "lucide-react";

interface SettingsProps {
  logoUrl?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  distributorText?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  youtubeChanUrl?: string;
  footerText?: string;
}

export default function Footer({ settings }: { settings: SettingsProps }) {
  const logoText = settings?.logoUrl || "Glowada";
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, "") || "";
  const whatsappLink = `https://api.whatsapp.com/send/?phone=%2B${whatsappNumber}&text=Merhaba, glowada.com web siteniz üzerinden ulaşıyorum.&app_absent=0`;
  const phoneLink = `tel:${settings?.phone?.replace(/\D/g, "")}`;
  const distributor = settings?.distributorText || "Glowada Abcmix'in Türkiye Distribütörüdür.";

  const kurumsalLinks = [
    { name: "Hakkımızda", href: "#about" },
    { name: "Talep Formu", href: "#talep-formu" },
    { name: "Bayilik", href: "#talep-formu" },
    { name: "Sertifikalarımız", href: "#about" },
  ];

  const urunLinks = [
    { name: "Manyetik Harf Serisi", href: "#products" },
    { name: "Üstten Askılı Harf Serisi", href: "#products" },
    { name: "Led Reklam Panosu", href: "#products" },
    { name: "P3 Bağımsız Led Modüler Harf", href: "#products" },
    { name: "Çift Taraflı Yuvarlak Led Ekran", href: "#products" },
    { name: "A4 / A5 / Kare Light Box", href: "#products" },
    { name: "Aksesuarlar", href: "#products" },
    { name: "Dış Mekan Tabelalar", href: "#products" },
  ];

  const hizliLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "#about" },
    { name: "Çalışmalarımız", href: "#why-us" },
    { name: "Talep Formu", href: "#talep-formu" },
    { name: "İletişim", href: "#contact" },
  ];

  return (
    <footer id="footer1" className="bg-[#0a0101] text-slate-400 pt-16 pb-24 md:pb-8 px-4 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Column 1: Info and Distributor */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-black tracking-tight text-white">
              {logoText.startsWith("http") || logoText.startsWith("/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoText} alt="Logo" className="h-10 object-contain" />
              ) : (
                <>
                  GLOW<span className="text-[#f44d46]">ADA</span>
                </>
              )}
            </span>
          </Link>
          <div className="text-sm space-y-3 leading-relaxed">
            {settings?.address && (
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f44d46] shrink-0 mt-1" />
                <span>{settings.address}</span>
              </p>
            )}
            {settings?.phone && (
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f44d46] shrink-0" />
                <a href={phoneLink} className="hover:text-white transition-colors">{settings.phone}</a>
              </p>
            )}
            {settings?.email && (
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f44d46] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
              </p>
            )}
          </div>
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {settings?.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-[#474747] hover:bg-[#f44d46] text-white flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-[#474747] hover:bg-[#f44d46] text-white flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
          {/* Distributor note */}
          <div className="border-t border-slate-800 pt-4 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.harfmix.com/wp-content/uploads/2023/09/abcmix-logo-1.png"
              alt="Abcmix Logo"
              className="h-8 object-contain shrink-0 filter invert opacity-80"
            />
            <p className="text-xs text-slate-500 leading-tight">
              {distributor}
            </p>
          </div>
        </div>

        {/* Column 2: Kurumsal */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base tracking-wide uppercase relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#f44d46]">
            Kurumsal
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {kurumsalLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-[#f44d46] flex items-center gap-1 transition-colors">
                  <span>›</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Ürünlerimiz */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base tracking-wide uppercase relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#f44d46]">
            Ürünlerimiz
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm max-h-72 overflow-y-auto pr-2">
            {urunLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-[#f44d46] flex items-center gap-1 transition-colors">
                  <span>›</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Hızlı Menü */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base tracking-wide uppercase relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#f44d46]">
            Hızlı Bağlantılar
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {hizliLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-[#f44d46] flex items-center gap-1 transition-colors">
                  <span>›</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 text-center">
        <p>{settings?.footerText || "© Copyright 2026 Glowada ® | Glowada Ezgi Reklamevi Markasıdır."}</p>
        <p>
          <Link href="/admin" className="hover:text-[#f44d46] transition-colors">
            Giriş Yap (Yönetici)
          </Link>
        </p>
      </div>

      {/* Sticky Mobile Contact Shortcuts Bar */}
      <div className="fixed bottom-0 left-0 w-full z-45 md:hidden grid grid-cols-2 border-t border-slate-800 bg-[#303030]">
        <a
          href={phoneLink}
          className="flex items-center justify-center gap-2 py-3.5 text-white font-bold text-sm bg-[#303030] hover:bg-[#f44d46] transition-colors border-r border-slate-800"
        >
          <Phone className="w-4 h-4 fill-white text-[#303030]" />
          <span>Hemen Ara</span>
        </a>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>WhatsApp</span>
        </a>
      </div>
    </footer>
  );
}
