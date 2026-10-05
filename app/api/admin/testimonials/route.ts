import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchTestimonials } from "@/lib/supabase/data-service";
import { revalidatePath } from "next/cache";

export async function GET() {
  const testimonials = await fetchTestimonials();
  return NextResponse.json({ success: true, data: testimonials });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, quote, image, rating, featured, display_order } = body;

    if (!name || !role || !quote) {
      return NextResponse.json({ success: false, error: "Name, role, and quote required" }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Testimonial created in preview mode",
        data: {
          id: Date.now(),
          name,
          role,
          quote,
          image: image || "",
          rating: rating || 5,
          featured: featured !== false,
          display_order: display_order || 1,
          is_active: true,
        },
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .insert([
        {
          name,
          role,
          quote,
          image: image || "",
          rating: rating || 5,
          featured: featured !== false,
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
    revalidatePath("/order");

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
        message: "Testimonial updated in preview mode",
        data: body,
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/order");

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
        message: "Testimonial deleted in preview mode",
      });
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/order");

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
