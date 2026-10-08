import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchAuthorityPresentations } from "@/lib/supabase/data-service";
import { revalidatePath } from "next/cache";

export async function GET() {
  if (!isSupabaseConfigured()) {
    const items = await fetchAuthorityPresentations();
    return NextResponse.json({ success: true, data: items });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("authority_presentations")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      const items = await fetchAuthorityPresentations();
      return NextResponse.json({ success: true, data: items });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch {
    const items = await fetchAuthorityPresentations();
    return NextResponse.json({ success: true, data: items });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, dignitary_name, image, display_order, is_active } = body;

    if (!title || !image) {
      return NextResponse.json({ success: false, error: "Title and image are required" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Authority slide created in preview mode",
        data: {
          id: Date.now(),
          title,
          dignitary_name: dignitary_name || title,
          image,
          display_order: display_order !== undefined ? Number(display_order) : 1,
          is_active: is_active !== undefined ? Boolean(is_active) : true,
        },
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("authority_presentations")
      .insert([
        {
          title,
          dignitary_name: dignitary_name || title,
          image,
          display_order: display_order !== undefined ? Number(display_order) : 0,
          is_active: is_active !== undefined ? Boolean(is_active) : true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/admin/authority");
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
        message: "Authority slide updated in preview mode",
        data: body,
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("authority_presentations")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/admin/authority");
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
        message: "Authority slide deleted in preview mode",
      });
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("authority_presentations").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/admin/authority");
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
