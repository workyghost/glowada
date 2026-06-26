"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [slides.length, handleNext]);

  if (!slides || slides.length === 0) {
    return (
      <div className="relative h-[70vh] bg-slate-900 flex items-center justify-center text-white">
        <p className="text-xl">Görsel slayt bulunamadı. Lütfen yönetici panelinden slayt ekleyin.</p>
      </div>
    );
  }

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-slate-950">
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/65 mix-blend-multiply" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="max-w-4xl text-center text-white flex flex-col items-center gap-6">
              {slide.title && (
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight animate-fadeInUp">
                  {slide.title}
                </h1>
              )}
              {slide.description && (
                <p className="text-base md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed animate-fadeInUp delay-100">
                  {slide.description}
                </p>
              )}
              {slide.linkUrl && (
                <a
                  href={slide.linkUrl}
                  className="inline-flex items-center gap-2 bg-glowada-500 hover:bg-glowada-600 text-slate-950 font-extrabold py-3.5 px-8 rounded-full shadow-lg hover:shadow-glowada-500/20 hover:scale-105 transition-all text-base animate-fadeInUp delay-200"
                >
                  <span>Detayları İncele</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/35 hover:bg-glowada-500 hover:text-slate-950 text-white p-3 rounded-full transition-all border border-white/10"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/35 hover:bg-glowada-500 hover:text-slate-950 text-white p-3 rounded-full transition-all border border-white/10"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3.5 h-3.5 rounded-full transition-all ${
                index === current
                  ? "bg-glowada-500 w-8"
                  : "bg-white/40 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
