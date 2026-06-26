import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Public GET
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, videos });
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

    const { youtubeUrl, title, order } = await request.json();

    if (!youtubeUrl) {
      return NextResponse.json(
        { success: false, error: "YouTube URL is required" },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        youtubeUrl,
        title: title || "",
        order: typeof order === "number" ? order : parseInt(order || "0") || 0,
      },
    });

    return NextResponse.json({ success: true, video });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || error },
      { status: 500 }
    );
  }
}
