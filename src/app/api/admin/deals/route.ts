import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Deal status - derived from transaction status or lead-only state
export type DealStatus =
  | "new_lead" // Lead without transaction
  | "pending_intake" // Transaction created, awaiting photos
  | "intake_in_progress" // Photos being uploaded
  | "intake_complete" // Photos done
  | "pricing_in_progress"
  | "pricing_complete"
  | "awaiting_approval"
  | "approved"
  | "contract_phase" // Under contract
  | "closed"
  | "cancelled"
  | "archived"; // Lead archived

export interface Deal {
  id: string; // questionnaire_id (primary identifier)
  transactionId: string | null; // transaction_id if exists
  dealType: "buyer" | "seller";
  status: DealStatus;
  fullName: string;
  email: string;
  phone: string | null;
  propertyAddress: string | null;
  askingPrice: string | null;
  priceRangeMin: string | null;
  priceRangeMax: string | null;
  moveTimeline: string | null;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  // Agent assignment
  primaryAgentId: string | null;
  primaryAgentName: string | null;
  primaryAgentAvatar: string | null;
  agentCount: number;
  // Integration status
  hasDotloop: boolean;
  dotloopUrl: string | null;
  hasIntakeComplete: boolean;
  hasResearchComplete: boolean;
}

// Map transaction status to our deal status groups
function getStatusGroup(
  transactionStatus: string | null,
  isArchived: boolean
): DealStatus {
  if (isArchived) return "archived";
  if (!transactionStatus) return "new_lead";

  // Map transaction statuses
  const statusMap: Record<string, DealStatus> = {
    pending_intake: "pending_intake",
    intake_in_progress: "intake_in_progress",
    intake_complete: "intake_complete",
    pricing_in_progress: "pricing_in_progress",
    pricing_complete: "pricing_complete",
    awaiting_approval: "awaiting_approval",
    approved: "approved",
    contract_phase: "contract_phase",
    closed: "closed",
    cancelled: "cancelled",
    rejected: "cancelled",
  };

  return statusMap[transactionStatus] || "new_lead";
}

// Check if status matches filter group
function matchesStatusFilter(dealStatus: DealStatus, filterStatus: string): boolean {
  if (filterStatus === "all") return dealStatus !== "archived";
  if (filterStatus === "archived") return dealStatus === "archived";
  if (filterStatus === "new_lead") return dealStatus === "new_lead";

  // "pending" = new_lead + pending_intake + intake_in_progress
  if (filterStatus === "pending") {
    return ["new_lead", "pending_intake", "intake_in_progress", "intake_complete"].includes(
      dealStatus
    );
  }

  // "active" = pricing through approved
  if (filterStatus === "active") {
    return [
      "pricing_in_progress",
      "pricing_complete",
      "awaiting_approval",
      "approved",
      "contract_phase",
    ].includes(dealStatus);
  }

  // "closed" = closed or cancelled
  if (filterStatus === "closed") {
    return ["closed", "cancelled"].includes(dealStatus);
  }

  return true;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const dealType = searchParams.get("dealType") || "all";
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";

    const supabase = await createClient();

    // Query questionnaires with left join to transactions and deal_agents
    let query = supabase
      .from("questionnaire_submissions")
      .select(
        `
      id,
      form_type,
      full_name,
      first_name,
      last_name,
      email,
      phone,
      property_address,
      asking_price,
      price_range_min,
      price_range_max,
      move_timeline,
      is_archived,
      created_at,
      updated_at,
      dotloop_loop_id,
      dotloop_loop_url,
      research_completed_at,
      transactions!left(id, status, transaction_type, intake_completed_at),
      deal_agents!left(
        is_primary,
        agent_id,
        agents(id, full_name, avatar_url)
      )
    `,
        { count: "exact" }
      );

    // Apply type filter
    if (dealType !== "all") {
      query = query.eq("form_type", dealType);
    }

    // Apply search
    if (search) {
      const searchTerm = `%${search}%`;
      query = query.or(
        `full_name.ilike.${searchTerm},email.ilike.${searchTerm},phone.ilike.${searchTerm},property_address.ilike.${searchTerm}`
      );
    }

    // Order by created_at desc
    query = query.order("created_at", { ascending: false });

    const { data, count, error } = await query;

    if (error) {
      console.error("[Deals API] Error fetching deals:", error.message);
      return NextResponse.json(
        {
          deals: [],
          total: 0,
          page,
          pageSize,
          totalPages: 0,
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Transform and filter by status (must be done in JS since status is derived)
    const allDeals: Deal[] = (data || []).map((row) => {
      const transaction = Array.isArray(row.transactions)
        ? row.transactions[0]
        : row.transactions;
      const isArchived = row.is_archived === true;
      const transactionStatus = transaction?.status || null;

      // Process deal_agents to get primary agent
      type DealAgentRow = {
        is_primary: boolean;
        agent_id: string;
        agents:
          | { id: string; full_name: string; avatar_url?: string }
          | { id: string; full_name: string; avatar_url?: string }[]
          | null;
      };
      const dealAgents = Array.isArray(row.deal_agents)
        ? row.deal_agents
        : row.deal_agents
          ? [row.deal_agents]
          : [];
      const primaryAgent = dealAgents.find(
        (da: DealAgentRow) => da.is_primary
      ) as DealAgentRow | undefined;
      const agentsData = primaryAgent?.agents;
      const agentRecord = Array.isArray(agentsData) ? agentsData[0] : agentsData;
      const primaryAgentId = primaryAgent?.agent_id || agentRecord?.id || null;
      const primaryAgentName = agentRecord?.full_name || null;
      const primaryAgentAvatar = agentRecord?.avatar_url || null;
      const agentCount = dealAgents.length;

      return {
        id: row.id,
        transactionId: transaction?.id || null,
        dealType: row.form_type as "buyer" | "seller",
        status: getStatusGroup(transactionStatus, isArchived),
        fullName:
          row.full_name ||
          `${row.first_name || ""} ${row.last_name || ""}`.trim() ||
          "Unknown",
        email: row.email,
        phone: row.phone,
        propertyAddress: row.property_address,
        askingPrice: row.asking_price,
        priceRangeMin: row.price_range_min,
        priceRangeMax: row.price_range_max,
        moveTimeline: row.move_timeline,
        isArchived,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        primaryAgentId,
        primaryAgentName,
        primaryAgentAvatar,
        agentCount,
        hasDotloop: !!row.dotloop_loop_id,
        dotloopUrl: row.dotloop_loop_url || null,
        hasIntakeComplete: !!transaction?.intake_completed_at,
        hasResearchComplete: !!row.research_completed_at,
      };
    });

    // Filter by status (done in JS because status is derived)
    let filteredDeals = allDeals.filter((deal) =>
      matchesStatusFilter(deal.status, status)
    );

    // Apply pagination to filtered results
    const total = filteredDeals.length;
    const totalPages = Math.ceil(total / pageSize);
    const offset = (page - 1) * pageSize;
    const paginatedDeals = filteredDeals.slice(offset, offset + pageSize);

    return NextResponse.json({
      deals: paginatedDeals,
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    console.error("[Deals API] Unexpected error:", error);
    return NextResponse.json(
      {
        deals: [],
        total: 0,
        page: 1,
        pageSize: 20,
        totalPages: 0,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
