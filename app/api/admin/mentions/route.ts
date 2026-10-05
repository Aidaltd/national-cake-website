import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchMentions } from "@/lib/supabase/data-service";
import { revalidatePath } from "next/cache";

export async function GET() {
  const mentions = await fetchMentions();
  return NextResponse.json({ success: true, data: mentions });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { outlet_name, article_url, logo_url, display_order } = body;

    if (!outlet_name || !article_url || !logo_url) {
      return NextResponse.json(
        { success: false, error: "Outlet name, article URL, and logo are required" },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Mention created in preview mode",
        data: {
          id: Date.now(),
          outlet_name,
          article_url,
          logo_url,
          display_order: display_order || 1,
          is_active: true,
        },
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("mentions")
      .insert([
        {
          outlet_name,
          article_url,
          logo_url,
          display_order: display_order || 0,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Mention updated in preview mode",
        data: body,
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("mentions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Mention deleted in preview mode",
      });
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("mentions").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
