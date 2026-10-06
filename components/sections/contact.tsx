"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
  ArrowUpRightIcon,
} from "@/components/icons";
import { siteConfig, socials } from "@/lib/site";
import type { Dictionary } from "@/i18n/types";

export function Contact({ contact }: { contact: Dictionary["contact"] }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link is still there */
    }
  };

  const socialLinks = [
    { href: socials.github, label: "GitHub", Icon: GitHubIcon },
    { href: socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: socials.x, label: "X", Icon: XIcon },
  ].filter((s) => s.href);

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading label={contact.label} title={contact.title} subtitle={contact.subtitle} />

      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={socials.email}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
              >
                <MailIcon width={18} height={18} />
                {contact.emailCta}
                <ArrowUpRightIcon
                  width={16}
                  height={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
              >
                {copied ? (
                  <CheckIcon width={16} height={16} className="text-accent" />
                ) : (
                  <CopyIcon width={16} height={16} />
                )}
                <span className="font-mono">{copied ? contact.copied : siteConfig.email}</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm text-muted">{contact.or}</span>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    <Icon width={24} height={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
