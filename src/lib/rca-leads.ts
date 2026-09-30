/**
 * Mirrors a lead into RoseyCo Analytics (RCA) so it shows up as cost-per-lead
 * on the client's dashboard overview.
 *
 * Contract: /Users/baileybarry/RoseyCo-Analytics-Dashboard/docs/leads-api.md
 * Client slug: kcf-homes
 *
 * Never throws — a failure here must never affect the contact form response
 * to the visitor. Never logs the API key or the lead body (PII fields, even
 * if sent, are discarded server-side per the RCA PII rule for clients who
 * haven't agreed to processor status).
 */

const RCA_ENDPOINT = "https://analytics.roseyco.com/api/clients/kcf-homes/leads";

export interface RcaAttribution {
  page_url?: string;
  form?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  budget?: string;
}

export interface RcaLead {
  external_id: string;
  source: string;
  service?: string;
  first_name?: string;
  attribution?: RcaAttribution;
}

let warnedNoKey = false;

export async function postLeadToRca(
  lead: RcaLead
): Promise<{ ok: true } | { ok: false; error: string } | { skipped: string }> {
  const key = process.env.RCA_LEADS_API_KEY;

  if (!key) {
    if (!warnedNoKey) {
      console.warn("RCA_LEADS_API_KEY not set — skipping RCA lead mirror");
      warnedNoKey = true;
    }
    return { skipped: "no key" };
  }

  try {
    const response = await fetch(RCA_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return { ok: false, error: `RCA lead post failed: ${response.status}` };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown error",
    };
  }
}
