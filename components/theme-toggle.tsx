"use client";

import { useSyncExternalStore } from "react";
import { SunIcon, MoonIcon } from "@/components/icons";

type Theme = "light" | "dark";
export const themeInitScript = `(function(){var light=true;try{light=localStorage.getItem('theme')!=='dark';}catch(e){}document.documentElement.classList.toggle('light',light);document.documentElement.style.colorScheme=light?'light':'dark';})();`;
function current(): Theme { return document.documentElement.classList.contains("light") ? "light" : "dark"; }
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const serverSnapshot = (): Theme => "light";
export function ThemeToggle({ label = "Toggle theme" }: { label?: string }) {
  const theme = useSyncExternalStore(subscribe, current, serverSnapshot);
  const toggle = () => {
    const next: Theme = current() === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.style.colorScheme = next;
    try { localStorage.setItem("theme", next); } catch { /* Theme works without storage. */ }
  };
  return <button type="button" onClick={toggle} aria-label={label} title={label} className="glass grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-foreground">{theme === "light" ? <MoonIcon width={15} height={15} /> : <SunIcon width={15} height={15} />}</button>;
}
