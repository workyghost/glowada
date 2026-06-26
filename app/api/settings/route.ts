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
      distributorText,
      youtubeUrl,
      instagramUrl,
      facebookUrl,
      twitterUrl,
      youtubeChanUrl,
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
        distributorText: distributorText || "",
        youtubeUrl: youtubeUrl || "",
        instagramUrl: instagramUrl || "",
        facebookUrl: facebookUrl || "",
        twitterUrl: twitterUrl || "",
        youtubeChanUrl: youtubeChanUrl || "",
        footerText: footerText || "",
      },
      create: {
        id: "default",
        logoUrl: logoUrl || "Glowada",
        phone: phone || "",
        email: email || "",
        whatsapp: whatsapp || "",
        address: address || "",
        distributorText: distributorText || "",
        youtubeUrl: youtubeUrl || "",
        instagramUrl: instagramUrl || "",
        facebookUrl: facebookUrl || "",
        twitterUrl: twitterUrl || "",
        youtubeChanUrl: youtubeChanUrl || "",
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
