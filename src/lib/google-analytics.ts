// Utility for tracking Google Analytics events

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

export interface GAEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Track a Google Analytics event
 */
export function trackGAEvent(
  eventName: string,
  params?: GAEventParams
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track a page view in Google Analytics
 */
export function trackGAPageView(url: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-RH9LPW46VV", {
      page_path: url,
    });
  }
}

/**
 * Standard Google Analytics events
 */
export const GAEvents = {
  /**
   * Track button/link clicks
   */
  click: (buttonName: string, params?: GAEventParams) =>
    trackGAEvent("click", {
      event_category: "engagement",
      event_label: buttonName,
      ...params,
    }),

  /**
   * Track form submissions
   */
  formSubmit: (formName: string, params?: GAEventParams) =>
    trackGAEvent("form_submit", {
      event_category: "form",
      event_label: formName,
      ...params,
    }),

  /**
   * Track when user initiates contact
   */
  contact: (method: string, params?: GAEventParams) =>
    trackGAEvent("contact", {
      event_category: "engagement",
      event_label: method,
      ...params,
    }),

  /**
   * Track property views
   */
  viewProperty: (propertyId: string, params?: GAEventParams) =>
    trackGAEvent("view_item", {
      event_category: "property",
      event_label: propertyId,
      ...params,
    }),

  /**
   * Track when user generates a lead
   */
  generateLead: (params?: GAEventParams) =>
    trackGAEvent("generate_lead", {
      event_category: "conversion",
      ...params,
    }),

  /**
   * Track custom events
   */
  custom: (eventName: string, params?: GAEventParams) =>
    trackGAEvent(eventName, params),
};
