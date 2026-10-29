import type { Metadata } from 'next';
import { SITE, privacyPolicyLd, breadcrumbLd, pageAlternates } from '../lib/seo';
import { StructuredData } from '../components/StructuredData';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy, We Do Not Collect Your Data',
  description:
    'Curated Feeds privacy policy: we do not collect personal data. Your feeds, articles, and reading history stay on your device. No account, no tracking, no ads.',
  authors: [{ name: SITE.name }],
  alternates: pageAlternates('/privacy/'),
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    locale: SITE.locale,
    url: `${SITE.url}/privacy/`,
    siteName: SITE.name,
    title: 'Privacy Policy | Curated Feeds',
    description: 'We do not collect personal data. All your RSS feeds and reading preferences stay on your device.',
    images: [`${SITE.url}/og-image.png`],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <StructuredData
        data={[
          privacyPolicyLd(),
          breadcrumbLd([{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy' }]),
        ]}
      />
      <Nav />
      <main id="main" className="privacy-page" itemScope itemType="https://schema.org/PrivacyPolicy">
        <h1 itemProp="name">Privacy Policy</h1>
        <p className="policy-date"><time dateTime="2026-03-22">Last Updated: March 22, 2026</time></p>

        <section>
          <h2>Information We Collect</h2>
          <p><strong>Local Data Storage:</strong> All your personal data remains on your device. We do not have access to your RSS feed subscriptions, articles you save, reading preferences, or any personal information you enter in the app. This data is stored locally using your device&apos;s standard storage mechanisms and is protected by your device&apos;s security features.</p>
          <p><strong>Analytics:</strong> We use Firebase Analytics to collect anonymous usage data. This includes:</p>
          <ul>
            <li>App usage patterns (which features are used most)</li>
            <li>Crash reports and performance metrics</li>
            <li>Anonymous device information (device type, OS version)</li>
          </ul>
          <p>This data is collected anonymously and cannot be used to identify you personally.</p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>The analytics data we collect is used solely for:</p>
          <ul>
            <li>Improving app performance and stability</li>
            <li>Understanding which features are most valuable to users</li>
            <li>Identifying and fixing bugs</li>
            <li>Making informed decisions about future development</li>
          </ul>
        </section>

        <section>
          <h2>Data Storage and Security</h2>
          <p><strong>Local Storage:</strong> All your personal data remains on your device. We do not have access to:</p>
          <ul>
            <li>Your RSS feed subscriptions or content</li>
            <li>Articles you save or mark as read</li>
            <li>Your reading preferences or settings</li>
            <li>Any personal information you enter in the app</li>
          </ul>
          <p><strong>Security Measures:</strong> We implement appropriate technical measures to protect the analytics data we do collect. However, since your personal data never leaves your device, it remains under your complete control and is protected by your device&apos;s security features.</p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Google Analytics (Firebase):</strong> For app usage analytics (data is anonymized).</li>
            <li><strong>Cloudflare R2:</strong> To serve the APK download (no personal data collected).</li>
            <li><strong>Firebase Realtime Database:</strong> To display the live site counters. This stores only anonymous, aggregate numbers: how many devices are on the page right now, a running total of unique visitors, and how many times the APK download has been clicked. No identifiers, session data, or personal information are written, and the numbers are never linked to a person.</li>
          </ul>
          <p>We do not share any personally identifiable information with third parties, as we do not collect such information.</p>
        </section>

        <section>
          <h2>Your Rights and Choices</h2>
          <p>Since we do not collect your personal data, most privacy controls are managed locally on your device:</p>
          <ul>
            <li>You can clear app data at any time through your device settings</li>
            <li>You can uninstall the app to remove all local data</li>
            <li>You can opt-out of analytics by disabling internet access for the app (though this may limit some features)</li>
          </ul>
        </section>

        <section>
          <h2>Children&apos;s Privacy</h2>
          <p>Curated Feeds is not directed to children under the age of 13. Since we do not collect personal information, we do not knowingly collect data from children.</p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
