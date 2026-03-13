import { getAllChangelog } from "@/lib/data";

export async function GET() {
  const entries = getAllChangelog();
  const baseUrl = "https://aichangelog.com";

  const items = entries.slice(0, 50).map((entry) => {
    const link = `${baseUrl}/${entry.providerSlug}/${entry.modelId}`;
    const pubDate = new Date(entry.date).toUTCString();

    return `    <item>
      <title>${escapeXml(`${entry.modelName}: ${entry.description}`)}</title>
      <link>${link}</link>
      <guid>${link}#${entry.date}-${entry.type}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${entry.type}</category>
      <description>${escapeXml(entry.description)}</description>
      <author>${escapeXml(entry.providerName)}</author>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Model Changelog</title>
    <link>${baseUrl}</link>
    <description>Track every AI model update — releases, pricing changes, deprecations, and more.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
