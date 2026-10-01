import { notFound } from "next/navigation";
import { guides } from "@/catalog/guides";
import { GuidePage } from "@/components/site/guide-page";
export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: guides[slug as keyof typeof guides]?.title ?? "ドキュメント",
  };
}
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(guides, slug)) notFound();
  return <GuidePage slug={slug as keyof typeof guides} />;
}
