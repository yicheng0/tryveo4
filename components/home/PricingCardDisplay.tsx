"use client";

import { Button } from "@/components/ui/button";
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
      className={`relative h-full ${plan.is_highlighted ? 'ring-2 ring-primary' : ''} ${className}`}
    >
      {plan.is_highlighted && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
          {plan.highlight_text || localizedPlan.highlight_text || "Most Popular"}
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold font-serif text-foreground">
          {displayTitle}
        </CardTitle>
        {displayDescription && (
          <CardDescription className="text-muted-foreground">
            {displayDescription}
          </CardDescription>
        )}
        <div className="mt-4">
          <span className="text-4xl font-bold text-foreground">
            {displayPrice}
          </span>
          <span className="text-muted-foreground">
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
                  <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <span 
                    className={`text-sm text-foreground ${
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
          className={`w-full ${
            plan.is_highlighted 
              ? 'bg-primary hover:bg-primary/90' 
              : 'bg-secondary hover:bg-secondary/90'
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