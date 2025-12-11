// Combined event tracking utility for both Meta and Google Analytics

import { trackMetaEvent, EventUserData } from "./meta-events";
import { trackGAEvent, GAEventParams } from "./google-analytics";

export interface TrackEventOptions {
  eventName: string;
  // Meta-specific
  userData?: EventUserData;
  customData?: Record<string, unknown>;
  // Google Analytics params
  gaParams?: GAEventParams;
  // Control which platforms to send to
  platforms?: {
    meta?: boolean;
    ga?: boolean;
  };
}

/**
 * Track an event on both Meta and Google Analytics
 */
export async function trackEvent({
  eventName,
  userData,
  customData,
  gaParams,
  platforms = { meta: true, ga: true },
}: TrackEventOptions): Promise<void> {
  const promises: Promise<void>[] = [];

  // Track on Meta (Facebook)
  if (platforms.meta !== false) {
    promises.push(
      trackMetaEvent({
        eventName,
        userData,
        customData,
      })
    );
  }

  // Track on Google Analytics
  if (platforms.ga !== false) {
    trackGAEvent(eventName, gaParams);
  }

  await Promise.all(promises);
}

/**
 * Pre-configured tracking functions for common events
 */
export const Events = {
  /**
   * Track contact button clicks
   */
  contact: async (method: string = "button") => {
    await trackEvent({
      eventName: "Contact",
      gaParams: {
        event_category: "engagement",
        event_label: method,
      },
      customData: {
        contact_method: method,
      },
    });
  },

  /**
   * Track form submissions with user data
   */
  formSubmit: async (formName: string, userData?: EventUserData) => {
    await trackEvent({
      eventName: "Lead",
      userData,
      gaParams: {
        event_category: "form",
        event_label: formName,
      },
      customData: {
        form_name: formName,
      },
    });
  },

  /**
   * Track property views
   */
  viewProperty: async (propertyId: string, propertyName?: string) => {
    await trackEvent({
      eventName: "ViewContent",
      gaParams: {
        event_category: "property",
        event_label: propertyId,
      },
      customData: {
        content_type: "property",
        content_id: propertyId,
        content_name: propertyName,
      },
    });
  },

  /**
   * Track phone clicks
   */
  phoneClick: async (phoneNumber: string) => {
    await trackEvent({
      eventName: "Contact",
      gaParams: {
        event_category: "engagement",
        event_label: "phone_click",
      },
      customData: {
        contact_method: "phone",
        phone_number: phoneNumber,
      },
    });
  },

  /**
   * Track email clicks
   */
  emailClick: async (emailAddress: string) => {
    await trackEvent({
      eventName: "Contact",
      gaParams: {
        event_category: "engagement",
        event_label: "email_click",
      },
      customData: {
        contact_method: "email",
        email_address: emailAddress,
      },
    });
  },

  /**
   * Track custom events
   */
  custom: async (
    eventName: string,
    options?: Omit<TrackEventOptions, "eventName">
  ) => {
    await trackEvent({ eventName, ...options });
  },
};
