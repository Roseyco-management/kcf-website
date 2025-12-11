import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export interface Lead {
  id: string;
  formType: "buyer" | "seller";
  fullName: string;
  email: string;
  phone: string;
  propertyAddress?: string;
  askingPrice?: string;
  priceRangeMin?: string;
  priceRangeMax?: string;
  status: "new" | "contacted" | "qualified" | "converted" | "archived";
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  // Additional display fields
  moveTimeline?: string;
  howHeard?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const formType = searchParams.get("formType") || "all";
    const search = searchParams.get("search") || "";
    const includeArchived = searchParams.get("includeArchived") === "true";

    const supabase = await createClient();
    const offset = (page - 1) * pageSize;

    // Build base query
    let query = supabase
      .from("questionnaire_submissions")
      .select("*", { count: "exact" });

    // Apply filters
    if (formType !== "all") {
      query = query.eq("form_type", formType);
    }

    if (!includeArchived) {
      query = query.or("is_archived.is.null,is_archived.eq.false");
    }

    if (search) {
      const searchTerm = `%${search}%`;
      query = query.or(
        `full_name.ilike.${searchTerm},email.ilike.${searchTerm},phone.ilike.${searchTerm},property_address.ilike.${searchTerm}`
      );
    }

    // Apply pagination and ordering
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + pageSize - 1);

    const { data, count, error } = await query;

    if (error) {
      console.error("[Leads API] Error fetching leads:", error.message);
      return NextResponse.json(
        {
          leads: [],
          total: 0,
          page,
          pageSize,
          totalPages: 0,
          error: error.message,
        },
        { status: 500 }
      );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    const leads: Lead[] = (data || []).map((row) => ({
      id: row.id,
      formType: row.form_type as "buyer" | "seller",
      fullName:
        row.full_name ||
        `${row.first_name || ""} ${row.last_name || ""}`.trim() ||
        "Unknown",
      email: row.email || "",
      phone: row.phone || "",
      propertyAddress: row.property_address || row.full_address || undefined,
      askingPrice: row.asking_price || undefined,
      priceRangeMin: row.price_range_min || undefined,
      priceRangeMax: row.price_range_max || undefined,
      status: row.is_archived ? "archived" : "new", // Basic status for now
      isArchived: row.is_archived || false,
      createdAt: row.created_at,
      updatedAt: row.updated_at || row.created_at,
      moveTimeline: row.move_timeline || undefined,
      howHeard: row.how_heard || undefined,
    }));

    return NextResponse.json({
      leads,
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    console.error("[Leads API] Unexpected error:", error);
    return NextResponse.json(
      {
        leads: [],
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
