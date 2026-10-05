import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

// Fallback admin credentials for site owner emergency / direct access
const FALLBACK_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "nationalcake@gmail.com";
const FALLBACK_ADMIN_PASS = process.env.ADMIN_PASSWORD || "Admin@NationalCake2025!";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    let authenticated = false;
    let authUser = { email: trimmedEmail, role: "admin" };

    // 1. Try Supabase Auth first if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (!error && data.user) {
          authenticated = true;
          authUser = { email: data.user.email || trimmedEmail, role: "admin" };
        }
      } catch (err) {
        console.warn("Supabase auth attempt error:", err);
      }
    }

    // 2. Fallback to Master Admin Credentials
    if (!authenticated) {
      if (
        (trimmedEmail === FALLBACK_ADMIN_EMAIL.toLowerCase() || trimmedEmail === "admin@nationalcake.ng") &&
        password === FALLBACK_ADMIN_PASS
      ) {
        authenticated = true;
        authUser = { email: trimmedEmail, role: "superadmin" };
      }
    }

    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Invalid administrative credentials" },
        { status: 401 }
      );
    }

    // Set secure admin session cookie
    const response = NextResponse.json({
      success: true,
      user: authUser,
      message: "Authentication successful",
    });

    const sessionPayload = Buffer.from(
      JSON.stringify({
        email: authUser.email,
        role: authUser.role,
        timestamp: Date.now(),
      })
    ).toString("base64");

    response.cookies.set("nc_admin_session", sessionPayload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days session
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
