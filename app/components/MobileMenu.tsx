'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Mobile menu — night ground, cream links, one gold action.
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
    [open, closeMenu]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        const links = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a.mobile-link');
        const linkArray = Array.from(links ?? []);
        const currentIndex = linkArray.indexOf(document.activeElement as HTMLAnchorElement);
        const nextIndex = (currentIndex + 1) % linkArray.length;
        linkArray[nextIndex]?.focus();
      }
    },
    [open, closeMenu]
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
        className={`mobile-menu ${open ? "mobile-menu-open" : ""}`}
        role="dialog"
        aria-label="Navigation menu"
      >
        <a href="/#preview" onClick={closeMenu} className="mobile-link">Screens</a>
        <a href="/#features" onClick={closeMenu} className="mobile-link">Features</a>
        <a href="/sources/" onClick={closeMenu} className="mobile-link">Sources</a>
        <a href="/#faq" onClick={closeMenu} className="mobile-link">FAQ</a>
        <a href="/#download" onClick={closeMenu} className="mobile-link mobile-link-cta">Download</a>
      </div>
    </>
  );
}
