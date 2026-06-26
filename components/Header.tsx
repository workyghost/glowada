"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Menu, X, Settings, Instagram, Facebook } from "lucide-react";

interface SettingsProps {
  logoUrl?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

export default function Header({ settings }: { settings: SettingsProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoText = settings?.logoUrl || "Glowada";
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, "") || "";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const phoneLink = `tel:${settings?.phone?.replace(/\s+/g, "")}`;

  return (
    <header className="w-full z-50">
      {/* Top Contact Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {settings?.phone && (
              <a href={phoneLink} className="flex items-center gap-1.5 hover:text-glowada-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-glowada-500" />
                <span>{settings.phone}</span>
              </a>
            )}
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-glowada-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-glowada-500" />
                <span>{settings.email}</span>
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-glowada-400 transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
              {settings?.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-glowada-400 transition-colors">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <div className="h-3 w-px bg-slate-700"></div>
            <Link href="/admin" className="flex items-center gap-1 hover:text-glowada-400 transition-colors">
              <Settings className="w-3.5 h-3.5" />
              <span>Yönetici Paneli</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav
        className={`w-full py-4 px-4 transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-glowada-600 transition-colors">
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

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-slate-700">
            <Link href="/" className="hover:text-glowada-500 transition-colors">
              Anasayfa
            </Link>
            <Link href="#products" className="hover:text-glowada-500 transition-colors">
              Ürünlerimiz
            </Link>
            <Link href="#about" className="hover:text-glowada-500 transition-colors">
              Hakkımızda
            </Link>
            <Link href="#contact" className="hover:text-glowada-500 transition-colors">
              İletişim
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {settings?.whatsapp && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-full text-sm shadow-md hover:shadow-lg transition-all animate-pulse hover:animate-none"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Teklif Al (WhatsApp)</span>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-glowada-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-6 px-4 flex flex-col gap-4 animate-fadeIn">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-slate-800 font-bold hover:text-glowada-500 transition-colors py-2 border-b border-slate-50"
            >
              Anasayfa
            </Link>
            <Link
              href="#products"
              onClick={() => setIsOpen(false)}
              className="text-slate-800 font-bold hover:text-glowada-500 transition-colors py-2 border-b border-slate-50"
            >
              Ürünlerimiz
            </Link>
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-slate-800 font-bold hover:text-glowada-500 transition-colors py-2 border-b border-slate-50"
            >
              Hakkımızda
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-slate-800 font-bold hover:text-glowada-500 transition-colors py-2 border-b border-slate-50"
            >
              İletişim
            </Link>
            {settings?.whatsapp && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors mt-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp İletişim</span>
              </a>
            )}
          </div>
        )}
      </nav>
      {/* Spacer to prevent layout shift if navigation is fixed */}
      {isScrolled && <div className="h-[76px] w-full bg-transparent"></div>}
    </header>
  );
}
