'use client';

import { useEffect, useRef } from 'react';
import {
  logAnalyticsEvent,
  setUserType,
  setPlatform,
  logScrollDepth,
  logTimeOnPage
} from '../firebase';

export default function FirebaseAnalytics() {
  const maxScrollRef = useRef(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Log page view on initial load
    logAnalyticsEvent('page_view', {
      page_path: window.location.pathname,
      page_title: document.title
    });

    // Set user properties
    setPlatform();

    // Check if returning user
    const visitCount = parseInt(sessionStorage.getItem('visitCount') || '0') + 1;
    sessionStorage.setItem('visitCount', visitCount.toString());
    setUserType(visitCount > 1);

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, 100%
      if (scrollPercent >= 25 && maxScrollRef.current < 25) {
        maxScrollRef.current = 25;
        logScrollDepth(25);
      } else if (scrollPercent >= 50 && maxScrollRef.current < 50) {
        maxScrollRef.current = 50;
        logScrollDepth(50);
      } else if (scrollPercent >= 75 && maxScrollRef.current < 75) {
        maxScrollRef.current = 75;
        logScrollDepth(75);
      } else if (scrollPercent >= 100 && maxScrollRef.current < 100) {
        maxScrollRef.current = 100;
        logScrollDepth(100);
      }
    };

    // Track time on page (when leaving)
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeOnPage > 5) {
        logTimeOnPage(timeOnPage);
      }
    };

    // Listen for popstate events (browser back/forward)
    const handleNavigation = () => {
      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeOnPage > 5) {
        logTimeOnPage(timeOnPage);
      }
      startTimeRef.current = Date.now();
      maxScrollRef.current = 0;

      logAnalyticsEvent('page_view', {
        page_path: window.location.pathname,
        page_title: document.title
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Monitor URL changes (for Next.js navigation)
    let lastUrl = window.location.href;
    const observer = new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        handleNavigation();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      observer.disconnect();

      // Final time log on unmount
      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeOnPage > 5) {
        logTimeOnPage(timeOnPage);
      }
    };
  }, []);

  return null;
}