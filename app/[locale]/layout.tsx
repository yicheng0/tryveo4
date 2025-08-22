import GoogleAdsense from "@/app/GoogleAdsense";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import PlausibleAnalytics from "@/app/PlausibleAnalytics";
import ToltScript from "@/app/ToltScript";
import GoogleOneTap from "@/components/auth/GoogleOneTap";
import { LanguageDetectionAlert } from "@/components/LanguageDetectionAlert";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, Locale, routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { notFound } from "next/navigation";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return constructMetadata({
    page: "Home",
    title: "Free Veo 4 AI Video Generator – Try Online Veo 4 Free at tryveo3.com",
    description: t("description"),
    locale: locale as Locale,
    path: `/`,
  });
}

export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale || DEFAULT_LOCALE} suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <ToltScript />
          </>
        )}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background flex flex-col dark",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme={siteConfig.defaultNextTheme}
              enableSystem
            >
              {messages.LanguageDetection && <LanguageDetectionAlert />}

              {/* {messages.Header && <Header />} */}

              {/* <main className="flex-1 flex flex-col items-center"> */}
              {children}
              {/* </main> */}

              {/* {messages.Footer && <Footer />} */}
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
        <GoogleOneTap />
        <Toaster />
        <TailwindIndicator />
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <Analytics />
            <GoogleAnalytics />
            <GoogleAdsense />
            <PlausibleAnalytics />
          </>
        )}
      </body>
    </html>
  );
}
