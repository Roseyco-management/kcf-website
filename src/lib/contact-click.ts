// RoseyCo contact-click tracking — see marketing-ide/docs/CONTACT-CLICK-STANDARD.md.
// Fires one GA4 `contact_click` event per tap on a phone / WhatsApp / email / SMS link.
export function installContactClickTracking(): void {
  if (typeof document === "undefined" || (window as unknown as Record<string, unknown>).__rcContactClick) return;
  (window as unknown as Record<string, unknown>).__rcContactClick = true;

  function methodFor(a: Element): string | null {
    const m = a.getAttribute("data-contact");
    if (m) return m;
    const h = (a.getAttribute("href") || "").toLowerCase();
    if (h.indexOf("tel:") === 0) return "phone";
    if (h.indexOf("sms:") === 0) return "sms";
    if (h.indexOf("mailto:") === 0) return "email";
    if (h.indexOf("wa.me/") !== -1 || h.indexOf("api.whatsapp.com") !== -1 || h.indexOf("whatsapp://") === 0) return "whatsapp";
    return null;
  }

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      const a = target && target.closest ? target.closest("a[href],[data-contact]") : null;
      if (!a) return;
      const method = methodFor(a);
      if (!method) return;
      const params = {
        method,
        page_path: location.pathname,
      };
      const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
      if (typeof w.gtag === "function") {
        w.gtag("event", "contact_click", params);
      } else {
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push(Object.assign({ event: "contact_click" }, params));
      }
    },
    true
  );
}
