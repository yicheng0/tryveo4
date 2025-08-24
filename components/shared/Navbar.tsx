"use client";

import { Link as I18nLink, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { HeaderLink } from "@/types/common";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { UserAvatar } from "@/components/header/UserAvatar";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const t = useTranslations("Home");
  const tHeader = useTranslations("Header");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerLinks: HeaderLink[] = tHeader.raw("links");
  const pricingLink = headerLinks.find((link) => link.id === "pricing");
  if (pricingLink) {
    pricingLink.href = process.env.NEXT_PUBLIC_PRICING_PATH!;
  }

  return (
    <header className="relative w-full h-16 bg-[#211a14]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
        <nav className="flex items-center justify-between h-full">
          {/* Logo 区 */}
          <div className="flex items-center">
            <I18nLink
              href="/"
              title={t("title")}
              prefetch={true}
              className="flex items-center gap-x-2"
            >
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="text-xl font-serif font-semibold text-white leading-tight">
                {t("title")}
              </span>
            </I18nLink>
          </div>

          {/* 导航区 - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {headerLinks.map((link) => (
              <I18nLink
                key={link.name}
                href={link.href}
                title={link.name}
                prefetch={link.target && link.target === "_blank" ? false : true}
                target={link.target || "_self"}
                rel={link.rel || undefined}
                className={cn(
                  "flex items-center justify-center h-10 px-4 text-base font-sans leading-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white/5",
                  pathname === link.href
                    ? "text-[#f9e59a] font-medium bg-white/5"
                    : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </I18nLink>
            ))}
          </div>

          {/* 操作区 */}
          <div className="flex items-center gap-x-2">
            {/* Desktop 操作区 */}
            <div className="hidden md:flex items-center gap-x-2">
              <LocaleSwitcher />
              <ThemeToggle />
              
              {/* Sign in 按钮 */}
              <button className="h-10 px-4 rounded-xl bg-[#2979FF] hover:bg-blue-600 text-white text-sm font-sans leading-none transition-all">
                Sign in
              </button>
              
              <UserAvatar />
            </div>

            {/* Mobile 菜单按钮 */}
            <button
              className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile 菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#211a14] border-t border-white/10 z-50">
            <div className="px-4 py-6 space-y-2">
              {headerLinks.map((link) => (
                <I18nLink
                  key={link.name}
                  href={link.href}
                  title={link.name}
                  prefetch={link.target && link.target === "_blank" ? false : true}
                  target={link.target || "_self"}
                  rel={link.rel || undefined}
                  className={cn(
                    "flex items-center justify-center h-10 px-4 text-base font-sans leading-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/5",
                    pathname === link.href
                      ? "text-[#f9e59a] font-medium bg-white/5"
                      : "text-white/80 hover:text-white"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </I18nLink>
              ))}
              
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-x-2">
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
                
                <button className="w-full h-10 px-4 rounded-xl bg-[#2979FF] hover:bg-blue-600 text-white text-sm font-sans leading-none transition-all">
                  Sign in
                </button>
                
                <div className="flex justify-center pt-2">
                  <UserAvatar />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;