"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Menu, X, Settings, Instagram, Facebook, ChevronDown } from "lucide-react";

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
}

export default function Header({ settings }: { settings: SettingsProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
  const distributor = settings?.distributorText || "Glowada Abcmix'in Türkiye Distribütörüdür.";

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const kurumsalLinks = [
    { name: "Hakkımızda", href: "/#about" },
    { name: "Sertifikalarımız", href: "/#about" },
    { name: "Şirket Kültürü", href: "/#why-us" },
    { name: "Tesislerimiz", href: "/#why-us" },
    { name: "Küresel Dağıtım Ağı", href: "/#footer1" },
    { name: "Partnerlerimiz", href: "/#partners" },
  ];

  const urunLinks = [
    { name: "Manyetik Harf Serisi", href: "/#products" },
    { name: "Üstten Askılı Harf Serisi", href: "/#products" },
    { name: "Led Reklam Panosu", href: "/#products" },
    { name: "P3 Bağımsız Led Modüler Harf", href: "/#products" },
    { name: "Çift Taraflı Yuvarlak Led Ekran", href: "/#products" },
    { name: "A4 / A5 / Kare Light Box", href: "/#products" },
    { name: "Aksesuarlar", href: "/#products" },
    { name: "Dış Mekan Tabelalar", href: "/#products" },
  ];

  return (
    <header className="w-full z-50 relative">
      {/* Top Contact Bar (Red Theme #f44d46) */}
      <div className="bg-[#f44d46] text-white text-xs py-2.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left distributor text */}
          <div className="text-center md:text-left tracking-wide">
            {distributor}
          </div>
          {/* Right contacts and links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {settings?.phone && (
              <a href={phoneLink} className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                <Phone className="w-3.5 h-3.5 fill-white text-[#f44d46]" />
                <span>{settings.phone}</span>
              </a>
            )}
            <div className="h-3 w-px bg-white/30 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
              {settings?.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <div className="h-3 w-px bg-white/30"></div>
            <Link href="/admin" className="flex items-center gap-1 hover:text-slate-200 transition-colors font-semibold">
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
            <span className="text-2xl font-black tracking-tight text-[#303030] group-hover:text-[#f44d46] transition-colors">
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-[#303030]">
            <Link href="/" className="hover:text-[#f44d46] transition-colors">
              Ana Sayfa
            </Link>

            {/* Kurumsal Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown("kurumsal")}
                className="flex items-center gap-1 hover:text-[#f44d46] transition-colors focus:outline-none"
              >
                <span>Kurumsal</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block hover:block z-50">
                {kurumsalLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-[#f44d46] hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Ürünlerimiz Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown("urunlerimiz")}
                className="flex items-center gap-1 hover:text-[#f44d46] transition-colors focus:outline-none"
              >
                <span>Ürünlerimiz</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 rounded-xl shadow-xl py-2 hidden group-hover:block hover:block z-50 max-h-96 overflow-y-auto">
                {urunLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#f44d46] hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/#work" className="hover:text-[#f44d46] transition-colors">
              Çalışmalarımız
            </Link>
            <Link href="/#talep-formu" className="hover:text-[#f44d46] transition-colors">
              Bayilik
            </Link>
            <Link href="/#contact" className="hover:text-[#f44d46] transition-colors">
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
                className="flex items-center gap-2 bg-[#f44d46] hover:bg-[#d43d36] text-white font-bold py-2.5 px-6 rounded-full text-sm shadow-md hover:shadow-[#f44d46]/20 hover:scale-102 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#f44d46]" />
                <span>Talep Formu</span>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-[#f44d46] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-6 px-4 flex flex-col gap-4 z-50">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-slate-800 font-bold hover:text-[#f44d46] transition-colors py-2 border-b border-slate-50"
            >
              Ana Sayfa
            </Link>
            
            {/* Mobile Kurumsal Links */}
            <div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Kurumsal</div>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {kurumsalLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-slate-700 hover:text-[#f44d46] transition-colors py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Ürünlerimiz Links */}
            <div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Ürünlerimiz</div>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {urunLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-slate-700 hover:text-[#f44d46] transition-colors py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#work"
              onClick={() => setIsOpen(false)}
              className="text-slate-800 font-bold hover:text-[#f44d46] transition-colors py-2 border-b border-slate-50"
            >
              Çalışmalarımız
            </Link>
            <Link
              href="/#talep-formu"
              onClick={() => setIsOpen(false)}
              className="text-slate-800 font-bold hover:text-[#f44d46] transition-colors py-2 border-b border-slate-50"
            >
              Bayilik
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="text-slate-800 font-bold hover:text-[#f44d46] transition-colors py-2 border-b border-slate-50"
            >
              İletişim
            </Link>
            {settings?.whatsapp && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#f44d46] hover:bg-[#d43d36] text-white font-bold py-3 rounded-xl shadow-md transition-colors mt-2"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#f44d46]" />
                <span>Talep Formu</span>
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
