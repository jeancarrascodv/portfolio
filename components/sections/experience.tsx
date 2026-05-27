import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { experience, education, languages, t } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function Experience({
  experience: dict,
  education: eduDict,
  locale,
}: {
  experience: Dictionary["experience"];
  education: Dictionary["education"];
  locale: Locale;
}) {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading label={dict.label} title={dict.title} />

      {/* Work timeline */}
      <div className="relative ml-1 border-l border-border pl-8 sm:ml-3">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 0.06}>
            <div className="relative pb-12 last:pb-0">
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

              <p className="mt-0.5 text-xs text-muted/80">{job.location}</p>

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

      {/* Education + Languages */}
      <div className="mt-16 grid gap-12 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {eduDict.title}
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.school}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">{t(edu.degree, locale)}</p>
                  <p className="text-sm text-muted">
                    {edu.school}
                    {edu.location ? ` · ${edu.location}` : ""}
                  </p>
                </div>
                <span className="font-mono text-xs text-muted">{t(edu.period, locale)}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {eduDict.languages}
          </h3>
          <ul className="space-y-3">
            {languages.map((lang) => (
              <li key={t(lang.name, locale)} className="flex items-baseline justify-between gap-4">
                <span className="font-medium">{t(lang.name, locale)}</span>
                <span className="text-sm text-muted">{t(lang.level, locale)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
