import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/i18n/types";

export function Footer({ footer }: { footer: Dictionary["footer"] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {year} {siteConfig.name}. {footer.rights}
        </p>
        <p className="font-mono text-xs">{footer.builtWith}</p>
        <a href="#top" className="transition-colors hover:text-foreground">
          {footer.backToTop} ↑
        </a>
      </div>
    </footer>
  );
}
