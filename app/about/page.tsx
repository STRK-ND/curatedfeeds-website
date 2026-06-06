import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'About | Curated Feeds - Our Story & Mission',
  description: 'Learn about Rajat Kashyap, the founder of Curated Feeds, and our mission to restore intentional content consumption through beautiful RSS technology.',
  authors: [{ name: 'Rajat Kashyap', url: 'https://rajatkashyap.com' }],
  openGraph: {
    title: 'About | Curated Feeds',
    description: 'Learn about the founder, mission, and values behind Curated Feeds RSS reader app.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="about-page">
        <section className="about-hero">
          <h1>About Curated Feeds</h1>
          <p className="hero-subtitle">
            Building tools for intentional content consumption in an age of algorithmic distraction.
          </p>
        </section>

        <section className="about-section">
          <h2>The Founder</h2>
          <div className="founder-card">
            <div className="founder-info">
              <h3>Rajat Kashyap</h3>
              <p className="founder-title">Founder & Lead Developer</p>
              <p className="founder-location">Building from India for the world</p>
            </div>
            <div className="founder-bio">
              <p>
                I am Rajat Kashyap, a mobile developer and RSS enthusiast who built Curated Feeds to solve a problem I personally experienced. Before creating this app, I was spending over three hours daily on social media feeds designed to capture my attention rather than serve my interests.
              </p>
              <p>
                In 2022, I conducted a personal experiment: replacing social media with RSS for content consumption. The results were dramatic — I read more, remembered more, and felt significantly less anxious about missing out. But existing RSS apps felt clunky and dated. So I built Curated Feeds to make intentional reading genuinely enjoyable.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Privacy is Non-Negotiable</h3>
              <p>
                Curated Feeds operates without servers storing your reading data. Your feeds, saved articles, and reading patterns remain on your device. We literally cannot access your information because we designed the architecture to make it impossible.
              </p>
            </div>
            <div className="value-card">
              <h3>Focus is a Feature</h3>
              <p>
                Every design decision prioritizes sustained attention. No infinite scroll. No notification badges. No algorithmic recommendations. Just your chosen sources, presented beautifully for focused reading.
              </p>
            </div>
            <div className="value-card">
              <h3>Intentional Over Infinite</h3>
              <p>
                We reject the attention economy model. Our business does not depend on keeping you in the app longer. Use Curated Feeds, read what matters, then close it and live your life. That is the point.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Development Timeline</h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-date">2022</span>
              <div className="timeline-content">
                <h3>Personal Experiment</h3>
                <p>Transitioned to RSS-first content consumption. Documented productivity gains and frustration with existing tools.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">2023</span>
              <div className="timeline-content">
                <h3>Prototype Development</h3>
                <p>Built initial Flutter prototype for personal use. Refined swipe gestures and card-based interface through daily usage.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">2024</span>
              <div className="timeline-content">
                <h3>Public Beta Launch</h3>
                <p>Released Curated Feeds to beta testers. Incorporated feedback on categories, search, and offline functionality.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">2025</span>
              <div className="timeline-content">
                <h3>Version 1.0 Release</h3>
                <p>Launched stable release with full feature set. Began building community around intentional content consumption.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Technical Stack</h2>
          <p>We believe in transparency about our technology. Curated Feeds is built with:</p>
          <ul className="tech-list">
            <li><strong>Flutter</strong> — for cross-platform mobile development, ensuring consistent experience across Android devices.</li>
            <li><strong>Cloudflare Workers</strong> — for edge computing, providing fast, distributed RSS feed fetching with minimal latency worldwide.</li>
            <li><strong>Firebase</strong> — for backend services including analytics, distribution, and hosting.</li>
            <li><strong>Next.js</strong> — for the marketing website and blog, enabling static generation for performance and SEO.</li>
            <li><strong>Dart</strong> — as our primary programming language, chosen for type safety and Flutter integration.</li>
          </ul>
          <p>Our architecture prioritizes offline-first functionality. Articles cache locally for reading without connectivity.</p>
        </section>

        <section className="about-section">
          <h2>Contact & Connect</h2>
          <p>I personally respond to every message. Whether you have feature requests, bug reports, or just want to share your RSS story, I would love to hear from you.</p>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@curatedfeeds.web.app">hello@curatedfeeds.web.app</a>
            </div>
            <div className="contact-item">
              <strong>GitHub:</strong>{' '}
              <a href="https://github.com/rajatks" target="_blank" rel="noopener noreferrer">
                github.com/rajatks
              </a>
            </div>
            <div className="contact-item">
              <strong>Founder:</strong>{' '}
              <a href="https://rajatkashyap.com" target="_blank" rel="noopener noreferrer">
                rajatkashyap.com
              </a>
            </div>
          </div>
          <p>Response time: Typically within 48 hours. Priority given to bug reports and constructive feature suggestions.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}