/**
 * Lightweight lead attribution capture.
 *
 * Captures UTM params / click ids from the URL on first visit this session,
 * falls back to inferring source from document.referrer when there are none,
 * and persists to sessionStorage so a visitor who lands on any page and
 * later submits the contact form still carries their attribution.
 *
 * Feeds the `attribution` field on the /api/contact payload, which the
 * server route forwards to RoseyCo Analytics via postLeadToRca. Never holds
 * name/email/phone/message — this is URL and referrer data only.
 */

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  referrer?: string;
  landing_page?: string;
}

const STORAGE_KEY = "kcf_attribution";

const REFERRER_MAP: Array<[RegExp, string, string]> = [
  [/google\./i, "google", "organic"],
  [/bing\.com/i, "bing", "organic"],
  [/duckduckgo\.com/i, "duckduckgo", "organic"],
  [/facebook\.com|fb\.com/i, "facebook", "social"],
  [/instagram\.com/i, "instagram", "social"],
  [/tiktok\.com/i, "tiktok", "social"],
];

function extractFromUrl(url: string): Attribution | null {
  try {
    const u = new URL(url);
    const params = u.searchParams;
    const out: Attribution = {};
    let found = false;
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const) {
      const v = params.get(key);
      if (v) { out[key] = v; found = true; }
    }
    for (const key of ["gclid", "fbclid", "msclkid"] as const) {
      const v = params.get(key);
      if (v) { out[key] = v; found = true; }
    }
    if (!found) return null;
    out.landing_page = u.pathname;
    return out;
  } catch {
    return null;
  }
}

function inferFromReferrer(referrer: string): Attribution | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    const ownHost = window.location.hostname.replace(/^www\./, "");
    if (host === ownHost) return null;
    for (const [pattern, source, medium] of REFERRER_MAP) {
      if (pattern.test(host)) return { utm_source: source, utm_medium: medium, referrer };
    }
    return { utm_source: host, utm_medium: "referral", referrer };
  } catch {
    return null;
  }
}

/** Call once on app/page load to capture and persist this session's attribution. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return; // already captured this session
    const fromUrl = extractFromUrl(window.location.href);
    const attribution = fromUrl ?? inferFromReferrer(document.referrer) ?? {
      landing_page: window.location.pathname,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage unavailable (private mode etc.) — fine, just no attribution
  }
}

/** Read this session's captured attribution, if any. */
export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
