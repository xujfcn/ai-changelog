"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GA_ID, trackEvent } from "@/lib/site-analytics";
export default function SiteAnalytics({site}: {site: "media" | "aichangelog"}) {
  const pathname = usePathname();
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const anchor = (event.target instanceof Element ? event.target.closest("a") : null) as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.hostname === "crazyrouter.com" && url.hostname !== window.location.hostname) {
        trackEvent("site_cta_click", {site_name: site, target: url.pathname, placement: anchor.closest("footer") ? "footer" : anchor.closest("header,nav,aside") ? "navigation" : "content"});
      }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [site]);
  useEffect(() => { trackEvent("site_content_view", {site_name: site, content_type: site === "media" ? "media_tool" : "catalogue"}); }, [pathname, site]);
  return <>
    <Script id="site-ga-config" strategy="beforeInteractive">{`
      if (["image.crazyrouter.com", "aichangelog.dev", "www.aichangelog.dev"].includes(location.hostname)) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function(){dataLayer.push(arguments);};
        gtag('set', 'linker', {domains:['crazyrouter.com','aichangelog.dev'],accept_incoming:true});
        gtag('js', new Date());
        gtag('config', '${GA_ID}', {cookie_domain:'auto',site_name:'${site}'});
      }
    `}</Script>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
  </>;
}
