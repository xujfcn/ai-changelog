import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
  metadataBase: new URL("https://aichangelog.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aichangelog.com",
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
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
