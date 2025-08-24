"use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import HeaderLinks from "@/components/header/HeaderLinks";
import MobileMenu from "@/components/header/MobileMenu";
import { UserAvatar } from "@/components/header/UserAvatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarInsetHeader() {
  return (
    <header className="w-full py-4 px-4 bg-background/80 backdrop-blur-md text-foreground">
      <nav className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <HeaderLinks />
        </div>

        <div className="flex items-center gap-x-2 flex-1 justify-end">
          {/* PC */}
          <div className="hidden lg:flex items-center gap-x-2">
            <LocaleSwitcher />
            <ThemeToggle />
            <UserAvatar />
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
