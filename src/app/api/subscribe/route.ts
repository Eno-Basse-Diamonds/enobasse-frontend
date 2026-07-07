import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/utils/logger";
import { API_URL } from "@/lib/utils/constants/api-url";

const EmailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    const emailValidation = EmailSchema.safeParse(email);
    if (!emailValidation.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
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
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
