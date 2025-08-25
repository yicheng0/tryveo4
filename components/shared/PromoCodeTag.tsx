"use client";

import { Button } from "@/components/ui/button";
import { Copy, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface PromoCodeProps {
  code: string;
  discount: string;
  expiryDate?: string;
}

export default function PromoCodeTag({
  code,
  discount,
  expiryDate,
}: PromoCodeProps) {
  const [isCopied, setIsCopied] = useState(false);
  const t = useTranslations("Shared.promoCode");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex justify-center my-4">
      <div className="inline-flex items-center rounded-lg bg-bgCard shadow-sm border border-borderSubtle overflow-hidden">
        <div className="flex items-center px-3 py-2 bg-primaryBlue/10 border-r border-borderSubtle">
          <Tag className="h-4 w-4 text-primaryBlue mr-2" />
          <span className="text-xs font-medium text-primaryBlue">
            {t("limitedTimeOffer")}: {t("save", { discount })}
          </span>
        </div>

        <div className="px-3 py-2 flex items-center border-r border-borderSubtle">
          <code className="font-mono font-medium text-sm text-textMain">
            {code}
          </code>
        </div>

        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="sm"
          className="px-3 h-full text-textSubtle hover:bg-bgMain rounded-none"
        >
          {isCopied ? t("copied") : <Copy className="h-3.5 w-3.5" />}
        </Button>

        {expiryDate && (
          <div className="hidden sm:flex items-center pl-2 pr-3 text-xs text-textSubtle">
            {t("validUntil")}: {expiryDate}
          </div>
        )}
      </div>
    </div>
  );
}
