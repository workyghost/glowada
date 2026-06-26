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
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  footerText?: string;
}

export default function Footer({ settings }: { settings: SettingsProps }) {
  const logoText = settings?.logoUrl || "Glowada";
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, "") || "";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const phoneLink = `tel:${settings?.phone?.replace(/\s+/g, "")}`;

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-black tracking-tight text-white">
              {logoText.startsWith("http") || logoText.startsWith("/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoText} alt="Logo" className="h-10 object-contain" />
              ) : (
                <>
                  GLOW<span className="text-glowada-500">ADA</span>
                </>
              )}
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Profesyonel LED tabela, kayan yazı, krom kutu harf ve aydınlatmalı reklam panoları alanında yüksek kaliteli çözümler. İşletmenizin prestijini ve görünürlüğünü arttırıyoruz.
          </p>
          <div className="flex items-center gap-3 mt-2">
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 border border-slate-800 hover:border-glowada-500 hover:text-glowada-500 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {settings?.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 border border-slate-800 hover:border-glowada-500 hover:text-glowada-500 flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base tracking-wide uppercase border-l-4 border-glowada-500 pl-3">
            Hızlı Menü
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-glowada-400 transition-colors">
                Anasayfa
              </Link>
            </li>
            <li>
              <Link href="#products" className="hover:text-glowada-400 transition-colors">
                Ürünlerimiz
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-glowada-400 transition-colors">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-glowada-400 transition-colors">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact details */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <h4 className="text-white font-bold text-base tracking-wide uppercase border-l-4 border-glowada-500 pl-3">
            İletişim Bilgileri
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            {settings?.address && (
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-glowada-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
            )}
            {settings?.phone && (
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-glowada-500 shrink-0" />
                <a href={phoneLink} className="hover:text-glowada-400 transition-colors">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings?.email && (
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-glowada-500 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-glowada-400 transition-colors">
                  {settings.email}
                </a>
              </li>
            )}
            {settings?.whatsapp && (
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-glowada-500 shrink-0" />
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-glowada-400 transition-colors font-semibold"
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center">
        <p>{settings?.footerText || "© 2026 Glowada LED & Tabela. Tüm hakları saklıdır."}</p>
        <p>
          Powered by{" "}
          <Link href="/admin" className="hover:text-glowada-500 underline transition-colors">
            Glowada Admin
          </Link>
        </p>
      </div>
    </footer>
  );
}
