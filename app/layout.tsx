import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Inter({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  applicationName: "youtubemp3s",
  title: {
    default:
      "YouTube to MP3 Converter – Free YouTube MP3 Downloader | youtubemp3s",
    template: "%s | youtubemp3s – YouTube to MP3 Converter",
  },
  description:
    "Convert YouTube to MP3 for free. youtubemp3s is the best online YouTube to MP3 converter — download YouTube videos as high-quality MP3 audio instantly. No registration, no software.",
  keywords: [
    "YouTube to MP3",
    "YouTube MP3 converter",
    "YouTube MP3 downloader",
    "convert YouTube to MP3",
    "download YouTube MP3",
    "YouTube to MP3 online",
    "free YouTube to MP3",
    "YouTube audio downloader",
    "YouTube music downloader",
    "MP3 from YouTube",
    "youtubemp3s",
    "yt to MP3",
    "YouTube converter",
    "online MP3 converter",
    "YouTube video to audio",
    "extract audio from YouTube",
    "YouTube to audio converter",
    "best YouTube to MP3",
    "YouTube MP3 free",
    "download music from YouTube",
  ],
  authors: [{ name: "youtubemp3s" }],
  creator: "youtubemp3s",
  publisher: "youtubemp3s",
  category: "utilities",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "YouTube to MP3 Converter – Free YouTube MP3 Downloader",
    description:
      "Convert any YouTube video to MP3 audio for free. Fast, easy, and no registration required. The best online YouTube to MP3 converter.",
    type: "website",
    siteName: "youtubemp3s",
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "youtubemp3s – Free YouTube to MP3 Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube to MP3 Converter – Free YouTube MP3 Downloader",
    description:
      "Convert any YouTube video to MP3 audio for free. The fastest online YouTube to MP3 converter. No software needed.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "youtubemp3s",
              url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
              description:
                "Free online YouTube to MP3 converter. Convert and download YouTube videos as high-quality MP3 audio files instantly.",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
