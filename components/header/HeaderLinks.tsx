"use client";

import { Link as I18nLink, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { HeaderLink } from "@/types/common";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

const HeaderLinks = () => {
  const tHeader = useTranslations("Header");
  const pathname = usePathname();

  const headerLinks: HeaderLink[] = tHeader.raw("links");
  const pricingLink = headerLinks.find((link) => link.id === "pricing");
  if (pricingLink) {
    pricingLink.href = process.env.NEXT_PUBLIC_PRICING_PATH!;
  }

  return (
    <nav className="hidden lg:flex items-center space-x-2">
      {headerLinks.map((link) => {
        const isCurrentPage = pathname === link.href || 
          (link.href === '/' && pathname === '/') ||
          (link.href === '/#pricing' && pathname === '/') ||
          (link.href === '/veo4' && pathname === '/veo4') ||
          (link.href === '/blogs' && pathname.startsWith('/blogs'));
        
        return (
          <I18nLink
            key={link.name}
            href={link.href}
            title={link.name}
            prefetch={link.target && link.target === "_blank" ? false : true}
            target={link.target || "_self"}
            rel={link.rel || undefined}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isCurrentPage
                ? "bg-primaryBlue text-white font-semibold"
                : "text-gray-700 dark:text-textSubtle hover:text-gray-900 dark:hover:text-textMain hover:bg-gray-100 dark:hover:bg-bgCard"
            )}
          >
            {link.name}
            {link.target && link.target === "_blank" && (
              <span className="text-xs ml-1">
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
          </I18nLink>
        );
      })}
    </nav>
  );
};

export default HeaderLinks;
