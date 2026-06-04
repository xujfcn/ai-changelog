import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HtmlLang } from "@/components/html-lang";
import { defaultLocale, Locale } from "@/lib/i18n";

export function LocalizedShell({
  children,
  locale = defaultLocale,
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <HtmlLang locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
