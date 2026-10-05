import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { galleryData as fallbackGallery } from "@/lib/nationalcakeData";
import { revalidatePath } from "next/cache";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      success: true,
      data: fallbackGallery.map((item, idx) => ({
        ...item,
        display_order: idx + 1,
        is_active: true,
      })),
      mode: "local_fallback",
    });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, category, tags, title, description, display_order, is_active } = body;

    if (!image) {
      return NextResponse.json({ success: false, error: "Image is required" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Item created in preview mode (Connect Supabase to persist)",
        data: {
          id: Date.now(),
          image,
          category: category || "Community",
          tags: Array.isArray(tags) ? tags : [],
          title: title || "",
          description: description || "",
          display_order: display_order || 1,
          is_active: is_active !== false,
        },
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("gallery")
      .insert([
        {
          image,
          category: category || "Community",
          tags: Array.isArray(tags) ? tags : [],
          title: title || "",
          description: description || "",
          display_order: display_order || 0,
          is_active: is_active !== false,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Revalidate public gallery page
    revalidatePath("/gallery");
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
        message: "Item updated in preview mode (Connect Supabase to persist)",
        data: body,
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("gallery")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/gallery");
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
        message: "Item deleted in preview mode",
      });
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
