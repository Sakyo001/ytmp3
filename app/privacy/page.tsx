import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how youtubemp3s handles data, analytics, and advertising on this YouTube to MP3 converter.",
};

export default function PrivacyPage() {
  return (
    <main className="static-page">
      <header className="static-header">
        <h1>Privacy Policy</h1>
        <p>
          This page explains how youtubemp3s collects and uses information when
          you use our YouTube to MP3 converter and YouTube MP3 downloader.
        </p>
      </header>

      <section className="static-section">
        <h2>Information We Collect</h2>
        <p>
          We do not require accounts or registrations. Like most websites, our
          servers may log basic technical information such as IP address,
          browser type, and timestamps for security and troubleshooting.
        </p>
      </section>

      <section className="static-section">
        <h2>Analytics and Advertising</h2>
        <p>
          We use third-party analytics and advertising partners to understand
          performance and keep the service free. These partners may use cookies
          or similar technologies to measure traffic and show relevant ads.
        </p>
      </section>

      <section className="static-section">
        <h2>Cookies</h2>
        <p>
          You can control cookies through your browser settings. Disabling
          cookies may affect certain features or ad display.
        </p>
      </section>

      <section className="static-section">
        <h2>Data Retention</h2>
        <p>
          We keep technical logs only as long as needed for security, analytics,
          and operational purposes.
        </p>
      </section>

      <section className="static-section">
        <h2>Your Choices</h2>
        <p>
          If you prefer not to use third-party analytics or ads, you can use
          browser privacy controls or extensions. For more context about our
          service, visit the <Link href="/about">About page</Link>.
        </p>
      </section>
    </main>
  );
}
