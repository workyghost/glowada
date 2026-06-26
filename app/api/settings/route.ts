import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Public GET
export async function GET() {
  try {
    let settings = await prisma.setting.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.setting.create({
        data: {
          id: "default",
          logoUrl: "Glowada",
          phone: "+90 555 123 45 67",
          email: "info@glowada.com",
          whatsapp: "+90 555 123 45 67",
          address: "İkitelli OSB, İSDÖK Sanayi Sitesi, 2. Blok No: 12, Başakşehir / İstanbul",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          instagramUrl: "https://instagram.com/glowada",
          facebookUrl: "https://facebook.com/glowada",
          footerText: "© 2026 Glowada LED & Tabela Sistemleri. Tüm hakları saklıdır.",
        },
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || error },
      { status: 500 }
    );
  }
}

// Protected POST
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const {
      logoUrl,
      phone,
      email,
      whatsapp,
      address,
      youtubeUrl,
      instagramUrl,
      facebookUrl,
      footerText,
    } = await request.json();

    const settings = await prisma.setting.upsert({
      where: { id: "default" },
      update: {
        logoUrl: logoUrl !== undefined ? logoUrl : "Glowada",
        phone: phone || "",
        email: email || "",
        whatsapp: whatsapp || "",
        address: address || "",
        youtubeUrl: youtubeUrl || "",
        instagramUrl: instagramUrl || "",
        facebookUrl: facebookUrl || "",
        footerText: footerText || "",
      },
      create: {
        id: "default",
        logoUrl: logoUrl || "Glowada",
        phone: phone || "",
        email: email || "",
        whatsapp: whatsapp || "",
        address: address || "",
        youtubeUrl: youtubeUrl || "",
        instagramUrl: instagramUrl || "",
        facebookUrl: facebookUrl || "",
        footerText: footerText || "",
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || error },
      { status: 500 }
    );
  }
}
