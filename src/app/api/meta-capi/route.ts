import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

// Hash user data for privacy (required by Meta)
function hashData(data: string | undefined): string | undefined {
  if (!data) return undefined;
  return crypto.createHash("sha256").update(data.toLowerCase()).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, eventSourceUrl, userData = {}, customData = {} } = body;

    if (!eventName) {
      return NextResponse.json(
        { error: "eventName is required" },
        { status: 400 }
      );
    }

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Meta Pixel ID or Access Token not configured" },
        { status: 500 }
      );
    }

    // Get client IP and user agent
    const clientIpAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "";
    const clientUserAgent = request.headers.get("user-agent") || "";

    // Build the event data
    const eventData = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: eventSourceUrl || request.headers.get("referer") || "",
      action_source: "website",
      user_data: {
        client_ip_address: clientIpAddress,
        client_user_agent: clientUserAgent,
        // Hash PII data
        em: userData.email ? hashData(userData.email) : undefined,
        ph: userData.phone ? hashData(userData.phone) : undefined,
        fn: userData.firstName ? hashData(userData.firstName) : undefined,
        ln: userData.lastName ? hashData(userData.lastName) : undefined,
        ct: userData.city ? hashData(userData.city) : undefined,
        st: userData.state ? hashData(userData.state) : undefined,
        zp: userData.zipCode ? hashData(userData.zipCode) : undefined,
        country: userData.country ? hashData(userData.country) : undefined,
        fbc: userData.fbc || undefined, // Facebook click ID
        fbp: userData.fbp || undefined, // Facebook browser ID
      },
      custom_data: customData,
    };

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI error:", result);
      return NextResponse.json(
        { error: "Failed to send event to Meta", details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Event sent successfully",
      result,
    });
  } catch (error) {
    console.error("Error processing Meta CAPI request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
