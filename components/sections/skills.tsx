import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { skills, t } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

// Distinct hue per category so the grid reads as a set, not a wall. Values are
// theme-agnostic (they sit on tinted chips), brand cyan/violet lead the list.
const HUES = ["#22d3ee", "#8b5cf6", "#34d399", "#f59e0b", "#f472b6", "#38bdf8"];

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
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading label={dict.label} title={dict.title} subtitle={dict.subtitle} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const hue = HUES[i % HUES.length];
          return (
            <Reveal key={t(group.category, locale)} delay={(i % 3) * 0.08}>
              <SpotlightCard className="card group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: hue, boxShadow: `0 0 12px ${hue}80` }}
                    aria-hidden
                  />
                  <span style={{ color: hue }}>{t(group.category, locale)}</span>
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1 text-sm text-foreground/90 transition-colors hover:border-accent/40 hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
