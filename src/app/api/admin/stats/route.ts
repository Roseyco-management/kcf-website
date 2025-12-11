import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Map transaction status to deal status
function getStatusGroup(
  transactionStatus: string | null,
  isArchived: boolean
): string {
  if (isArchived) return "archived";
  if (!transactionStatus) return "new_lead";

  const statusMap: Record<string, string> = {
    pending_intake: "pending",
    intake_in_progress: "pending",
    intake_complete: "pending",
    pricing_in_progress: "active",
    pricing_complete: "active",
    awaiting_approval: "active",
    approved: "active",
    contract_phase: "active",
    closed: "closed",
    cancelled: "closed",
    rejected: "closed",
  };

  return statusMap[transactionStatus] || "new_lead";
}

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch all non-archived questionnaires with transactions
    const { data, error } = await supabase
      .from("questionnaire_submissions")
      .select(
        `
        id,
        form_type,
        is_archived,
        asking_price,
        created_at,
        transactions!left(status)
      `
      )
      .or("is_archived.is.null,is_archived.eq.false");

    if (error) {
      console.error("[Stats API] Error fetching stats:", error.message);
      return NextResponse.json(
        {
          total: 0,
          buyers: 0,
          sellers: 0,
          newLeads: 0,
          pending: 0,
          active: 0,
          closed: 0,
          pipelineValue: 0,
          thisWeek: 0,
          thisMonth: 0,
          error: error.message,
        },
        { status: 500 }
      );
    }

    let total = 0;
    let buyers = 0;
    let sellers = 0;
    let newLeads = 0;
    let pending = 0;
    let active = 0;
    let closed = 0;
    let pipelineValue = 0;
    let thisWeek = 0;
    let thisMonth = 0;

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    for (const row of data || []) {
      total++;

      if (row.form_type === "buyer") buyers++;
      else sellers++;

      const transaction = Array.isArray(row.transactions)
        ? row.transactions[0]
        : row.transactions;
      const statusGroup = getStatusGroup(transaction?.status || null, false);

      if (statusGroup === "new_lead") newLeads++;
      else if (statusGroup === "pending") pending++;
      else if (statusGroup === "active") active++;
      else if (statusGroup === "closed") closed++;

      // Count new leads this week/month
      const createdAt = new Date(row.created_at);
      if (createdAt > weekAgo) thisWeek++;
      if (createdAt > monthAgo) thisMonth++;

      // Pipeline value from asking price
      if (row.asking_price) {
        const priceMatch = row.asking_price.match(/[\d,]+(?:\.\d+)?/);
        if (priceMatch) {
          const price = parseFloat(priceMatch[0].replace(/,/g, "") || "0");
          if (!isNaN(price) && price < 100000000) {
            pipelineValue += price;
          }
        }
      }
    }

    return NextResponse.json({
      total,
      buyers,
      sellers,
      newLeads,
      pending,
      active,
      closed,
      pipelineValue,
      thisWeek,
      thisMonth,
    });
  } catch (error) {
    console.error("[Stats API] Unexpected error:", error);
    return NextResponse.json(
      {
        total: 0,
        buyers: 0,
        sellers: 0,
        newLeads: 0,
        pending: 0,
        active: 0,
        closed: 0,
        pipelineValue: 0,
        thisWeek: 0,
        thisMonth: 0,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
