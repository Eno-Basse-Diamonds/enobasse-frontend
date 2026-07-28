import { NextRequest, NextResponse } from "next/server";

import { sendAbandonedCartReminders } from "@/modules/cart/api";
import { logger } from "@/shared/utils/logger";

/**
 * Sends abandoned cart reminder emails.
 *
 * @description Triggers abandoned cart email reminders for customers who left
 * items in their cart. Called by a cron job or admin action.
 *
 * @param req - The incoming Next.js request.
 * @returns A JSON response with success message and count, or an error response.
 */
export async function POST(req: NextRequest) {
  try {
    const count = await sendAbandonedCartReminders();

    return NextResponse.json({
      message: "Abandoned cart reminders successfully sent.",
      count: count,
    });
  } catch (error) {
    logger.error("Failed to send abandoned cart reminders:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
