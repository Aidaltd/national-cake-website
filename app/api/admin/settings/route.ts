import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchSiteSettings } from "@/lib/supabase/data-service";
import { revalidatePath } from "next/cache";

export async function GET() {
  const settings = await fetchSiteSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Settings updated in preview mode (Connect Supabase to persist)",
        data: body,
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .upsert({
        id: "general",
        ...body,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/order");
    revalidatePath("/donate-to-schools");
    revalidatePath("/");

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
