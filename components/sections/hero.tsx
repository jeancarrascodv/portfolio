"use client";

import { motion, type Variants } from "framer-motion";
import { HeroCanvas } from "@/components/scene/hero-canvas";
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  MailIcon,
  ArrowDownIcon,
  ArrowUpRightIcon,
} from "@/components/icons";
import { siteConfig, socials, t } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ hero, locale }: { hero: Dictionary["hero"]; locale: Locale }) {
  const socialLinks = [
    { href: socials.github, label: "GitHub", Icon: GitHubIcon },
    { href: socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: socials.x, label: "X", Icon: XIcon },
    { href: socials.email, label: "Email", Icon: MailIcon },
  ].filter((s) => s.href);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-20" aria-hidden />
      <HeroCanvas />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {siteConfig.available && (
            <motion.div
              variants={item}
              className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {hero.availability}
            </motion.div>
          )}

          <motion.p variants={item} className="mb-3 font-mono text-sm text-accent">
            {hero.greeting}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient">{siteConfig.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-2xl font-medium leading-snug text-foreground sm:text-3xl"
          >
            {hero.headline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {hero.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              {hero.ctaPrimary}
              <ArrowUpRightIcon
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted transition-colors hover:text-foreground"
              >
                <Icon width={22} height={22} />
              </a>
            ))}
            <span className="ml-1 hidden text-sm text-muted sm:inline">
              · {t(siteConfig.location, locale)}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label={hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted sm:flex"
      >
        {hero.scroll}
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDownIcon width={16} height={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
