// One GA page-view owner: gtag config + GA enhanced history measurement.
// Custom events use a queue so initialization timing cannot silently drop them.
export const GA_ID = "G-5YRM80K6VM";
type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
export function sectionForPath(path: string): string {
  if (/\/blog(?:\/|$)/.test(path)) return "blog";
  if (/\/models(?:\/|$)/.test(path)) return "models";
  if (/\/pricing(?:\/|$)/.test(path)) return "pricing";
  if (/\/integrations(?:\/|$)/.test(path)) return "integrations";
  return "other";
}
export function gaSessionCookieName(id: string): string { return `_ga_${id.replace(/^G-/, "")}`; }
export function trackEvent(name: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (!["crazyrouter.com", "image.crazyrouter.com", "aichangelog.dev", "www.aichangelog.dev"].includes(window.location.hostname)) return;
  const w = window as AnalyticsWindow;
  w.dataLayer ||= [];
  w.gtag ||= function () { w.dataLayer!.push(arguments); };
  // Never accept raw user text, URL queries, credentials or upstream errors.
  const allowed = new Set(["site_name", "site_section", "content_type", "page_path", "lang", "model", "task", "mode", "result", "hook", "placement", "target", "intent", "slug", "has_prompt", "prompt_len", "whitelisted", "tool", "media_type", "duration_ms", "failure_stage", "measurement_version"]);
  const safe = Object.fromEntries(Object.entries(payload).filter(([key,value]) => allowed.has(key) && ["string", "number", "boolean"].includes(typeof value)).map(([key,value]) => [key, typeof value === "string" ? value.slice(0,200) : value]));
  w.gtag("event", name, { ...safe, page_path: window.location.pathname, site_section: window.location.hostname === "image.crazyrouter.com" ? "media" : window.location.hostname.endsWith("aichangelog.dev") ? "catalogue" : sectionForPath(window.location.pathname), measurement_version: "20261016", transport_type: "beacon" });
}
