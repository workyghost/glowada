import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { LayoutGrid, Image, Package, Settings, LogOut, ArrowLeft } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Bypass authentication check for the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Check authentication status
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-wider text-white">
              GLOW<span className="text-glowada-500">ADA</span>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                Panel Kontrol
              </span>
            </span>
          </Link>
        </div>

        {/* Navigation List */}
        <nav className="flex-grow p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-805 text-sm font-semibold transition-colors text-slate-300 hover:text-white"
          >
            <LayoutGrid className="w-5 h-5 text-glowada-500" />
            <span>Dashboard</span>
          </Link>

          <div className="h-px bg-slate-800 my-4"></div>

          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-805 text-sm font-semibold transition-colors text-slate-350 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Siteye Geri Dön</span>
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between bg-slate-850 p-3 rounded-xl mb-3">
            <div className="overflow-hidden">
              <p className="text-xs text-slate-500 font-bold uppercase">Yönetici</p>
              <p className="text-sm font-bold text-slate-205 truncate">{session.username}</p>
            </div>
          </div>

          <form action="/api/auth/logout" method="POST" className="w-full">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-red-650 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Oturumu Kapat</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Content Wrapper */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
