"use client";

import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowUpRightIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function Nav({ nav, locale }: { nav: Dictionary["nav"]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    const onPointer = (event: PointerEvent) => { if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false); };
    const media = window.matchMedia("(min-width: 601px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    media.addEventListener("change", onResize);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); media.removeEventListener("change", onResize); };
  }, [open]);
  const links = [
    { href: "#about", label: nav.about },
    { href: "#skills", label: locale === "es" ? "Soluciones" : "Solutions" },
    { href: "#work", label: nav.work },
    { href: "#experience", label: nav.experience },
  ];
  return <header className="ops-nav" ref={header}>
    <nav aria-label={locale === "es" ? "Navegación principal" : "Main navigation"} className="ops-container ops-nav-inner">
      <a href="#top" className="ops-brand" aria-label={siteConfig.name}><span className="ops-brand-mark">JC</span><span>Jean Carrasco<small>INDUSTRIAL & SOFTWARE ENGINEER</small></span></a>
      <ul className="ops-nav-links">{links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
      <div className="ops-nav-actions"><a className="ops-nav-talk" href="#contact">{locale === "es" ? "Hablemos" : "Let's talk"}<ArrowUpRightIcon width={14} /></a><ThemeToggle label={locale === "es" ? "Cambiar tema" : "Toggle theme"} /><LanguageSwitcher locale={locale} /><button ref={toggle} type="button" className="ops-mobile-toggle" aria-label={locale === "es" ? (open ? "Cerrar menú" : "Abrir menú") : (open ? "Close menu" : "Open menu")} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{open ? <path d="m5 5 14 14M5 19 19 5" /> : <path d="M3 7h18M3 12h18M3 17h18" />}</svg></button></div>
    </nav>
    {open && <nav id="mobile-navigation" className="ops-mobile-menu" aria-label={locale === "es" ? "Navegación móvil" : "Mobile navigation"}>{[...links, { href: "#contact", label: nav.contact }].map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}</nav>}
  </header>;
}
