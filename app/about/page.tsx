import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About youtubemp3s",
  description:
    "Learn about youtubemp3s, a free YouTube to MP3 converter and YouTube MP3 downloader.",
};

export default function AboutPage() {
  return (
    <main className="static-page">
      <header className="static-header">
        <h1>About youtubemp3s</h1>
        <p>
          youtubemp3s is a free YouTube to MP3 converter and YouTube MP3
          downloader built for fast, simple audio downloads in your browser.
        </p>
      </header>

      <section className="static-section">
        <h2>What We Do</h2>
        <p>
          We help people extract audio from YouTube videos and download it as
          MP3 with a simple, URL-based workflow. No accounts, no software, and
          no setup.
        </p>
      </section>

      <section className="static-section">
        <h2>Safe and Secure</h2>
        <p>
          We do not store your videos or downloads. Conversions happen on
          demand, and files are delivered directly to your device.
        </p>
      </section>

      <section className="static-section">
        <h2>Use Responsibly</h2>
        <p>
          Only download content you have the right to access and keep. Respect
          creators and local laws.
        </p>
      </section>

      <section className="static-section">
        <h2>Privacy</h2>
        <p>
          For details on analytics, ads, and data handling, read our {" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>
    </main>
  );
}
