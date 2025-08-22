import { Veo4Generator } from "@/components/veo4/Veo4Generator";
import { Locale } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
      <div className="w-full py-6 px-2 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Veo 4 AI Video Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Transform your ideas into stunning videos with Google's most advanced AI video generation model
          </p>
        </div>

        {/* Main Generator Interface */}
        <Veo4Generator />
      </div>
    </div>
  );
}
