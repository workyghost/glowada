"use client";

import React, { useState } from "react";
import { MessageCircle, Send, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";

interface SettingsProps {
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
}

export default function ContactForm({ settings }: { settings: SettingsProps }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "LED Tabela",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock api sending delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "LED Tabela",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, "") || "";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, web siteniz üzerinden iletişim kuruyorum. Teklif almak istediğim konular var."
  )}`;
  const phoneLink = `tel:${settings?.phone?.replace(/\s+/g, "")}`;

  return (
    <section id="contact" className="py-20 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl">
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-glowada-400 font-extrabold uppercase tracking-widest text-xs">
                  Bize Ulaşın
                </span>
                <h3 className="text-3xl font-black mt-2 tracking-tight">
                  Projenizi Birlikte Planlayalım
                </h3>
                <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                  İşletmeniz için en uygun tabela modelini seçmek ve fiyat teklifi almak için formu doldurabilir veya doğrudan WhatsApp hattımızdan bizimle iletişime geçebilirsiniz.
                </p>
              </div>

              <div className="h-px bg-slate-800 my-2"></div>

              {/* Details */}
              <ul className="flex flex-col gap-5 text-sm">
                {settings?.address && (
                  <li className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-glowada-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 leading-relaxed">{settings.address}</span>
                  </li>
                )}
                {settings?.phone && (
                  <li className="flex items-center gap-3.5">
                    <Phone className="w-5 h-5 text-glowada-500 shrink-0" />
                    <a href={phoneLink} className="text-slate-300 hover:text-white transition-colors">
                      {settings.phone}
                    </a>
                  </li>
                )}
                {settings?.email && (
                  <li className="flex items-center gap-3.5">
                    <Mail className="w-5 h-5 text-glowada-500 shrink-0" />
                    <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-white transition-colors">
                      {settings.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Direct CTA */}
            {settings?.whatsapp && (
              <div className="mt-8 pt-8 border-t border-slate-800">
                <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                  Hızlı Çözüm İçin
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>WhatsApp ile Hızlı İletişim</span>
                </a>
              </div>
            )}
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 flex flex-col justify-center">
            <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
              Teklif İstek Formu
            </h4>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl flex flex-col items-center text-center gap-3 animate-scaleIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                <h5 className="font-extrabold text-lg">Tebrikler! Mesajınız Alındı</h5>
                <p className="text-sm text-emerald-800 max-w-sm">
                  Tabela projenizle ilgili bilgiler bize ulaştı. Satış temsilcimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-extrabold text-slate-700 uppercase">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-glowada-500 transition-colors text-slate-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-extrabold text-slate-700 uppercase">
                      Telefon Numaranız *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Örn: 0555 123 4567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-glowada-500 transition-colors text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-extrabold text-slate-700 uppercase">
                      E-Posta Adresiniz
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Örn: ahmet@sirketiniz.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-glowada-500 transition-colors text-slate-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs font-extrabold text-slate-700 uppercase">
                      İlgilendiğiniz Hizmet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-glowada-500 transition-colors text-slate-900"
                    >
                      <option value="LED Tabela">LED Tabela / Kayan Yazı</option>
                      <option value="Kutu Harf">Pleksi / Krom Kutu Harf</option>
                      <option value="Yol Tabelası">Yol & Çatı Tabelası</option>
                      <option value="Totem Tabela">Totem Tabela</option>
                      <option value="Diğer">Diğer / Özel Reklam Çözümleri</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-extrabold text-slate-700 uppercase">
                    Mesajınız & Proje Detayları *
                    <span className="text-[10px] text-slate-400 normal-case ml-2">
                      (Ölçü, renk, montaj yeri vb.)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="İstediğiniz tabela özellikleri hakkında detay yazınız..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-glowada-500 transition-colors text-slate-900 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-glowada-500 hover:text-slate-900 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-md mt-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Gönderiliyor...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Teklif İsteğini Gönder</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
