'use client';

import { useState } from 'react';

/**
 * The only client island on the homepage, keeps the rest of the page
 * fully server-rendered. Rendered inside the nav on small screens.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
          ) : (
            <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>
          )}
        </svg>
      </button>
      <div className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`}>
        <a href="#features" onClick={() => setOpen(false)} className="mobile-link">Features</a>
        <a href="#preview" onClick={() => setOpen(false)} className="mobile-link">Preview</a>
        <a href="#faq" onClick={() => setOpen(false)} className="mobile-link">FAQ</a>
        <a href="#download" onClick={() => setOpen(false)} className="mobile-link mobile-link-cta">Download</a>
      </div>
    </>
  );
}
