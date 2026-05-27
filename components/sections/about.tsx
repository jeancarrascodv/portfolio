import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
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
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading label={about.label} title={about.title} />

      <div className="grid gap-12 md:grid-cols-5">
        <div className="space-y-5 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-muted sm:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="md:col-span-2">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {stats.map((it) => (
              <div key={it.value} className="bg-background-soft p-6">
                <div className="text-3xl font-semibold text-gradient sm:text-4xl">
                  {it.value}
                </div>
                <div className="mt-1 text-sm text-muted">{t(it.label, locale)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
