import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/site";
import type { Dictionary } from "@/i18n/types";

export function About({ about }: { about: Dictionary["about"] }) {
  const items = [
    { value: stats.yearsExperience, label: about.stats.experience },
    { value: stats.projectsShipped, label: about.stats.projects },
    { value: stats.coreStack, label: about.stats.stack },
  ];

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
            {items.map((it) => (
              <div key={it.label} className="bg-background-soft p-6">
                <div className="text-3xl font-semibold text-gradient sm:text-4xl">
                  {it.value}
                </div>
                <div className="mt-1 text-sm text-muted">{it.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
