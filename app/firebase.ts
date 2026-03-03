import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserId, setUserProperties as setUserPropertiesFirebase } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: 'AIzaSyAkR-_lsfVzHNaZyJWBxNOgaCk85PNXh_8',
  authDomain: 'curatedfeeds.firebaseapp.com',
  projectId: 'curatedfeeds',
  storageBucket: 'curatedfeeds.firebasestorage.app',
  messagingSenderId: '482183083527',
  appId: '1:482183083527:web:1e449fc3be4b043d22dca2',
  measurementId: 'G-31JZFV2ND0'
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Performance Monitoring
const performance = typeof window !== 'undefined' ? getPerformance(app) : null;

// =====================
// ANALYTICS FUNCTIONS
// =====================

// Basic event tracking
export const logAnalyticsEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

// Set user ID for tracking
export const setUserAnalyticsId = (userId: string) => {
  if (analytics) {
    setUserId(analytics, userId);
  }
};

// Set user properties for segmentation
export const setUserProperties = (properties: Record<string, string | number | boolean>) => {
  if (analytics) {
    setUserPropertiesFirebase(analytics, properties);
  }
};

// =====================
// CUSTOM EVENTS
// =====================

// CTA Button Clicks
export const logCTAClick = (buttonName: string, location: string) => {
  logAnalyticsEvent('cta_click', {
    button_name: buttonName,
    location: location
  });
};

// App Download/Install
export const logAppDownload = (platform: string) => {
  logAnalyticsEvent('app_download', {
    platform: platform
  });
};

// Feature Usage
export const logFeatureUsage = (featureName: string) => {
  logAnalyticsEvent('feature_used', {
    feature_name: featureName
  });
};

// Scroll Depth
export const logScrollDepth = (depth: number) => {
  logAnalyticsEvent('scroll_depth', {
    depth_percentage: depth
  });
};

// Time on Page
export const logTimeOnPage = (seconds: number) => {
  logAnalyticsEvent('time_on_page', {
    duration_seconds: seconds
  });
};

// External Link Clicks
export const logExternalLink = (url: string, source: string) => {
  logAnalyticsEvent('external_link_click', {
    url: url,
    source: source
  });
};

// Form Interactions
export const logFormInteraction = (action: string, formName: string) => {
  logAnalyticsEvent('form_interaction', {
    action: action,
    form_name: formName
  });
};

// Search Usage
export const logSearch = (query: string, resultsCount: number) => {
  logAnalyticsEvent('search', {
    search_query: query,
    results_count: resultsCount
  });
};

// =====================
// CONVERSION EVENTS
// =====================

// Primary Conversions
export const logConversion = (conversionType: string, value?: number) => {
  logAnalyticsEvent('conversion', {
    conversion_type: conversionType,
    value: value
  });
};

// Sign Up / Newsletter
export const logSignUp = (method: string) => {
  logAnalyticsEvent('sign_up', {
    method: method
  });
};

// App Install Started
export const logAppInstallStarted = (platform: string) => {
  logAnalyticsEvent('begin_checkout', {
    items: [{ item_id: `app_${platform}`, item_name: 'Curated Feeds App', item_category: 'Mobile App' }],
    value: 0
  });
};

// Share Event
export const logShare = (contentType: string, method: string) => {
  logAnalyticsEvent('share', {
    content_type: contentType,
    method: method
  });
};

// =====================
// USER PROPERTIES
// =====================

export const setUserType = (isReturning: boolean) => {
  setUserProperties({
    user_type: isReturning ? 'returning' : 'new'
  });
};

export const setVisitCount = (count: number) => {
  setUserProperties({
    visit_count: count
  });
};

export const setPlatform = () => {
  const platform = typeof window !== 'undefined' ? navigator.platform : 'unknown';
  setUserProperties({
    platform: platform
  });
};

export { analytics, app, performance };