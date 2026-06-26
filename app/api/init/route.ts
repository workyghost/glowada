import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/seed";

export async function GET() {
  const success = await ensureSeeded();
  if (success) {
    return NextResponse.json({
      success: true,
      message: "Database initialized successfully (admin / glowada123).",
    });
  } else {
    return NextResponse.json(
      { success: false, error: "Failed to initialize database." },
      { status: 500 }
    );
  }
}
