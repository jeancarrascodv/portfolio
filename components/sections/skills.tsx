import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { skills, t } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function Skills({
  skills: dict,
  locale,
}: {
  skills: Dictionary["skills"];
  locale: Locale;
}) {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading label={dict.label} title={dict.title} subtitle={dict.subtitle} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={t(group.category, locale)} delay={(i % 3) * 0.08}>
            <div className="glass group h-full rounded-2xl p-6 transition-colors hover:border-accent/40">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {t(group.category, locale)}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-white/[0.02] px-3 py-1 text-sm text-foreground/90 transition-colors group-hover:border-border"
                  >
                    {item}
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
