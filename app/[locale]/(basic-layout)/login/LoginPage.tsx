"use client";

import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "@/i18n/routing";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  const t = useTranslations("Login");

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  if (user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-1 py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>

        <LoginForm className="w-[300px]" />
      </div>
    </div>
  );
}
