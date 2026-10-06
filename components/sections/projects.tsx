import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ArrowUpRightIcon, GitHubIcon, GlobeIcon } from "@/components/icons";
import { projects, t } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function Projects({
  projects: dict,
  locale,
}: {
  projects: Dictionary["projects"];
  locale: Locale;
}) {
  return (
    <section
      id="work"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading label={dict.label} title={dict.title} subtitle={dict.subtitle} />

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 2) * 0.1}
            className={project.featured ? "lg:col-span-2" : ""}
          >
            <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              {/* glow on hover */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />

              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                        {dict.featured}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-accent/90">{t(project.summary, locale)}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
              </div>

              <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {t(project.description, locale)}
              </p>

              <ul className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-foreground/80"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
                  >
                    <GlobeIcon width={16} height={16} />
                    {dict.viewProject}
                    <ArrowUpRightIcon width={14} height={14} />
                  </a>
                )}
                {project.links.code && (
                  <a
                    href={project.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
                  >
                    <GitHubIcon width={16} height={16} />
                    {dict.viewCode}
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
