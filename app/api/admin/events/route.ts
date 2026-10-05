import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchEvents } from "@/lib/supabase/data-service";
import { revalidatePath } from "next/cache";

export async function GET() {
  const events = await fetchEvents();
  return NextResponse.json({ success: true, data: events });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, tag, icon, registration_link, button_text, status, display_order } = body;

    if (!title || !description) {
      return NextResponse.json({ success: false, error: "Title and description required" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Event created in preview mode",
        data: {
          id: Date.now(),
          title,
          description,
          tag: tag || "Competition",
          icon: icon || "GraduationCap",
          registration_link: registration_link || "",
          button_text: button_text || "Join Wait List",
          status: status || "upcoming",
          display_order: display_order || 1,
          is_active: true,
        },
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          tag: tag || "Competition",
          icon: icon || "GraduationCap",
          registration_link: registration_link || "",
          button_text: button_text || "Join Wait List",
          status: status || "upcoming",
          display_order: display_order || 0,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/championship");
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
        message: "Event updated in preview mode",
        data: body,
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/championship");
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
        message: "Event deleted in preview mode",
      });
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/championship");
    revalidatePath("/");

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
