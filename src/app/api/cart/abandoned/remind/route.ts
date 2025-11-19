import { NextRequest, NextResponse } from "next/server";
import { sendAbandonedCartReminders } from "@/lib/api/cart";

export async function POST(req: NextRequest) {
  try {
    const count = await sendAbandonedCartReminders();

    return NextResponse.json({
      message: "Abandoned cart reminders successfully sent.",
      count: count,
    });
  } catch (error) {
    console.error("Failed to send abandoned cart reminders:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
