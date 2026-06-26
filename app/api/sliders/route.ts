import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Public GET
export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, slides });
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

    const { title, description, imageUrl, linkUrl, order } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Image URL is required" },
        { status: 400 }
      );
    }

    const slide = await prisma.slide.create({
      data: {
        title: title || "",
        description: description || "",
        imageUrl,
        linkUrl: linkUrl || "",
        order: typeof order === "number" ? order : parseInt(order || "0") || 0,
      },
    });

    return NextResponse.json({ success: true, slide });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || error },
      { status: 500 }
    );
  }
}
