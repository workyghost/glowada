"use client";

import React, { useState } from "react";
import {
  Settings,
  Image as ImageIcon,
  Package,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  FileText,
  MapPin,
  Mail,
  Phone,
  Video as VideoIcon
} from "lucide-react";

interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
  order: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  price: string;
  order: number;
}

interface VideoType {
  id: string;
  youtubeUrl: string;
  title: string;
  order: number;
}

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

interface AdminDashboardProps {
  initialSlides: Slide[];
  initialProducts: Product[];
  initialVideos?: VideoType[];
  initialSettings?: SettingsProps;
}

export default function AdminDashboard({
  initialSlides,
  initialProducts,
  initialVideos = [],
  initialSettings,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"settings" | "sliders" | "products" | "videos">("settings");

  // State Management
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [videos, setVideos] = useState<VideoType[]>(initialVideos);
  const [settings, setSettings] = useState<SettingsProps>(
    initialSettings || {
      logoUrl: "Glowada",
      phone: "",
      email: "",
      whatsapp: "",
      address: "",
      distributorText: "",
      youtubeUrl: "",
      instagramUrl: "",
      facebookUrl: "",
      twitterUrl: "",
      youtubeChanUrl: "",
      footerText: "",
    }
  );

  // Form states - Settings
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form states - Sliders
  const [newSlide, setNewSlide] = useState({
    imageUrl: "",
    title: "",
    description: "",
    linkUrl: "",
    order: "0",
  });
  const [slideLoading, setSlideLoading] = useState(false);
  const [slideStatus, setSlideStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form states - Products
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "",
    price: "",
    order: "0",
  });
  const [productLoading, setProductLoading] = useState(false);
  const [productStatus, setProductStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form states - Videos
  const [newVideo, setNewVideo] = useState({
    youtubeUrl: "",
    title: "",
    order: "0",
  });
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoStatus, setVideoStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Actions - Settings Update
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsStatus(null);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSettingsStatus({ type: "success", message: "Ayarlar başarıyla kaydedildi." });
        setSettings(data.settings);
      } else {
        setSettingsStatus({ type: "error", message: data.error || "Ayarlar kaydedilirken bir hata oluştu." });
      }
    } catch (err) {
      setSettingsStatus({ type: "error", message: "Ağ hatası. Tekrar deneyiniz." });
    } finally {
      setSettingsLoading(false);
    }
  };

  // Actions - Add Slide
  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlide.imageUrl) {
      setSlideStatus({ type: "error", message: "Resim URL alanı zorunludur." });
      return;
    }

    setSlideLoading(true);
    setSlideStatus(null);

    try {
      const res = await fetch("/api/sliders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSlide,
          order: parseInt(newSlide.order) || 0,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSlides((prev) => [...prev, data.slide].sort((a, b) => a.order - b.order));
        setNewSlide({ imageUrl: "", title: "", description: "", linkUrl: "", order: "0" });
        setSlideStatus({ type: "success", message: "Slayt başarıyla eklendi." });
        setTimeout(() => setSlideStatus(null), 3000);
      } else {
        setSlideStatus({ type: "error", message: data.error || "Slayt eklenirken bir hata oluştu." });
      }
    } catch (err) {
      setSlideStatus({ type: "error", message: "Ağ hatası. Tekrar deneyiniz." });
    } finally {
      setSlideLoading(false);
    }
  };

  // Actions - Delete Slide
  const handleDeleteSlide = async (id: string) => {
    if (!confirm("Bu slaytı silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/sliders/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSlides((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(data.error || "Slayt silinemedi.");
      }
    } catch (err) {
      alert("Ağ hatası oluştu.");
    }
  };

  // Actions - Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.imageUrl || !newProduct.category) {
      setProductStatus({ type: "error", message: "Lütfen zorunlu alanları doldurunuz." });
      return;
    }

    setProductLoading(true);
    setProductStatus(null);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          order: parseInt(newProduct.order) || 0,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) => [...prev, data.product].sort((a, b) => a.order - b.order));
        setNewProduct({ name: "", description: "", imageUrl: "", category: "", price: "", order: "0" });
        setProductStatus({ type: "success", message: "Ürün başarıyla eklendi." });
        setTimeout(() => setProductStatus(null), 3000);
      } else {
        setProductStatus({ type: "error", message: data.error || "Ürün eklenirken bir hata oluştu." });
      }
    } catch (err) {
      setProductStatus({ type: "error", message: "Ağ hatası. Tekrar deneyiniz." });
    } finally {
      setProductLoading(false);
    }
  };

  // Actions - Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.error || "Ürün silinemedi.");
      }
    } catch (err) {
      alert("Ağ hatası oluştu.");
    }
  };

  // Actions - Add Video
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.youtubeUrl) {
      setVideoStatus({ type: "error", message: "YouTube URL alanı zorunludur." });
      return;
    }

    setVideoLoading(true);
    setVideoStatus(null);

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newVideo,
          order: parseInt(newVideo.order) || 0,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVideos((prev) => [...prev, data.video].sort((a, b) => a.order - b.order));
        setNewVideo({ youtubeUrl: "", title: "", order: "0" });
        setVideoStatus({ type: "success", message: "Video başarıyla eklendi." });
        setTimeout(() => setVideoStatus(null), 3000);
      } else {
        setVideoStatus({ type: "error", message: data.error || "Video eklenirken bir hata oluştu." });
      }
    } catch (err) {
      setVideoStatus({ type: "error", message: "Ağ hatası. Tekrar deneyiniz." });
    } finally {
      setVideoLoading(false);
    }
  };

  // Actions - Delete Video
  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Bu videoyu silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      } else {
        alert(data.error || "Video silinemedi.");
      }
    } catch (err) {
      alert("Ağ hatası oluştu.");
    }
  };

  return (
    <div className="flex flex-col gap-8 text-slate-800">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Yönetim Paneli</h1>
          <p className="text-slate-500 text-sm mt-1">Glowada web sitesi içerik ve ayarlarını buradan güncelleyin.</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-semibold shadow-sm transition-colors"
          >
            <span>Siteyi Görüntüle</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1 bg-white p-1.5 rounded-2xl border">
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "settings"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Genel Ayarlar</span>
        </button>
        <button
          onClick={() => setActiveTab("sliders")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "sliders"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Slayt Yönetimi</span>
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "products"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Ürün Yönetimi</span>
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === "videos"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <VideoIcon className="w-4 h-4" />
          <span>Video Yönetimi</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="w-full">
        {/* Tab 1: Settings */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm animate-fadeIn">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#f44d46]" />
              <span>Sistem Ayarları</span>
            </h2>

            {settingsStatus && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-start gap-2.5 text-sm ${
                  settingsStatus.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {settingsStatus.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-650 shrink-0" />
                )}
                <span>{settingsStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">Logo / Marka İsmi</label>
                  <input
                    type="text"
                    value={settings.logoUrl}
                    onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="Glowada veya Logo Resim URL"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Telefon Numarası</span>
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="+90 (212) 664 57 67"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>E-Posta Adresi</span>
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="info@glowada.com"
                  />
                </div>

                {/* Whatsapp */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650 flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Numarası</span>
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="+90 532 551 68 44"
                  />
                  <span className="text-[10px] text-slate-400">Ülke kodu ve başında + olmadan sadece rakam önerilir.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Distributor text */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">Distribütör Açıklama Notu</label>
                  <input
                    type="text"
                    value={settings.distributorText}
                    onChange={(e) => setSettings({ ...settings, distributorText: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="Glowada Abcmix'in Türkiye Distribütörüdür."
                  />
                </div>

                {/* Hero Background video URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650 flex items-center gap-1">
                    <VideoIcon className="w-3.5 h-3.5" />
                    <span>Kahraman Bölgesi Video Arka Planı (MP4 URL)</span>
                  </label>
                  <input
                    type="text"
                    value={settings.youtubeUrl}
                    onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="https://www.elegansajans.com/wp-content/.../manyetik-harf-serisi.mp4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Socials - Instagram */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">Instagram Linki</label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="https://instagram.com/harfmix"
                  />
                </div>

                {/* Socials - Facebook */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">Facebook Linki</label>
                  <input
                    type="url"
                    value={settings.facebookUrl}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="https://facebook.com/glowada"
                  />
                </div>

                {/* Socials - Twitter */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">Twitter/X Linki</label>
                  <input
                    type="url"
                    value={settings.twitterUrl}
                    onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="https://twitter.com/glowada"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Youtube Channel URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">YouTube Kanal Linki</label>
                  <input
                    type="url"
                    value={settings.youtubeChanUrl}
                    onChange={(e) => setSettings({ ...settings, youtubeChanUrl: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="https://youtube.com/@glowadacom"
                  />
                </div>

                {/* Footer text */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Footer Telif Hakkı Metni</span>
                  </label>
                  <input
                    type="text"
                    value={settings.footerText}
                    onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="© Copyright 2026 Glowada ® | Glowada Ezgi Reklamevi Markasıdır."
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase text-slate-650 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Adres Tanımı</span>
                </label>
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={3}
                  className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors resize-none"
                  placeholder="Seyitnizam Mah. Demirciler Sit. 9. Cd. No:36 34015 Zeytinburnu/İstanbul"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={settingsLoading}
                  className="flex items-center gap-2 bg-slate-900 hover:bg-[#f44d46] hover:text-white text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{settingsLoading ? "Kaydediliyor..." : "Ayarları Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Sliders */}
        {activeTab === "sliders" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Add Slide Form */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#f44d46]" />
                <span>Yeni Slayt Ekle</span>
              </h2>

              {slideStatus && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start gap-2.5 text-sm ${
                    slideStatus.type === "success"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {slideStatus.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-650 shrink-0" />
                  )}
                  <span>{slideStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleAddSlide} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Slayt Başlığı</label>
                    <input
                      type="text"
                      required
                      value={newSlide.title}
                      onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="Görünürlüğünüzü Artırın"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Resim URL Adresi *</label>
                    <input
                      type="url"
                      required
                      value={newSlide.imageUrl}
                      onChange={(e) => setNewSlide({ ...newSlide, imageUrl: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="https://harfmix.com/wp-content/uploads/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Kısa Açıklama</label>
                    <input
                      type="text"
                      value={newSlide.description}
                      onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="Glowada ile tanışın. Reklam ve tanıtımda sınırları zorluyoruz."
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Sıralama Değeri (Order)</label>
                    <input
                      type="number"
                      value={newSlide.order}
                      onChange={(e) => setNewSlide({ ...newSlide, order: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">Buton Linki</label>
                  <input
                    type="text"
                    value={newSlide.linkUrl}
                    onChange={(e) => setNewSlide({ ...newSlide, linkUrl: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                    placeholder="#talep-formu (veya dış link)"
                  />
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={slideLoading}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-[#f44d46] hover:text-white text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
                  >
                    <Plus className="w-4.5 h-4.5" />
                    <span>Slayt Ekle</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Slide List */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#f44d46]" />
                <span>Mevcut Slaytlar</span>
              </h2>

              {slides.length === 0 ? (
                <p className="text-center text-slate-500 py-6">Henüz slayt eklenmemiş.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {slides.map((slide) => (
                    <div
                      key={slide.id}
                      className="border border-slate-150 rounded-2xl overflow-hidden flex flex-col bg-slate-50 group hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-video bg-slate-200 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black py-1 px-2.5 rounded-full border border-white/10">
                          Sıra: {slide.order}
                        </span>
                      </div>

                      <div className="p-4 flex-grow flex flex-col justify-between gap-4">
                        <div>
                          <h4 className="font-extrabold text-base text-slate-900 truncate">{slide.title || "(Başlıksız)"}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{slide.description}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex justify-end">
                          <button
                            onClick={() => handleDeleteSlide(slide.id)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Slaytı Sil</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Products */}
        {activeTab === "products" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Add Product Form */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#f44d46]" />
                <span>Yeni Ürün / Uygulama Ekle</span>
              </h2>

              {productStatus && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start gap-2.5 text-sm ${
                    productStatus.type === "success"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {productStatus.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-650 shrink-0" />
                  )}
                  <span>{productStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleAddProduct} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Ürün Adı *</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="Manyetik Harf Serisi"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Kategori *</label>
                    <input
                      type="text"
                      required
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="Örn: Ürünlerimiz veya Aksesuarlar"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Görsel URL Adresi *</label>
                    <input
                      type="url"
                      required
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="https://harfmix.com/wp-content/uploads/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Detaylı Açıklama</label>
                    <input
                      type="text"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="Manyetik LED Harfler, markanızın hikayesini anlatır..."
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Fiyat Açıklaması / Not</label>
                    <input
                      type="text"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="Detaylı Bilgi İçin Teklif Alın"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">Sıralama Değeri (Order)</label>
                  <input
                    type="number"
                    value={newProduct.order}
                    onChange={(e) => setNewProduct({ ...newProduct, order: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors w-full md:w-1/3"
                    placeholder="0"
                  />
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={productLoading}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-[#f44d46] hover:text-white text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
                  >
                    <Plus className="w-4.5 h-4.5" />
                    <span>Ürün Ekle</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Product List */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#f44d46]" />
                <span>Mevcut Ürünler</span>
              </h2>

              {products.length === 0 ? (
                <p className="text-center text-slate-500 py-6">Henüz ürün eklenmemiş.</p>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold text-xs uppercase tracking-wider">
                        <th className="py-4 px-6">Görsel</th>
                        <th className="py-4 px-6">Ürün Adı</th>
                        <th className="py-4 px-6">Kategori</th>
                        <th className="py-4 px-6">Fiyat</th>
                        <th className="py-4 px-6">Sıra</th>
                        <th className="py-4 px-6 text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="w-16 h-12 bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="py-4 px-6 font-bold text-slate-900">
                            <div>
                              <p className="truncate max-w-[200px]">{product.name}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-1 px-2.5 rounded-full">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-semibold text-slate-700">{product.price || "—"}</td>
                          <td className="py-4 px-6 font-semibold text-slate-500">{product.order}</td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="inline-flex items-center gap-1 py-1.5 px-3 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-xs font-bold transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Sil</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Videos */}
        {activeTab === "videos" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Add Video Form */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#f44d46]" />
                <span>Yeni YouTube Videosu Ekle</span>
              </h2>

              {videoStatus && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start gap-2.5 text-sm ${
                    videoStatus.type === "success"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {videoStatus.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-650 shrink-0" />
                  )}
                  <span>{videoStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleAddVideo} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">Video Başlığı</label>
                    <input
                      type="text"
                      required
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="Manyetik Harf Serisi Tanıtımı"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-650">YouTube Video URL *</label>
                    <input
                      type="url"
                      required
                      value={newVideo.youtubeUrl}
                      onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors"
                      placeholder="https://www.youtube.com/watch?v=uijwS3VUgrw"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase text-slate-650">Sıralama Değeri (Order)</label>
                  <input
                    type="number"
                    value={newVideo.order}
                    onChange={(e) => setNewVideo({ ...newVideo, order: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#f44d46] transition-colors w-full md:w-1/3"
                    placeholder="1"
                  />
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={videoLoading}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-[#f44d46] hover:text-white text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
                  >
                    <Plus className="w-4.5 h-4.5" />
                    <span>Video Ekle</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Video List */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <VideoIcon className="w-5 h-5 text-[#f44d46]" />
                <span>Mevcut Videolar (Maksimum 6 adet tavsiye edilir)</span>
              </h2>

              {videos.length === 0 ? (
                <p className="text-center text-slate-500 py-6">Henüz video eklenmemiş.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="border border-slate-150 rounded-2xl overflow-hidden flex flex-col bg-slate-50 group hover:shadow-md transition-shadow"
                    >
                      {/* Embed Preview */}
                      <div className="relative aspect-video bg-black overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${
                            video.youtubeUrl.includes("v=")
                              ? video.youtubeUrl.split("v=")[1].split("&")[0]
                              : video.youtubeUrl.split("/").pop()
                          }`}
                          title={video.title}
                          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                        ></iframe>
                      </div>

                      <div className="p-4 flex-grow flex flex-col justify-between gap-4">
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900 truncate">{video.title || "YouTube Videosu"}</h4>
                          <p className="text-[10px] text-slate-400 truncate mt-1">{video.youtubeUrl}</p>
                          <span className="inline-block bg-slate-200 text-slate-700 text-[10px] font-bold py-0.5 px-2 rounded mt-2">
                            Sıra: {video.order}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex justify-end">
                          <button
                            onClick={() => handleDeleteVideo(video.id)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Videoyu Sil</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
