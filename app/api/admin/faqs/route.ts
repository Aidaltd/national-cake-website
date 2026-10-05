import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  faqdata as fallbackGeneral,
  agentFaqData as fallbackAgent,
  preorderfaqdata as fallbackOrder,
} from "@/lib/nationalcakeData";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "general";

  if (!isSupabaseConfigured()) {
    const map = {
      general: fallbackGeneral,
      agent: fallbackAgent,
      order: fallbackOrder,
    };
    const list = map[category as keyof typeof map] || fallbackGeneral;
    return NextResponse.json({
      success: true,
      data: [...list].reverse().map((item, idx) => ({
        id: item.id,
        category,
        question: item.question,
        answer: item.answer,
        list_items: "list" in item ? (item.list as string[]) : [],
        display_order: idx + 1,
        is_active: true,
      })),
      mode: "local_fallback",
    });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

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
    const { category, question, answer, list_items, display_order, is_active } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: "Question and Answer are required" },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "FAQ saved in preview mode",
        data: {
          id: Date.now(),
          category: category || "general",
          question,
          answer,
          list_items: Array.isArray(list_items) ? list_items : [],
          display_order: display_order || 1,
          is_active: is_active !== false,
        },
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("faqs")
      .insert([
        {
          category: category || "general",
          question,
          answer,
          list_items: Array.isArray(list_items) ? list_items : [],
          display_order: display_order || 0,
          is_active: is_active !== false,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/become-an-agent");
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
        message: "FAQ updated in preview mode",
        data: body,
      });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("faqs")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/become-an-agent");
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
        message: "FAQ deleted in preview mode",
      });
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from("faqs").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/become-an-agent");
    revalidatePath("/order");

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
