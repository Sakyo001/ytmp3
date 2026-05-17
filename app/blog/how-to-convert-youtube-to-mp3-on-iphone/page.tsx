import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Convert YouTube to MP3 on iPhone",
  description:
    "Learn how to convert YouTube to MP3 on iPhone using a fast, browser-based YouTube MP3 downloader.",
};

export default function IPhoneGuidePage() {
  return (
    <article className="static-page">
      <header className="static-header">
        <p className="post-meta">May 17, 2026 · 4 min read</p>
        <h1>How to Convert YouTube to MP3 on iPhone</h1>
        <p>
          This guide shows a simple way to use a YouTube to MP3 converter on
          iPhone. The workflow is fast, does not require apps, and works with
          Safari.
        </p>
      </header>

      <section className="static-section">
        <h2>Step 1: Copy the YouTube link</h2>
        <p>
          Open the YouTube video you want, tap Share, and copy the URL. Short
          links and standard links both work.
        </p>
      </section>

      <section className="static-section">
        <h2>Step 2: Paste into the converter</h2>
        <p>
          Open youtubemp3s.com in Safari, paste the link into the input box, and
          tap Convert to MP3.
        </p>
      </section>

      <section className="static-section">
        <h2>Step 3: Download and save</h2>
        <p>
          When the download button appears, tap it and save the MP3 to the Files
          app. You can then listen offline in your preferred player.
        </p>
      </section>

      <section className="static-section">
        <h2>Extra tips</h2>
        <p>
          If you need higher quality, choose the highest available bitrate and
          use Wi-Fi for faster downloads. Always make sure you have permission
          to save the content.
        </p>
      </section>

      <section className="static-section">
        <h2>More guides</h2>
        <p>
          Browse more tutorials on the <Link href="/blog">blog page</Link>.
        </p>
      </section>
    </article>
  );
}
