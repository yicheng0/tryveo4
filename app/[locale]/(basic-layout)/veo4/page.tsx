import { Veo4Generator } from "@/components/veo4/Veo4Generator";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Info } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ locale: string }>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Veo4",
  });

  return constructMetadata({
    page: "Veo4",
    title: t("title"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: `/veo4`,
  });
}

export default function Veo4Page() {
  return (
    <Veo4Generator />
  );
}
