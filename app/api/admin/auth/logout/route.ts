import { NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST() {
  try {
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createServerSupabaseClient();
        await supabase.auth.signOut();
      } catch (err) {
        console.warn("Supabase signout notice:", err);
      }
    }

    const response = NextResponse.json({
      success: true,
      message: "Signed out successfully",
    });

    response.cookies.delete("nc_admin_session");

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Logout error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
