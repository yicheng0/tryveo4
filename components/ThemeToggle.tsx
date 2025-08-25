"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="bg-gray-50 dark:bg-bgCard border-gray-300 dark:border-borderSubtle text-gray-900 dark:text-textMain hover:bg-gray-100 dark:hover:bg-bgMain">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const getThemeIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
    }
    if (resolvedTheme === "dark") {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    }
    return <Sun className="h-[1.2rem] w-[1.2rem]" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-gray-50 dark:bg-bgCard border-gray-300 dark:border-borderSubtle text-gray-900 dark:text-textMain hover:bg-gray-100 dark:hover:bg-bgMain transition-colors"
        >
          {getThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white dark:bg-bgCard border-gray-300 dark:border-borderSubtle text-gray-900 dark:text-textMain shadow-lg"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="hover:bg-gray-100 dark:hover:bg-bgMain cursor-pointer flex items-center gap-2"
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="hover:bg-gray-100 dark:hover:bg-bgMain cursor-pointer flex items-center gap-2"
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="hover:bg-gray-100 dark:hover:bg-bgMain cursor-pointer flex items-center gap-2"
        >
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
