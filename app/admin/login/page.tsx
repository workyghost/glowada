"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Lock, User, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-glowada-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-glowada-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="p-4 bg-glowada-500 rounded-2xl text-slate-950 shadow-xl shadow-glowada-500/10">
            <Settings className="w-8 h-8 animate-spin-slow" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-white uppercase">
          GLOW<span className="text-glowada-500">ADA</span> Admin
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Yönetici panelinde oturum açın
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900 py-8 px-4 shadow-2xl rounded-3xl border border-slate-800 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-2.5 text-sm animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-xs font-bold uppercase text-slate-400 tracking-wider">
                Kullanıcı Adı
              </label>
              <div className="mt-1.5 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-550">
                  <User className="h-4.5 w-4.5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-850 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-glowada-500 focus:ring-1 focus:ring-glowada-500 placeholder-slate-600 transition-colors"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase text-slate-400 tracking-wider">
                Şifre
              </label>
              <div className="mt-1.5 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-550">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-850 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-glowada-500 focus:ring-1 focus:ring-glowada-500 placeholder-slate-600 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-black text-slate-950 bg-glowada-500 hover:bg-glowada-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-glowada-500 transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                {loading ? "Giriş Yapılıyor..." : "Yönetici Girişi"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-550 border-t border-slate-800 pt-4 flex flex-col gap-1.5">
            <p>Seeding yapılmadıysa ilk girişte hata alabilirsiniz.</p>
            <a
              href="/api/init"
              target="_blank"
              className="text-glowada-500 hover:underline inline-block font-semibold"
            >
              Veritabanını Otomatik Sıfırla & Hazırla (/api/init)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
