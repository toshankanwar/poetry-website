// app/api/send-welcome-email/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, name } = await request.json();
    const MAIL_API_URL = process.env.MAIL_API_URL;
    const response = await fetch(`${MAIL_API_URL}/api/send-welcome-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    if (!response.ok) throw new Error("Failed to send welcome email");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
