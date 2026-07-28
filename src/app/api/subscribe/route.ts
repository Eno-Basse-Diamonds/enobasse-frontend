import { NextRequest, NextResponse } from "next/server";

import axios from "axios";
import { z } from "zod";

import { API_URL } from "@/shared/constants/url";
import { logger } from "@/shared/utils/logger";

const EmailSchema = z.string().email({ message: "Please enter a valid email address" });

/**
 * Handles newsletter subscription requests.
 *
 * @description Validates the email, forwards the subscription to the backend
 * API, and returns the appropriate response for success, duplicate, or error.
 *
 * @param request - The incoming Next.js request with an email in the body.
 * @returns A JSON response indicating success, duplicate subscription, or error.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    const emailValidation = EmailSchema.safeParse(email);
    if (!emailValidation.success) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    try {
      const response = await axios.post(`${API_URL}/newsletter/subscribe`, {
        email: emailValidation.data,
      });

      if (response.status === 201) {
        return NextResponse.json(
          { message: "Awesome! You have successfully subscribed!" },
          { status: 201 },
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          return NextResponse.json(
            { error: "You are already subscribed to our newsletter!" },
            { status: 409 },
          );
        }
        logger.error("Backend newsletter subscription error details:", error.response?.data);
      }

      logger.error("Error subscribing to newsletter on backend:", error);
      return NextResponse.json(
        {
          error:
            "Oops! There was an error subscribing you to the newsletter. Please try again later.",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
