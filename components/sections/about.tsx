import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { StatCounter } from "@/components/stat-counter";
import { stats, t } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function About({
  about,
  locale,
}: {
  about: Dictionary["about"];
  locale: Locale;
}) {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading label={about.label} title={about.title} />

      <div className="grid gap-12 md:grid-cols-5">
        <div className="space-y-5 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-muted sm:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:col-span-2">
          {stats.map((it, i) => (
            <Reveal key={it.value} delay={0.1 + i * 0.08}>
              <SpotlightCard className="card group rounded-2xl p-6 transition-colors duration-300 hover:border-accent/40">
                <div className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                  <StatCounter value={it.value} />
                </div>
                <div className="mt-2 text-sm leading-snug text-muted">
                  {t(it.label, locale)}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
