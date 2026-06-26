import React from "react";
import { prisma } from "@/lib/prisma";
import { ensureSeeded } from "@/lib/seed";
import HeroSlider from "@/components/HeroSlider";
import ProductShowcase from "@/components/ProductShowcase";
import ContactForm from "@/components/ContactForm";
import { CheckCircle2, ChevronRight, Award, Lightbulb, Shield, Cpu, BarChart2, Star } from "lucide-react";

export const revalidate = 0; // Disable caching for dynamic changes

export default async function Home() {
  // Check if database needs seeding
  let settings = await prisma.setting.findUnique({ where: { id: "default" } });
  let slides = await prisma.slide.findMany({ orderBy: { order: "asc" } });
  let products = await prisma.product.findMany({ orderBy: { order: "asc" } });
  let videos = await prisma.video.findMany({ orderBy: { order: "asc" } });

  if (!settings || slides.length === 0 || products.length === 0 || videos.length === 0) {
    await ensureSeeded();
    // Refetch after seeding
    settings = await prisma.setting.findUnique({ where: { id: "default" } });
    slides = await prisma.slide.findMany({ orderBy: { order: "asc" } });
    products = await prisma.product.findMany({ orderBy: { order: "asc" } });
    videos = await prisma.video.findMany({ orderBy: { order: "asc" } });
  }

  // Fallbacks if seeding failed for some reason
  const safeSettings = settings || {
    logoUrl: "Glowada",
    phone: "+90 (212) 664 57 67",
    email: "info@glowada.com",
    whatsapp: "+90 532 551 68 44",
    address: "Seyitnizam Mah. Demirciler Sit. 9. Cd. No:36 34015 Zeytinburnu/İstanbul",
    distributorText: "Glowada Abcmix'in Türkiye Distribütörüdür.",
    youtubeUrl: "https://www.elegansajans.com/wp-content/uploads/2024/04/manyetik-harf-serisi.mp4",
    instagramUrl: "https://www.instagram.com/harfmix",
    facebookUrl: "https://www.facebook.com/mix.harf",
    twitterUrl: "#",
    youtubeChanUrl: "https://www.youtube.com/@harfmixcom",
    footerText: "© Copyright 2026 Glowada ® | Glowada Ezgi Reklamevi Markasıdır.",
  };

  const sectors = [
    { name: "Mağaza Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/uygulama-1-1.jpg" },
    { name: "Gıda Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/coffee.jpg" },
    { name: "İş Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/wow-1024x500.jpg" },
    { name: "Otel Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/uygulama-4.jpg" },
    { name: "Sağlık Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/uygulama-5.jpg" },
    { name: "Eğitim Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/uygulama-6.jpg" },
    { name: "Duvar Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/uygulama-8.jpg" },
    { name: "Dış Mekan Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/uygulama-9.jpg" },
    { name: "Etkinlik Tabelaları", img: "https://harfmix.com/wp-content/uploads/2023/08/uygulama-7.jpg" },
  ];

  const partners = [
    "asus", "audi", "bmw", "electrolux", "express", "gree", "haier", "huawei",
    "iphone", "lg", "mercedes", "midea", "oppo", "samsung", "sony", "vivo"
  ];

  // Helper to extract YouTube video ID
  const getYoutubeEmbedUrl = (url: string) => {
    let videoId = "";
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        videoId = match[2];
      } else {
        const urlObj = new URL(url);
        if (urlObj.hostname === "youtu.be") {
          videoId = urlObj.pathname.substring(1);
        } else {
          videoId = urlObj.searchParams.get("v") || "";
        }
      }
    } catch (e) {
      console.error(e);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <div className="w-full bg-[#0a0202] text-slate-300 overflow-hidden font-sans">
      {/* 1. Hero Video / Slider Background */}
      <HeroSlider slides={slides} videoUrl={safeSettings.youtubeUrl} />

      {/* 2. Hakkımızda (About Us) Section */}
      <section id="about" className="py-24 px-4 bg-[#0a0202] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[#f44d46] font-extrabold uppercase tracking-widest text-xs">
                Bizi Tanıyın
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">
                Glowada Hakkında
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Glowada ile tanışın. Reklam, tabela ve tanıtım alanında yaratıcılığın sınırlarını zorlayan bir dünya. Markanızın özünü yakalayarak etkileyici tasarımlar ve parlak ışıkla buluşturuyoruz. Glowada olarak amacımız, işletmelerin vizyonunu, değerlerini ve hikayelerini en iyi şekilde yansıtan dış mekan reklam çözümleri sunmak. Markanızı daha parlak ve çarpıcı bir şekilde öne çıkarmanıza yardımcı olmak için buradayız.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-2">
              <div className="border-l-4 border-[#f44d46] pl-4">
                <span className="block text-2xl font-black text-white">10+ Yıl</span>
                <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider">
                  Sektörel Tecrübe
                </span>
              </div>
              <div className="border-l-4 border-[#f44d46] pl-4">
                <span className="block text-2xl font-black text-white">1500+</span>
                <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider">
                  Mutlu Müşteri
                </span>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="absolute -inset-4 bg-[#f44d46]/5 rounded-3xl -z-10 blur-xl"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://harfmix.com/wp-content/uploads/2023/08/hakkimizda-1.jpg"
              alt="Glowada Hakkımızda"
              className="rounded-2xl shadow-2xl aspect-[4/3] object-cover hover:scale-102 transition-transform"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://harfmix.com/wp-content/uploads/2023/08/wine-2.jpg"
              alt="Glowada Atölye"
              className="rounded-2xl shadow-2xl aspect-[4/3] object-cover mt-8 hover:scale-102 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* 3. Misyon & Vizyon & Sertifikalar Section */}
      <section className="py-20 px-4 bg-[#140808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card 1: Misyon & Vizyon */}
          <div className="p-8 rounded-3xl bg-[#0a0202] border border-slate-900 hover:border-[#f44d46]/30 transition-all flex flex-col justify-between gap-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-[#f44d46]/10 text-[#f44d46] rounded-2xl shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white">Misyon & Vizyonumuz</h3>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                  İnovasyonla markaları dönüştürmek ve etkileyici iletişim araçlarıyla iş dünyasına değer katmak. Küresel ölçekte öncü bir reklam çözümleri sağlayıcısı olarak tanınmak ve markaların geleceğini şekillendirmek.
                </p>
              </div>
            </div>
            <a href="#about" className="inline-flex items-center gap-1.5 text-xs font-black text-[#f44d46] hover:text-white uppercase tracking-wider self-start">
              <span>Detaylı Bilgi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Sertifikalar */}
          <div className="p-8 rounded-3xl bg-[#0a0202] border border-slate-900 hover:border-[#f44d46]/30 transition-all flex flex-col justify-between gap-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-[#f44d46]/10 text-[#f44d46] rounded-2xl shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white">Sertifikalarımız</h3>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                  Yüksek kalite standartlarına bağlılığımızı kanıtlayan çeşitli sertifikalara sahibiz. Bu sertifikalar, ürünlerimizin ve hizmetlerimizin güvenilirliğini ve performansını yansıtmaktadır.
                </p>
              </div>
            </div>
            <a href="#about" className="inline-flex items-center gap-1.5 text-xs font-black text-[#f44d46] hover:text-white uppercase tracking-wider self-start">
              <span>Detaylı Bilgi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. En Popüler Ürünümüz Section */}
      <section className="py-24 px-4 bg-[#0a0202]">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#140808] border border-slate-900 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f44d46]/5 rounded-full blur-3xl -z-0"></div>
          {/* Content */}
          <div className="flex flex-col gap-6 relative z-10">
            <div>
              <span className="text-[#f44d46] font-bold text-xs uppercase tracking-widest bg-[#f44d46]/10 py-1.5 px-4 rounded-full border border-[#f44d46]/20">
                En Popüler Ürünümüz
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
                Manyetik Harf Serisi
              </h2>
            </div>
            <p className="text-slate-450 leading-relaxed text-sm md:text-base">
              LED teknolojisi sayesinde Manyetik Harfler, göz alıcı ışıklandırmalarla markanızı gece gündüz ön planda tutar. Parlak ve enerji tasarruflu LED&apos;lerle donatılmış olan bu harfler, markanızın görünürlüğünü artırırken çevre dostu bir çözüm sunar.
            </p>
            <p className="text-slate-450 leading-relaxed text-sm md:text-base">
              Manyetik LED Harfler, markanızın hikayesini anlatmanın yeni ve yaratıcı bir yolunu sunar. Kendi tasarımlarınızı özelleştirerek veya profesyonel ekibimizle çalışarak, işletmenizin karakterini ve değerlerini harflerde yansıtabilirsiniz.
            </p>
            <a
              href="#talep-formu"
              className="inline-flex items-center justify-center bg-[#f44d46] hover:bg-[#d43d36] text-white font-extrabold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-[#f44d46]/25 transition-all text-sm uppercase self-start"
            >
              Fiyat Teklifi Al
            </a>
          </div>
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://harfmix.com/wp-content/uploads/2023/08/open-led-harf-2-1024x859.jpg"
              alt="Manyetik Harf Serisi"
              className="w-full h-full object-cover aspect-[4/3] hover:scale-103 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 5. Products Showcase */}
      <ProductShowcase products={products} whatsappNumber={safeSettings.whatsapp} />

      {/* 6. Neden Biz? (Why Us) Section */}
      <section id="why-us" className="py-24 px-4 bg-[#140808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-900 order-2 lg:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://harfmix.com/wp-content/uploads/2023/08/hakkimizda-1.jpg"
              alt="Neden Glowada"
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div>
              <span className="text-[#f44d46] font-extrabold uppercase tracking-widest text-xs">
                BİZİ TANIYIN
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">
                Neden Biz?
              </h2>
              <p className="text-slate-400 mt-4 text-sm md:text-base leading-relaxed">
                Glowada olarak, dış mekan reklam çözümleri alanında fark yaratıyoruz ve işletmelerin başarısını daha görünür kılmak için tutkuyla çalışıyoruz. Peki, bizi diğerlerinden ayıran nedir?
              </p>
            </div>
            {/* Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                { title: "Robotik Üretim Sistemi", desc: "Hatasız ve pürüzsüz üretim" },
                { title: "Veri Toplama Platformu", desc: "Süreç izleme ve raporlama" },
                { title: "Orijinal Tasarım", desc: "Göz alıcı neon/LED hatlar" },
                { title: "Kaliteli Ürün", desc: "Samsung LED ve paslanmaz metal" },
                { title: "ISO 9001 Sertifikası", desc: "Kalite kontrol standartları" },
                { title: "Güvenilirlik Testi", desc: "IP65 dış mekan dayanıklılık" }
              ].map((point, index) => (
                <div key={index} className="flex gap-2.5 items-start p-3 bg-[#0a0202] rounded-xl border border-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-[#f44d46] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{point.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. YouTube Videos Grid Section */}
      <section className="py-24 px-4 bg-[#0a0202] border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#f44d46] font-extrabold uppercase tracking-widest text-xs">
              VİDEOLAR
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">
              HER SEKTÖRE UYGUN
            </h2>
            <p className="text-slate-500 mt-4 text-sm md:text-base">
              Aşağıdaki videoları izleyin ve GLOWADA&apos;nın eşsiz ürünleri ile tanışın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.slice(0, 6).map((video) => {
              const embedUrl = getYoutubeEmbedUrl(video.youtubeUrl);
              return (
                <div
                  key={video.id}
                  className="bg-[#140808] rounded-3xl overflow-hidden border border-slate-900 hover:border-[#f44d46]/30 hover:shadow-2xl transition-all flex flex-col h-full group"
                >
                  <div className="relative aspect-video bg-black">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={video.title || "Glowada Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0"
                      ></iframe>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-600">Video Yüklenemedi</div>
                    )}
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-center">
                    <h3 className="font-extrabold text-white text-base tracking-tight truncate group-hover:text-[#f44d46] transition-colors">
                      {video.title || "YouTube Videosu"}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Sektörel Uygulamalar Section */}
      <section className="py-24 px-4 bg-[#140808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#f44d46] font-extrabold uppercase tracking-widest text-xs">
              Referans Uygulamalar
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">
              Sektörel Uygulamalar
            </h2>
            <p className="text-slate-555 mt-4 text-sm md:text-base">
              İşletmelerin kimliklerini ve mesajlarını etkileyici bir şekilde yansıtan özelleştirilmiş uygulamalarımızla sektörel başarılarınızı destekliyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-900 cursor-pointer"
              >
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sector.img}
                  alt={sector.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 group-hover:from-black/90 transition-all duration-300"></div>
                {/* Title */}
                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <span className="inline-block bg-[#f44d46] text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md mb-2">
                    GLOWADA
                  </span>
                  <h4 className="text-white font-extrabold text-lg tracking-tight group-hover:text-[#feb311] transition-colors">
                    {sector.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Talep Formu (Request Form) */}
      <div id="talep-formu">
        <ContactForm settings={safeSettings} />
      </div>

      {/* 10. Partnerlerimiz Section */}
      <section className="py-20 px-4 bg-[#0a0202] border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-black text-xl text-white uppercase tracking-widest mb-10">
            Partnerlerimiz
          </h2>
          <div className="relative w-full overflow-hidden py-4 select-none">
            <div className="flex w-[200%] gap-12 animate-marquee">
              {/* Duplicate list to loop smoothly */}
              {[...partners, ...partners].map((logo, index) => (
                <div key={index} className="flex justify-center items-center shrink-0 w-24 md:w-32 h-14 bg-white/5 rounded-xl border border-white/5 p-3 hover:bg-white/10 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://harfmix.com/wp-content/uploads/2023/08/${logo}-150x90.jpg`}
                    alt={logo}
                    className="h-full object-contain filter invert opacity-50 hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tailwind Marquee animation style */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
