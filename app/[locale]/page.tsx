import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero hero={dict.hero} locale={locale} />
      <About about={dict.about} />
      <Skills skills={dict.skills} locale={locale} />
      <Projects projects={dict.projects} locale={locale} />
      <Experience experience={dict.experience} locale={locale} />
      <Contact contact={dict.contact} />
    </>
  );
}
