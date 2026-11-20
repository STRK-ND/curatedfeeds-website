'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MOBILE_NAV } from '../lib/nav';

/**
 * Mobile menu, night ground, cream links, one gold action.
 * The only client island in the nav; the rest stays server-rendered.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  const handleOutsideClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!open) return;
      const target = event.target as Node | null;
      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMenu();
      }
    },
    [open, closeMenu],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;

      const links = Array.from(
        menuRef.current?.querySelectorAll<HTMLAnchorElement>('a.mobile-link') ?? [],
      );
      if (!links.length) return;

      event.preventDefault();
      const current = links.indexOf(document.activeElement as HTMLAnchorElement);
      const step = event.shiftKey ? -1 : 1;
      const next = (current + step + links.length) % links.length;
      links[next].focus();
    },
    [open, closeMenu],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleOutsideClick, handleKeyDown]);

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector<HTMLAnchorElement>('a.mobile-link')?.focus();
    }
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        className="nav__burger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <>
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </>
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`}
        role="dialog"
        aria-label="Navigation menu"
      >
        {MOBILE_NAV.map((link) => (
          <a
            key={link.url}
            href={link.url}
            onClick={closeMenu}
            className={link.cta ? 'mobile-link mobile-link-cta' : 'mobile-link'}
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}
