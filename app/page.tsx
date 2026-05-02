"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Script from "next/script";

/**
 * Extract a YouTube video ID from various URL formats or a raw 11-char ID.
 */
function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);

    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      return id?.length === 11 ? id : null;
    }

    if (url.hostname.includes("youtube.com") && url.searchParams.has("v")) {
      const id = url.searchParams.get("v");
      return id?.length === 11 ? id : null;
    }

    const pathMatch = url.pathname.match(
      /\/(embed|shorts|v)\/([A-Za-z0-9_-]{11})/
    );
    if (pathMatch) return pathMatch[2];
  } catch {
    /* not a valid URL */
  }

  return null;
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/** Native banner ad slot (1:4 format) */
function NativeBannerAd({ id }: { id: string }) {
  return (
    <div className="native-ad-slot">
      <Script
        src="https://pl29316187.profitablecpmratenetwork.com/9aa1fc5376c9b81ef843a41d816a8426/invoke.js"
        data-cfasync="false"
        strategy="lazyOnload"
      />
      <div id={id}></div>
    </div>
  );
}

/** Fake loading overlay shown while "converting" */
function LoadingOverlay({
  videoId,
  progress,
}: {
  videoId: string;
  progress: number;
}) {
  const steps = [
    "Fetching video metadata…",
    "Extracting audio stream…",
    "Encoding to MP3…",
    "Finalising your download…",
  ];
  const stepIndex = Math.min(Math.floor(progress / 25), 3);

  return (
    <div className="loading-overlay" aria-live="polite">
      {/* Spinner + status */}
      <div className="loading-top">
        <div className="loading-spinner">
          <svg viewBox="0 0 50 50" className="spinner-svg">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#ff0033"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
            />
          </svg>
          <span className="spinner-pct">{Math.round(progress)}%</span>
        </div>
        <div className="loading-text">
          <p className="loading-status">{steps[stepIndex]}</p>
          <p className="loading-vid">
            Video ID: <code>{videoId}</code>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Native ad + smartlink during wait */}
      <div className="loading-ad-area">
        <p className="loading-ad-label">⚡ While you wait — sponsored</p>
        <div id="container-9aa1fc5376c9b81ef843a41d816a8426"></div>
        <a
          href="https://www.profitablecpmratenetwork.com/zwvurvzasu?key=8c927f166493b5dddce624bcb1c00e94"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="smartlink-cta"
          id="smartlink-loading-cta"
        >
          🎵 Discover top music tools
        </a>
      </div>
    </div>
  );
}

