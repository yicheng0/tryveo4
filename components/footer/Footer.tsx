import { siteConfig } from "@/config/site";
import { Link as I18nLink } from "@/i18n/routing";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Company Section */}
          <div className="mb-8">
            <h3 className="text-foreground text-lg font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <I18nLink
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Terms of Use
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Privacy Policy
                </I18nLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border py-6">
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} {siteConfig.name} Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
