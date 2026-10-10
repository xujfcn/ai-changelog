import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AI Model Changelog — Track every AI model update in one place",
    template: "%s | AI Model Changelog",
  },
  description:
    "Track version history, updates, deprecations, and pricing changes for all major AI models including OpenAI GPT, Anthropic Claude, Google Gemini, DeepSeek, Meta Llama, and Mistral.",
  keywords: [
    "ai model updates",
    "gpt changelog",
    "claude version history",
    "gemini updates",
    "ai model pricing",
    "llm changelog",
    "openai updates",
    "anthropic updates",
  ],
  metadataBase: new URL("https://aichangelog.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aichangelog.dev",
    title: "AI Model Changelog — Track every AI model update in one place",
    description:
      "Track version history, updates, deprecations, and pricing changes for all major AI models.",
    siteName: "AI Model Changelog",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Model Changelog",
    description:
      "Track version history, updates, deprecations, and pricing changes for all major AI models.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="85911674-04ec-4b92-9716-ab1dc311c39e"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