export default function Page() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startFakeLoading = useCallback((id: string) => {
    setIsLoading(true);
    setLoadProgress(0);
    setShowResult(false);

    let p = 0;
    timerRef.current = setInterval(() => {
      // Ease-in progress: faster at start, slows toward end
      const increment = p < 60 ? 3.5 : p < 85 ? 1.8 : 0.7;
      p = Math.min(p + increment, 99);
      setLoadProgress(p);

      if (p >= 99) {
        if (timerRef.current) clearInterval(timerRef.current);
        // Hold briefly at 99% then finish
        setTimeout(() => {
          setLoadProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            setVideoId(id);
            setShowResult(true);
          }, 350);
        }, 400);
      }
    }, 80);
  }, []);

  const handleConvert = useCallback(() => {
    const id = extractVideoId(url);
    if (!id) {
      setError("Please enter a valid YouTube URL or video ID");
      setVideoId(null);
      setShowResult(false);
      return;
    }
    setError("");
    startFakeLoading(id);
  }, [url, startFakeLoading]);

  const handleReset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setUrl("");
    setVideoId(null);
    setError("");
    setShowResult(false);
    setIsLoading(false);
    setLoadProgress(0);
  }, []);

  return (
    <div className="page-wrapper">
      {/* Inject native banner script once */}
      <Script
        src="https://pl29316187.profitablecpmratenetwork.com/9aa1fc5376c9b81ef843a41d816a8426/invoke.js"
        data-cfasync="false"
        strategy="lazyOnload"
      />

      <main className="main-content">
        {/* ── Header ── */}
        <header className="header">
          <div className="logo-row">
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18V5l12-2v13"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="6" cy="18" r="3" fill="#fff" />
                <circle cx="18" cy="16" r="3" fill="#fff" />
              </svg>
            </div>
            <h1 className="brand">
              youtube<span>mp3s</span>
            </h1>
          </div>
          <p className="tagline">
            Free YouTube to MP3 converter — convert any YouTube video to MP3
            audio and download it instantly. No registration, no software, 100%
            free.
          </p>
        </header>

        {/* ── Converter ── */}
        <section className="converter-card" id="converter">
          <h2>Convert YouTube to MP3</h2>

          <div className="input-group">
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <input
                id="url-input"
                type="text"
                placeholder="Paste YouTube URL here…"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConvert();
                }}
                autoComplete="off"
                spellCheck={false}
                disabled={isLoading}
              />
              {url && !isLoading && (
                <button
                  className="clear-btn"
                  id="clear-input"
                  onClick={handleReset}
                  aria-label="Clear input"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {error && (
              <p className="error-text" role="alert">
                {error}
              </p>
            )}

            <button
              id="convert-btn"
              className={`convert-btn${isLoading ? " loading" : ""}`}
              onClick={isLoading ? undefined : handleConvert}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="btn-spinner"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Converting…
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Convert to MP3
                </>
              )}
            </button>
          </div>

          {/* Loading State */}
          {isLoading && videoId === null && url && (
            <LoadingOverlay
              videoId={extractVideoId(url) ?? ""}
              progress={loadProgress}
            />
          )}

          {/* Result */}
          {showResult && videoId && (
            <div className="result-area" id="result-area">
              <div className="video-preview">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                  alt="YouTube video thumbnail preview"
                  className="thumbnail"
                />
                <div className="preview-overlay">
                  <span className="preview-id">{videoId}</span>
                </div>
              </div>

              <div className="iframe-wrapper">
                <p className="iframe-label">
                  Click below to download as <strong>MP3</strong>
                </p>
                <iframe
                  key={`mp3-${videoId}`}
                  style={{
                    width: "100%",
                    minWidth: 200,
                    maxWidth: 350,
                    height: 57,
                    border: 0,
                    overflow: "hidden",
                  }}
                  scrolling="no"
                  src={`https://yt-api.org/button/mp3/${videoId}`}
                  title="Download YouTube video as MP3"
                />
              </div>

              <button
                id="convert-another-btn"
                className="convert-another-btn"
                onClick={handleReset}
              >
                ↩ Convert another video
              </button>
            </div>
          )}
        </section>

        {/* ── How It Works ── */}
        <section className="info-section" id="how-to-convert-youtube-to-mp3">
          <h2>How to Convert YouTube to MP3</h2>
          <div className="steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Copy YouTube URL</h3>
              <p>
                Copy the link of any YouTube video you want to convert to MP3
                audio format.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Paste &amp; Convert</h3>
              <p>
                Paste the YouTube URL into the input above and click
                &ldquo;Convert to MP3&rdquo;.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Download MP3</h3>
              <p>
                Click the download button to save the MP3 audio file to your
                device for free.
              </p>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="info-section" id="features">
          <h2>Why Use youtubemp3s?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <CheckIcon />
              Free YouTube to MP3 converter
            </div>
            <div className="feature-item">
              <CheckIcon />
              No registration required
            </div>
            <div className="feature-item">
              <CheckIcon />
              High-quality MP3 audio
            </div>
            <div className="feature-item">
              <CheckIcon />
              Works on all devices
            </div>
            <div className="feature-item">
              <CheckIcon />
              Unlimited conversions
            </div>
            <div className="feature-item">
              <CheckIcon />
              No software installation
            </div>
          </div>
        </section>

        {/* ── About / SEO Content ── */}
        <section className="info-section" id="about-youtube-to-mp3">
          <h2>Best Free YouTube to MP3 Converter Online</h2>
          <p>
            <strong>youtubemp3s</strong> is the fastest and easiest way to
            convert YouTube videos to MP3 audio online. Our free YouTube to MP3
            converter lets you download music from YouTube as high-quality MP3
            files — no software needed. Simply paste a YouTube link and download
            the audio in seconds.
          </p>
          <p>
            Whether you want to download YouTube music, save a podcast, or
            extract audio from any YouTube video, youtubemp3s makes it simple.
            Our YouTube MP3 downloader supports all YouTube URL formats
            including standard links, short URLs (youtu.be), embeds, and YouTube
            Shorts.
          </p>
        </section>

        {/* ── Native Banner Ad (between content sections) ── */}
        <div className="native-ad-slot" aria-hidden="true" id="native-ad-between-sections">
          <div id="container-9aa1fc5376c9b81ef843a41d816a8426"></div>
        </div>

        {/* ── FAQ (SEO-rich) ── */}
        <section className="faq" id="faq">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h3>Is youtubemp3s free to use?</h3>
            <p>
              Yes! youtubemp3s is a completely free YouTube to MP3 converter.
              There are no hidden fees, no subscriptions, and no limits on
              conversions.
            </p>
          </div>

          <div className="faq-item">
            <h3>How do I convert a YouTube video to MP3?</h3>
            <p>
              Copy the YouTube video URL, paste it into the converter above, and
              click &ldquo;Convert to MP3&rdquo;. Once the conversion is ready,
              click the download button to save your MP3 file.
            </p>
          </div>

          <div className="faq-item">
            <h3>Do I need to install any software?</h3>
            <p>
              No. youtubemp3s is an online YouTube to MP3 converter that works
              entirely in your browser. No downloads or installations required.
            </p>
          </div>

          <div className="faq-item">
            <h3>What audio quality does the MP3 download have?</h3>
            <p>
              Our YouTube MP3 converter delivers high-quality audio files. The
              output quality depends on the original YouTube video&apos;s audio
              bitrate.
            </p>
          </div>

          <div className="faq-item">
            <h3>Can I use youtubemp3s on my phone?</h3>
            <p>
              Absolutely. youtubemp3s works on all devices — iPhone, Android,
              iPad, and desktop. Just open the website in your mobile browser
              and convert YouTube to MP3 instantly.
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <p>
            youtubemp3s &copy; {new Date().getFullYear()} &mdash; Free online
            YouTube to MP3 converter. Convert and download YouTube videos to MP3
            audio. Not affiliated with YouTube or Google.
          </p>
        </footer>
      </main>
    </div>
  );
}
