import { Reveal } from "@/components/reveal";

export function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-accent to-accent-2" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {label}
        </span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
