// Utility for tracking Meta Pixel and Conversions API events

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export interface EventUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  fbc?: string; // Facebook click ID from URL
  fbp?: string; // Facebook browser ID from cookie
}

export interface TrackEventOptions {
  eventName: string;
  userData?: EventUserData;
  customData?: Record<string, unknown>;
  sendToPixel?: boolean; // Default: true
  sendToServer?: boolean; // Default: true
}

/**
 * Get Facebook click ID from URL parameters
 */
function getFbc(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

/**
 * Get Facebook browser ID from cookie
 */
function getFbp(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
}

/**
 * Track an event via both Meta Pixel (client-side) and Conversions API (server-side)
 */
export async function trackMetaEvent({
  eventName,
  userData = {},
  customData = {},
  sendToPixel = true,
  sendToServer = true,
}: TrackEventOptions): Promise<void> {
  // Track via pixel (client-side)
  if (sendToPixel && typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, customData);
  }

  // Track via Conversions API (server-side)
  if (sendToServer) {
    try {
      // Add Facebook IDs to user data
      const enhancedUserData = {
        ...userData,
        fbc: userData.fbc || getFbc(),
        fbp: userData.fbp || getFbp(),
      };

      await fetch("/api/meta-capi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName,
          eventSourceUrl: window.location.href,
          userData: enhancedUserData,
          customData,
        }),
      });
    } catch (error) {
      console.error("Failed to send event to Meta CAPI:", error);
    }
  }
}

/**
 * Track standard Meta events
 */
export const MetaEvents = {
  /**
   * Track a page view
   */
  pageView: () => trackMetaEvent({ eventName: "PageView" }),

  /**
   * Track when a user views content
   */
  viewContent: (customData?: Record<string, unknown>) =>
    trackMetaEvent({ eventName: "ViewContent", customData }),

  /**
   * Track when a user initiates contact (e.g., clicks contact button)
   */
  contact: (customData?: Record<string, unknown>) =>
    trackMetaEvent({ eventName: "Contact", customData }),

  /**
   * Track when a user submits a form
   */
  lead: (userData?: EventUserData, customData?: Record<string, unknown>) =>
    trackMetaEvent({ eventName: "Lead", userData, customData }),

  /**
   * Track when a user completes registration
   */
  completeRegistration: (
    userData?: EventUserData,
    customData?: Record<string, unknown>
  ) => trackMetaEvent({ eventName: "CompleteRegistration", userData, customData }),

  /**
   * Track when a user submits an application
   */
  submitApplication: (
    userData?: EventUserData,
    customData?: Record<string, unknown>
  ) => trackMetaEvent({ eventName: "SubmitApplication", userData, customData }),

  /**
   * Track a custom event
   */
  custom: (eventName: string, options?: Omit<TrackEventOptions, "eventName">) =>
    trackMetaEvent({ eventName, ...options }),
};
