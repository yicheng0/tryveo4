import { getPublicPricingPlans } from "@/actions/prices/public";
import { PricingCardDisplay } from "@/components/home/PricingCardDisplay";
import FeatureBadge from "@/components/shared/FeatureBadge";
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
    <div className="min-h-screen w-full bg-white dark:bg-bgMain text-gray-900 dark:text-textMain">
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FeatureBadge
              label={t("badge.label")}
              text={t("badge.text")}
              className="mb-8"
            />
            <h1 className="text-center text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-textMain">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-textSubtle max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>

          <Tabs defaultValue="annual" className="w-full mx-auto">
            <TabsList className="grid w-fit mx-auto grid-cols-2 h-12 p-1 bg-bgCard rounded-xl">
              {monthlyPlans.length > 0 && (
                <TabsTrigger
                  value="monthly"
                  className="px-6 py-2 text-sm font-medium rounded-xl data-[state=active]:bg-primaryBlue data-[state=active]:shadow-md text-textSubtle data-[state=active]:text-textMain transition duration-200"
                >
                  {t("monthly")}
                </TabsTrigger>
              )}
              {annualPlans.length > 0 && (
                <TabsTrigger
                  value="annual"
                  className="px-6 py-2 text-sm font-medium rounded-xl data-[state=active]:bg-primaryBlue data-[state=active]:shadow-md text-textSubtle data-[state=active]:text-textMain transition duration-200 relative"
                >
                  <span className="flex items-center gap-2">
                    {t("annual")}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold">
                      <Gift className="w-4 h-4 text-primaryBlue" />
                      <span className="text-primaryBlue">{t("saveTip")}</span>
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