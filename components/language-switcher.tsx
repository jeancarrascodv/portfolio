"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  /** Replace the leading /xx locale segment with the target locale. */
  const hrefFor = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target; // segments[0] is "" because pathname starts with "/"
    return segments.join("/") || `/${target}`;
  };

  return (
    <div
      className="glass flex items-center rounded-full p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
