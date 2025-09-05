import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const API_SERVER = process.env.MAILCHIMP_API_SERVER;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!API_KEY || !API_SERVER || !AUDIENCE_ID) {
      console.error(
        "Mailchimp environment variables are not properly configured",
      );
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const data = {
      email_address: emailValidation.data,
      status: "subscribed",
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `api_key ${API_KEY}`,
      },
    };

    try {
      const response = await axios.post(url, data, options);
      if (response.status === 200) {
        return NextResponse.json(
          { message: "Awesome! You have successfully subscribed!" },
          { status: 201 },
        );
      }
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        if (error.response?.data.title === "Member Exists") {
          return NextResponse.json(
            { error: "You are already subscribed to our newsletter!" },
            { status: 409 },
          );
        }
      }

      return NextResponse.json(
        {
          error:
            "Oops! There was an error subscribing you to the newsletter. Please email us at info@enobasse.com and we'll add you to the list.",
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
