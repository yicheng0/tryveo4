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
    <header className="w-full px-6 py-4 text-white bg-background flex items-center justify-between">
      {/* 左侧区域：Logo + Nav */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <I18nLink
          href="/"
          title={t("title")}
          prefetch={true}
          className="flex items-center space-x-2"
        >
          <Image src="/logo.png" alt="Logo" width={24} height={24} className="w-6 h-6" />
          <span className="text-xl font-semibold">{t("title")}</span>
        </I18nLink>

        {/* 导航 */}
        <HeaderLinks />
      </div>

      {/* 右侧按钮区域 */}
      <div className="flex items-center space-x-2">
        {/* PC */}
        <div className="hidden lg:flex items-center space-x-2">
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
