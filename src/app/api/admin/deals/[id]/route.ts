import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("questionnaire_submissions")
      .select(
        `
        *,
        transactions!left(*),
        deal_agents!left(
          is_primary,
          agent_id,
          agents(id, full_name, avatar_url, email, phone)
        ),
        deal_notes!left(
          id,
          note,
          created_at,
          created_by,
          agents(full_name)
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("[Deal Detail API] Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    }

    // Transform the data
    const transaction = Array.isArray(data.transactions)
      ? data.transactions[0]
      : data.transactions;

    const dealAgents = Array.isArray(data.deal_agents) ? data.deal_agents : [];
    const notes = Array.isArray(data.deal_notes)
      ? data.deal_notes.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      : [];

    const deal = {
      ...data,
      transaction,
      agents: dealAgents.map((da: any) => ({
        ...da.agents,
        isPrimary: da.is_primary,
      })),
      notes,
    };

    return NextResponse.json({ deal });
  } catch (error) {
    console.error("[Deal Detail API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
