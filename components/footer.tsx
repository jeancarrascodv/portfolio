import { ArrowUpRightIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/i18n/types";

export function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return <footer className="ops-container ops-footer"><span>© {new Date().getFullYear()} {siteConfig.name}</span><p>{footer.builtWith}</p><a href="#top">{footer.backToTop}<ArrowUpRightIcon width={13} /></a></footer>;
}
