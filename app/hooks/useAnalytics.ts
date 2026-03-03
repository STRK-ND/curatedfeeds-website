'use client';

import {
  logCTAClick,
  logAppDownload,
  logFeatureUsage,
  logExternalLink,
  logConversion,
  logSignUp,
  logShare,
  logAppInstallStarted
} from '../firebase';

export const useAnalytics = () => ({
  // CTA Tracking
  trackCTAClick: (buttonName: string, location: string) =>
    logCTAClick(buttonName, location),

  // App Downloads
  trackAppDownload: (platform: string) =>
    logAppDownload(platform),

  trackAppInstallStarted: (platform: string) =>
    logAppInstallStarted(platform),

  // Feature Usage
  trackFeatureUsage: (featureName: string) =>
    logFeatureUsage(featureName),

  // External Links
  trackExternalLink: (url: string, source: string) =>
    logExternalLink(url, source),

  // Conversions
  trackConversion: (conversionType: string, value?: number) =>
    logConversion(conversionType, value),

  // Sign Ups
  trackSignUp: (method: string) =>
    logSignUp(method),

  // Share
  trackShare: (contentType: string, method: string) =>
    logShare(contentType, method),
});