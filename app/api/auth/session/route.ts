import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, authenticated: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.json({
      success: true,
      authenticated: true,
      user: { userId: session.userId, username: session.username },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, authenticated: false, error: error.message || error },
      { status: 500 }
    );
  }
}
