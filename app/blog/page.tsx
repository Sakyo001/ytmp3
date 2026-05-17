import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YouTube to MP3 Guides",
  description:
    "Short tutorials for using a YouTube to MP3 converter and YouTube MP3 downloader on any device.",
};

const posts = [
  {
    title: "How to Convert YouTube to MP3 on iPhone",
    slug: "how-to-convert-youtube-to-mp3-on-iphone",
    description:
      "A quick iPhone-friendly walkthrough using Safari and Files for clean MP3 downloads.",
    date: "May 17, 2026",
  },
  {
    title: "Best YouTube to MP3 Converter for 320kbps Audio",
    slug: "best-youtube-to-mp3-converter-320kbps",
    description:
      "Tips for choosing high-quality sources and getting the best possible audio output.",
    date: "May 17, 2026",
  },
  {
    title: "YouTube to MP3 Downloader for Podcasts",
    slug: "youtube-to-mp3-downloader-for-podcasts",
    description:
      "Save long-form interviews and lectures for offline listening without the video.",
    date: "May 17, 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="static-page">
      <header className="static-header">
        <h1>YouTube to MP3 Guides</h1>
        <p>
          Short, practical tips for using a YouTube to MP3 converter and YouTube
          MP3 downloader.
        </p>
      </header>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug} className="post-card">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            <p>{post.description}</p>
            <span className="post-meta">{post.date}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
