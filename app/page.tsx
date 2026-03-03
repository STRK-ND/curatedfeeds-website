'use client';

import { useEffect, useState, useRef } from 'react';
import { useAnalytics } from './hooks/useAnalytics';
import FevIcon from './components/FevIcon';

declare global {
  interface Window {
    Agentation?: any;
  }
}

export default function Home() {
  const { trackCTAClick, trackAppDownload } = useAnalytics();
  const [navBg, setNavBg] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavBg(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Hero animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroContentRef.current) {
        heroContentRef.current.style.opacity = '1';
        heroContentRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Phone parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!phoneRef.current) return;

      const hero = document.querySelector('.hero');
      if (!hero) return;

      const heroRect = hero.getBoundingClientRect();
      const heroProgress = Math.min(1, Math.max(0, -heroRect.top / heroRect.height));

      if (heroProgress > 0 && heroProgress < 1) {
        const rotateY = -8 + heroProgress * 4;
        const rotateX = 4 - heroProgress * 2;
        phoneRef.current.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Button ripple effect handler
  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
    `;

    e.currentTarget.style.position = 'relative';
    e.currentTarget.style.overflow = 'hidden';
    e.currentTarget.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  };

  // Smooth scroll handler
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="8" y="8" width="32" height="32" rx="8" />
          <path d="M20 24l6 6 10-10" />
        </svg>
      ),
      title: 'Swipe & Save',
      description: 'Swipe right to save, left to done. Intuitive gestures make managing your reading list effortless.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="6" width="36" height="36" rx="4" />
          <path d="M18 18h12M18 24h12M24 30h6" />
        </svg>
      ),
      title: 'Beautiful Cards',
      description: 'Elegant card-based interface with smooth animations and carefully crafted typography.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="24" cy="24" r="16" />
          <path d="M28 20l-6 2 6 2-2 6-2-6-6-2 6-2 2-6z" />
        </svg>
      ),
      title: 'Multiple Sources',
      description: 'Add your favorite RSS feeds from tech, design, news, and any topic you care about.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M24 6v12l-8 6" />
          <circle cx="24" cy="24" r="16" />
        </svg>
      ),
      title: 'Offline Ready',
      description: 'Your articles are cached for offline reading. Never disconnected from good content.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="24" cy="24" r="4" />
          <path d="M24 10v4M24 30v4M10 24h4M30 24h4" />
        </svg>
      ),
      title: 'Dark Theme',
      description: 'A stunning indigo-purple gradient theme that\'s easy on the eyes during night reading sessions.',
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 16l8 8 24-24" />
          <path d="M8 28l8 8 12-12" />
        </svg>
      ),
      title: 'Categories',
      description: 'Organize your feeds by categories for focused browsing when you\'re in the mood for specific content.',
    },
  ];

  return (
    <>
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className={`nav ${navBg ? 'nav-scrolled' : ''}`}>
        <div className="nav-content">
          <div className="logo">
            <FevIcon />
            <span>Curated</span>
          </div>
          <div className="nav-links">
            <a href="#features" onClick={(e) => smoothScroll(e, '#features')} className="nav-link">
              Features
            </a>
            <a href="#preview" onClick={(e) => smoothScroll(e, '#preview')} className="nav-link">
              Preview
            </a>
            <a href="#download" onClick={(e) => { smoothScroll(e, '#download'); trackCTAClick('Download', 'nav'); }} className="nav-link nav-cta">
              Download
            </a>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
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
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <a href="#features" onClick={(e) => { smoothScroll(e, '#features'); setMobileMenuOpen(false); }} className="mobile-link">
            Features
          </a>
          <a href="#preview" onClick={(e) => { smoothScroll(e, '#preview'); setMobileMenuOpen(false); }} className="mobile-link">
            Preview
          </a>
          <a href="#download" onClick={(e) => { smoothScroll(e, '#download'); setMobileMenuOpen(false); }} className="mobile-link mobile-link-cta">
            Download
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-badges">
            <span className="badge version">v1.0.0</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">Your feeds,</span>
            <span className="title-line title-gradient">curated.</span>
          </h1>
          <p className="hero-description">
            Experience RSS feeds like never before. Beautiful cards, effortless swipes, and dark-elegant design make reading
            your favorite sources a daily ritual.
          </p>
          <div className="hero-actions">
            <a href="#download" onClick={(e) => { smoothScroll(e, '#download'); trackCTAClick('Download Free', 'hero'); }} className="btn btn-primary" onMouseDown={handleRipple}>
              <span>Download Free</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v10M3 8l5 5 5-5" />
              </svg>
            </a>
            <a href="#preview" onClick={(e) => { smoothScroll(e, '#preview'); trackCTAClick('See Preview', 'hero'); }} className="btn btn-secondary" onMouseDown={handleRipple}>
              <span>See Preview</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5v6M5 8h6" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="phone-mockup" ref={phoneRef}>
            <div className="phone-screen">
              <div className="screen-header">
                <div className="screen-time">9:41</div>
                <div className="screen-icons">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 10h2v4H2v-4zm4-4h2v8H6V6zm4 2h2v6h-2V8zm4-6h2v12h-2V2z" />
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="4" cy="8" r="2" />
                    <path d="M6 6l6-4M12 2v8" />
                  </svg>
                </div>
              </div>
              <div className="screen-app">
                <div className="app-title">Curated Feeds</div>
                <div className="app-stats">
                  <span className="unread-count">24</span>
                  <span className="unread-label">unread</span>
                </div>
                <div className="app-categories">
                  <span className="category active">All</span>
                  <span className="category">Tech</span>
                  <span className="category">Design</span>
                </div>
                <div className="app-card">
                  <div className="card-source">TechCrunch</div>
                  <div className="card-title">The Future of AI Is Here</div>
                  <div className="card-meta">2h ago</div>
                </div>
                <div className="app-card app-card-secondary">
                  <div className="card-source">HackerNews</div>
                  <div className="card-title">Open Source Takes Over</div>
                  <div className="card-meta">4h ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title">Crafted for focus</h2>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className="preview">
        <div className="preview-container">
          <div className="preview-left">
            <span className="section-label">Preview</span>
            <h2 className="section-title">Elegant by design</h2>
            <p className="preview-description">
              Every interaction is crafted with intention. From the gentle card animations to the perfectly tuned
              typography, Curated Feeds turns content consumption into a delightful experience.
            </p>
            <div className="preview-stats">
              <div className="stat">
                <div className="stat-value">100%</div>
                <div className="stat-label">Free</div>
              </div>
              <div className="stat">
                <div className="stat-value">∞</div>
                <div className="stat-label">Sources</div>
              </div>
              <div className="stat">
                <div className="stat-value">0</div>
                <div className="stat-label">Ads</div>
              </div>
            </div>
          </div>
          <div className="preview-right">
            <div className="preview-cards">
              <div
                className="preview-card preview-card-1"
                onMouseEnter={() => setHoveredCard(0)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  zIndex: hoveredCard === null ? 3 : hoveredCard === 0 ? 10 : 1,
                  opacity: hoveredCard === null ? 1 : hoveredCard === 0 ? 1 : 0.3,
                  transform: hoveredCard === null
                    ? 'translateY(0)'
                    : hoveredCard === 0
                    ? 'translateX(-20px) translateY(-10px) scale(1.05)'
                    : 'scale(0.9)'
                }}
              >
                <div className="pc-source">TechCrunch</div>
                <div className="pc-title">AI Revolution Changes Everything We Know</div>
                <div className="pc-excerpt">The landscape of artificial intelligence is evolving at unprecedented speeds...</div>
                <div className="pc-meta">Today · 8 min read</div>
              </div>
              <div
                className="preview-card preview-card-2"
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  zIndex: hoveredCard === null ? 2 : hoveredCard === 1 ? 10 : 1,
                  opacity: hoveredCard === null ? 0.7 : hoveredCard === 1 ? 1 : 0.3,
                  transform: hoveredCard === null
                    ? 'translateY(60px) translateX(40px) scale(0.95)'
                    : hoveredCard === 1
                    ? 'translateX(-20px) translateY(-10px) scale(1.05)'
                    : 'scale(0.9)'
                }}
              >
                <div className="pc-source">Design Digest</div>
                <div className="pc-title">Minimalism Isn&apos;t Dead, It Just Evolved</div>
                <div className="pc-excerpt">New design trends are emerging that blend minimalism with bold expression...</div>
                <div className="pc-meta">Yesterday · 5 min read</div>
              </div>
              <div
                className="preview-card preview-card-3"
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  zIndex: hoveredCard === null ? 1 : hoveredCard === 2 ? 10 : 1,
                  opacity: hoveredCard === null ? 0.4 : hoveredCard === 2 ? 1 : 0.3,
                  transform: hoveredCard === null
                    ? 'translateY(120px) translateX(80px) scale(0.9)'
                    : hoveredCard === 2
                    ? 'translateX(-20px) translateY(-10px) scale(1.05)'
                    : 'scale(0.9)'
                }}
              >
                <div className="pc-source">HackerNews</div>
                <div className="pc-title">Open Source Software Takes Over Enterprise</div>
                <div className="pc-excerpt">Companies are increasingly turning to open source solutions for reliability...</div>
                <div className="pc-meta">2 days ago · 12 min read</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="download">
        <div className="download-content">
          <div className="download-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M24 28l8 8 8-8" />
              <path d="M32 12v24" />
              <path d="M12 36v8a8 8 0 008 8h24a8 8 0 008-8v-8" />
            </svg>
          </div>
          <h2 className="download-title">Ready to dive in?</h2>
          <p className="download-description">
            Download Curated Feeds now and transform how you consume content. Free forever, no ads, just beautiful
            reading.
          </p>
          <div className="download-actions">
            <div style={{ display: 'none' }}>
              <a href="https://play.google.com/store/apps/details?id=com.curatedfeeds.app" target="_blank" rel="noopener noreferrer" className="download-btn download-btn-android" onMouseDown={(e) => { handleRipple(e); trackAppDownload('google-play'); }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M7.5 3.7c-.5.5-.7 1.2-.7 2.1v27.4c0 .9.2 1.6.7 2.1l.1.1 15.4-15.4v-.3L7.6 3.6l-.1.1zm22.3 11.6l-5.1-2.9-.1.1 5.1 2.9.1-.1z" />
                  <path d="M32 18.8l-5.2 3 .1.1 5.1-2.9-.1-.2z" />
                </svg>
                <span>
                  Get it on<br />
                  <strong>Google Play</strong>
                </span>
              </a>
              <a href="https://www.apkmirror.com/apk/curated-feeds" target="_blank" rel="noopener noreferrer" className="download-btn download-btn-apk" onMouseDown={(e) => { handleRipple(e); trackAppDownload('apkmirror'); }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="6" y="6" width="28" height="28" rx="4" fill="currentColor" />
                  <path d="M20 12v16M12 20h16" stroke="white" strokeWidth="2" />
                </svg>
                <span>
                  Download on<br />
                  <strong>APKMirror</strong>
                </span>
              </a>
              <a href="https://apkpure.com/curated-feeds/com.curatedfeeds.app" target="_blank" rel="noopener noreferrer" className="download-btn download-btn-apkpure" onMouseDown={(e) => { handleRipple(e); trackAppDownload('apkpure'); }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" fill="currentColor" />
                  <path d="M20 12v16M12 20h16" stroke="white" strokeWidth="2" />
                </svg>
                <span>
                  Download on<br />
                  <strong>APKPure</strong>
                </span>
              </a>
            </div>
            <a href="https://devuploads.com/xpkhvldbbw84" target="_blank" rel="noopener noreferrer" className="download-btn download-btn-uptodown" onMouseDown={(e) => { handleRipple(e); trackAppDownload('direct'); }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 8v20M10 18l10 10 10-10" stroke="white" strokeWidth="2" fill="none" />
                <path d="M10 26v6h20v-6" stroke="white" strokeWidth="2" fill="none" />
              </svg>
              <span>
                Direct<br />
                <strong>Download</strong>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <FevIcon width={24} height={24} />
            Curated Feeds
          </div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div className="footer-copy">Made By Rajat Kashyap - 2026</div>
      </footer>
    </>
  );
}