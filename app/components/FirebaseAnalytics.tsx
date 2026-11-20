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
  // Set in the effect, not during render: Date.now() in useRef() init runs
  // on every render pass and fails React's purity checks.
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    logAnalyticsEvent('page_view', {
      page_path: window.location.pathname,
      page_title: document.title
    });

    setPlatform();

    const visitCount = parseInt(sessionStorage.getItem('visitCount') || '0') + 1;
    sessionStorage.setItem('visitCount', visitCount.toString());
    setUserType(visitCount > 1);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

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

    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeOnPage > 5) {
        logTimeOnPage(timeOnPage);
      }
    };

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

      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeOnPage > 5) {
        logTimeOnPage(timeOnPage);
      }
    };
  }, []);

  return null;
}