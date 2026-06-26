import React from "react";
import { prisma } from "@/lib/prisma";
import { ensureSeeded } from "@/lib/seed";
import HeroSlider from "@/components/HeroSlider";
import ProductShowcase from "@/components/ProductShowcase";
import YoutubePlayer from "@/components/YoutubePlayer";
import ContactForm from "@/components/ContactForm";
import { Compass, Clock, CheckCircle2 } from "lucide-react";

export const revalidate = 0; // Disable caching for dynamic changes

export default async function Home() {
  // Check if database needs seeding
  let settings = await prisma.setting.findUnique({ where: { id: "default" } });
  let slides = await prisma.slide.findMany({ orderBy: { order: "asc" } });
  let products = await prisma.product.findMany({ orderBy: { order: "asc" } });

  if (!settings || slides.length === 0 || products.length === 0) {
    await ensureSeeded();
    // Refetch after seeding
    settings = await prisma.setting.findUnique({ where: { id: "default" } });
    slides = await prisma.slide.findMany({ orderBy: { order: "asc" } });
    products = await prisma.product.findMany({ orderBy: { order: "asc" } });
  }

  // Fallbacks if seeding failed for some reason
  const safeSettings = settings || {
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
    <div className="w-full overflow-hidden">
      {/* 1. Hero Slider */}
      <HeroSlider slides={slides} />

      {/* 2. Brand Value Highlights */}
      <section className="py-16 px-4 bg-slate-900 text-white relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-850 border border-slate-800 hover:border-glowada-500 transition-colors">
            <div className="p-3 bg-glowada-500 rounded-xl text-slate-950 shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">Özgün Tasarımlar</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                İşletmenizin ruhunu yansıtan, sektörel analize dayalı ve benzersiz kutu harf ve tabela modelleri tasarlıyoruz.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-850 border border-slate-800 hover:border-glowada-500 transition-colors">
            <div className="p-3 bg-glowada-500 rounded-xl text-slate-950 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">Hızlı Üretim & Teslimat</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Modern makine parkurumuz ve tecrübeli ustalarımız ile tabela projelerinizi taahhüt ettiğimiz günde teslim ediyoruz.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-850 border border-slate-800 hover:border-glowada-500 transition-colors">
            <div className="p-3 bg-glowada-500 rounded-xl text-slate-950 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">Yüksek Kalite Standartları</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Dış hava şartlarına dayanıklı alüminyum, pleksiglas, paslanmaz sac ve Samsung çipli LED modülleri kullanıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Showcase */}
      <ProductShowcase products={products} whatsappNumber={safeSettings.whatsapp} />

      {/* 4. About Us section */}
      <section id="about" className="py-20 px-4 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="absolute -inset-4 bg-glowada-500/10 rounded-3xl -z-10 blur-xl"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600"
              alt="Tabela Üretim"
              className="rounded-2xl shadow-md aspect-[4/3] object-cover hover:scale-102 transition-transform"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600"
              alt="LED Tabela Montajı"
              className="rounded-2xl shadow-md aspect-[4/3] object-cover mt-8 hover:scale-102 transition-transform"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-glowada-600 font-extrabold uppercase tracking-widest text-xs">
                Biz Kimiz?
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 tracking-tight">
                LED ve Tabela Çözümlerinde Güvenilir Marka
              </h2>
            </div>
            <p className="text-slate-650 leading-relaxed text-sm md:text-base">
              <strong>Glowada</strong> olarak reklam ve tabela sektöründeki yılların birikimiyle, kurumsal firmalardan yerel işletmelere kadar geniş bir yelpazede reklam çözümleri sunuyoruz. Teknolojik yenilikleri yakından takip ediyor, tabela tasarımlarımızda yüksek enerji tasarruflu ve uzun ömürlü LED sistemleri tercih ediyoruz.
            </p>
            <p className="text-slate-650 leading-relaxed text-sm md:text-base">
              Kutu harf bükme makinelerimiz, lazer kesim ünitelerimiz ve uzman teknik ekibimizle; pleksiglas, paslanmaz sarı-gri krom, kompozit cephe giydirme ve akıllı RGB LED panellerinin tamamını kendi bünyemizde üreterek aracısız hizmet sağlıyoruz.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-2">
              <div className="border-l-4 border-glowada-500 pl-4">
                <span className="block text-2xl font-black text-slate-900">10+ Yıl</span>
                <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider">
                  Sektörel Tecrübe
                </span>
              </div>
              <div className="border-l-4 border-glowada-500 pl-4">
                <span className="block text-2xl font-black text-slate-900">1500+</span>
                <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider">
                  Mutlu Müşteri
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Embedded YouTube Video Container */}
      <YoutubePlayer youtubeUrl={safeSettings.youtubeUrl} />

      {/* 6. Contact Section */}
      <ContactForm settings={safeSettings} />
    </div>
  );
}
