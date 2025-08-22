import { getPublicPricingPlans } from "@/actions/prices/public";
import { PricingCardDisplay } from "@/components/home/PricingCardDisplay";
import FeatureBadge from "@/components/shared/FeatureBadge";
import { BG1 } from "@/components/shared/BGs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_LOCALE } from "@/i18n/routing";
import { PricingPlan } from "@/types/pricing";
import { Gift } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export default async function PricingPage() {
  const t = await getTranslations("Landing.Pricing");

  const locale = await getLocale();

  let allPlans: PricingPlan[] = [];
  const result = await getPublicPricingPlans();

  if (result.success) {
    allPlans = result.data || [];
  } else {
    console.error("Failed to fetch public pricing plans:", result.error);
  }

  const annualPlans = allPlans.filter(
    (plan) =>
      plan.payment_type === "recurring" && plan.recurring_interval === "year"
  );

  const monthlyPlans = allPlans.filter(
    (plan) =>
      plan.payment_type === "recurring" && plan.recurring_interval === "month"
  );


  const renderPlans = (plans: PricingPlan[]) => {
    return (
      <div
        className={`grid gap-8 justify-center ${
          plans.length === 1
            ? "grid-cols-1 max-w-sm mx-auto"
            : plans.length === 2
            ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
            : "grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto"
        }`}
      >
        {plans.map((plan) => {
          const localizedPlan =
            plan.lang_jsonb?.[locale] || plan.lang_jsonb?.[DEFAULT_LOCALE];

          if (!localizedPlan) {
            console.warn(
              `Missing localization for locale '${
                locale || DEFAULT_LOCALE
              }' for plan ID ${plan.id}`
            );
            return null;
          }

          return (
            <PricingCardDisplay
              id={plan.is_highlighted ? "highlight-card" : undefined}
              key={plan.id}
              plan={plan}
              localizedPlan={localizedPlan}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full relative">
      <BG1 />
      
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FeatureBadge
              label={t("badge.label")}
              text={t("badge.text")}
              className="mb-8"
            />
            <h1 className="text-center z-10 text-3xl md:text-6xl font-sans font-semibold mb-4">
              <span className="bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground text-transparent">
                {t("title")}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>

          <Tabs defaultValue="annual" className="w-full mx-auto">
            <TabsList className="grid w-fit mx-auto grid-cols-2 h-12 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {monthlyPlans.length > 0 && (
                <TabsTrigger
                  value="monthly"
                  className="px-6 py-2 text-sm font-normal rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:text-gray-300 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white"
                >
                  {t("monthly")}
                </TabsTrigger>
              )}
              {annualPlans.length > 0 && (
                <TabsTrigger
                  value="annual"
                  className="px-6 py-2 text-sm font-normal rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:text-gray-300 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white relative"
                >
                  <span className="flex items-center gap-2">
                    {t("annual")}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold">
                      <Gift className="w-4 h-4 text-main" />
                      <span className="highlight-text">{t("saveTip")}</span>
                    </span>
                  </span>
                </TabsTrigger>
              )}
            </TabsList>
            {monthlyPlans.length > 0 && (
              <TabsContent value="monthly" className="mt-8">
                {renderPlans(monthlyPlans)}
              </TabsContent>
            )}
            {annualPlans.length > 0 && (
              <TabsContent value="annual" className="mt-8">
                {renderPlans(annualPlans)}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
}