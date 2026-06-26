"use client";

import React from "react";
import { Tv } from "lucide-react";

export default function YoutubePlayer({ youtubeUrl }: { youtubeUrl?: string }) {
  if (!youtubeUrl) return null;

  // Extract YouTube ID
  let videoId = "";
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    } else {
      const urlObj = new URL(youtubeUrl);
      if (urlObj.hostname === "youtu.be") {
        videoId = urlObj.pathname.substring(1);
      } else {
        videoId = urlObj.searchParams.get("v") || "";
      }
    }
  } catch (e) {
    console.error("Failed to parse YouTube URL:", e);
  }

  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section className="py-20 px-4 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-full bg-slate-800 border border-slate-700 mb-4 text-glowada-500">
            <Tv className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Üretim & Tanıtım Videomuz
          </h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Atölyemizden görüntüler, kutu harf büküm süreçleri ve tamamlanan LED tabela projelerimizi izleyin.
          </p>
        </div>

        {/* Video Wrapper */}
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-black">
          <iframe
            src={embedUrl}
            title="Glowada Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
