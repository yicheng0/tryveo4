import HeaderLinks from "@/components/header/HeaderLinks";
import MobileMenu from "@/components/header/MobileMenu";
import { UserAvatar } from "@/components/header/UserAvatar";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link as I18nLink } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Header = () => {
  const t = useTranslations("Home");

  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-bgMain text-gray-900 dark:text-textMain shadow-sm dark:shadow-none border-b border-gray-200 dark:border-borderSubtle z-50 flex items-center justify-between">
      {/* 左侧区域：Logo + Nav */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <I18nLink
          href="/"
          title={t("title")}
          prefetch={true}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="w-7 h-7" />
          <span className="text-xl font-semibold tracking-wide text-gray-900 dark:text-textMain">{t("title")}</span>
        </I18nLink>

        {/* 导航 */}
        <HeaderLinks />
      </div>

      {/* 右侧按钮区域 */}
      <div className="flex items-center space-x-3">
        {/* PC */}
        <div className="hidden lg:flex items-center space-x-3">
          <LocaleSwitcher />
          <ThemeToggle />
          <UserAvatar />
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
