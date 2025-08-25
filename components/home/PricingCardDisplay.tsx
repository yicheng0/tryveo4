"use client";

import { Button } from "@/components/ui/button";
import { styles } from "@/lib/styles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingPlan, PricingPlanTranslation } from "@/types/pricing";
import { Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface PricingCardDisplayProps {
  plan: PricingPlan;
  localizedPlan: PricingPlanTranslation;
  id?: string;
  className?: string;
}

export function PricingCardDisplay({ 
  plan, 
  localizedPlan, 
  id,
  className = "" 
}: PricingCardDisplayProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number | null) => {
    if (!price) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  const getInterval = () => {
    return plan.recurring_interval === 'month' ? '/month' : '/year';
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    // Handle subscription logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  const displayPrice = localizedPlan.display_price || formatPrice(plan.price || 0);
  const displayTitle = localizedPlan.card_title || plan.card_title;
  const displayDescription = localizedPlan.card_description || plan.card_description;
  const buttonText = localizedPlan.button_text || plan.button_text || "Get Started";

  return (
    <Card 
      id={id}
      className={`relative h-full bg-white dark:bg-bgCard border-gray-200 dark:border-borderSubtle ${plan.is_highlighted ? 'ring-2 ring-primaryBlue' : ''} ${className}`}
    >
      {plan.is_highlighted && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primaryBlue text-white">
          {plan.highlight_text || localizedPlan.highlight_text || "Most Popular"}
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold font-serif text-gray-900 dark:text-textMain">
          {displayTitle}
        </CardTitle>
        {displayDescription && (
          <CardDescription className="text-gray-600 dark:text-textSubtle">
            {displayDescription}
          </CardDescription>
        )}
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-textMain">
            {displayPrice}
          </span>
          <span className="text-gray-600 dark:text-textSubtle">
            {localizedPlan.price_suffix || plan.price_suffix || getInterval()}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          {(localizedPlan.features || plan.features) && (
            <ul className="space-y-3 mb-6">
              {(localizedPlan.features || plan.features || []).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primaryBlue mt-0.5 mr-3 flex-shrink-0" />
                  <span 
                    className={`text-sm text-gray-900 dark:text-textMain ${
                      feature.bold ? 'font-semibold' : ''
                    }`}
                  >
                    {feature.description}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          onClick={handleSubscribe}
          disabled={isLoading}
          className={`w-full font-medium px-6 py-3 rounded-xl shadow-md transition duration-200 ${
            plan.is_highlighted 
              ? 'bg-primaryBlue hover:bg-primaryHover text-white' 
              : 'border border-gray-300 dark:border-borderSubtle bg-gray-50 dark:bg-bgCard hover:bg-gray-100 dark:hover:bg-bgMain text-gray-700 dark:text-textSubtle hover:text-gray-900 dark:hover:text-textMain'
          }`}
          asChild={!isLoading}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <Link href="/login">
              {buttonText}
            </Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}