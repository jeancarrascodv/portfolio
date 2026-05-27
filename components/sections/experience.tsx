import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experience, t } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function Experience({
  experience: dict,
  locale,
}: {
  experience: Dictionary["experience"];
  locale: Locale;
}) {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading label={dict.label} title={dict.title} />

      <div className="relative ml-1 border-l border-border pl-8 sm:ml-3">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 0.08}>
            <div className="relative pb-12 last:pb-0">
              {/* node */}
              <span className="absolute -left-[2.6rem] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-accent/40 bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {t(job.role, locale)}
                  <span className="text-accent"> · {job.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted">{t(job.period, locale)}</span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {t(job.description, locale)}
              </p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-foreground/80"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
