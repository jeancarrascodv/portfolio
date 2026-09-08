import { notFound } from "next/navigation";
import { OperationsPortfolio } from "@/components/operations-portfolio";
import { isLocale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <OperationsPortfolio locale={locale} />;
}
