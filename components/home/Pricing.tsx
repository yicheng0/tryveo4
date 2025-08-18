/**
 * Tips:
 * Use this component if you want to display different pricing cards based on different payment types (monthly, annual, one_time)
 * If you want to display all pricing cards at once, use PricingAll.tsx
 *
 * 提示：
 * 如果你希望根据不同的支付类型（monthly, annual, one_time）来展示不同的定价卡片，请使用这个组件
 * 如果你希望一次性展示所有定价卡片，请使用 PricingAll.tsx
 */

import { getPublicPricingPlans } from "@/actions/prices/public";
import { PricingCardDisplay } from "@/components/home/PricingCardDisplay";
import FeatureBadge from "@/components/shared/FeatureBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_LOCALE } from "@/i18n/routing";
import { PricingPlan } from "@/types/pricing";
import { Gift } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Pricing() {
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

  const oneTimePlans = allPlans.filter(
    (plan) => plan.payment_type === "one_time"
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
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FeatureBadge
            label={t("badge.label")}
            text={t("badge.text")}
            className="mb-8"
          />
          <h2 className="text-center z-10 text-lg md:text-5xl font-sans font-semibold mb-4">
            <span className="bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <Tabs defaultValue="annual" className="w-full mx-auto">
          <TabsList className="grid w-fit mx-auto grid-cols-3 h-12 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
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
            {oneTimePlans.length > 0 && (
              <TabsTrigger
                value="one_time"
                className="px-6 py-2 text-sm font-normal rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:text-gray-300 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white"
              >
                {t("onetime")}
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
          {oneTimePlans.length > 0 && (
            <TabsContent value="one_time" className="mt-8">
              {renderPlans(oneTimePlans)}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </section>
  );
}
