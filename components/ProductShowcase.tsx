"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  price: string;
}

export default function ProductShowcase({
  products,
  whatsappNumber,
}: {
  products: Product[];
  whatsappNumber?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  // Get unique categories
  const categories = ["Tümü", ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products
  const filteredProducts =
    selectedCategory === "Tümü"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const formattedWhatsapp = whatsappNumber?.replace(/\D/g, "") || "";

  const getProductWhatsappLink = (productName: string) => {
    const text = encodeURIComponent(
      `Merhaba, web sitenizdeki "${productName}" ürünü hakkında bilgi/fiyat teklifi almak istiyorum.`
    );
    return `https://wa.me/${formattedWhatsapp}?text=${text}`;
  };

  return (
    <section id="products" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-glowada-600 font-extrabold uppercase tracking-widest text-sm bg-glowada-50 py-1.5 px-4 rounded-full border border-glowada-100">
            Hizmet Yelpazemiz
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight">
            Ürün & Uygulamalarımız
          </h2>
          <p className="text-slate-500 mt-4 text-base md:text-lg">
            İşletmenizin reklam ihtiyaçları için birinci sınıf malzemeler ve uzman işçilikle ürettiğimiz tabela çözümlerini keşfedin.
          </p>
        </div>

        {/* Category Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-2.5 px-6 rounded-full font-bold text-sm transition-all border ${
                  selectedCategory === category
                    ? "bg-slate-900 border-slate-900 text-white shadow-md"
                    : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-slate-550 border border-dashed border-slate-200 rounded-2xl">
            Bu kategoride henüz ürün eklenmemiş.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-150 hover:border-glowada-300 hover:shadow-xl transition-all duration-350 flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 font-extrabold text-xs py-1 px-3 rounded-full border border-slate-200 shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Product Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2 group-hover:text-glowada-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {product.description}
                  </p>

                  <div className="pt-4 border-t border-slate-200 flex flex-col gap-3 mt-auto">
                    {/* Price if set */}
                    {product.price && (
                      <span className="text-glowada-700 font-black text-base">
                        {product.price}
                      </span>
                    )}

                    {/* WhatsApp CTA */}
                    <a
                      href={getProductWhatsappLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Fiyat Teklifi Al</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
