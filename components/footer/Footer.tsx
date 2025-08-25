import { siteConfig } from "@/config/site";
import { Link as I18nLink } from "@/i18n/routing";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-bgMain text-gray-700 dark:text-gray-300 px-6 py-12 !border-t-0 !shadow-none !ring-0" style={{ borderTop: '0 none', boxShadow: 'none' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
        
        {/* Left Side - Logo + Description */}
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-3">
            <Image src="/logo.png" className="w-7 h-7" alt="Logo" width={28} height={28} />
            <span className="font-semibold text-[18px] text-gray-900 dark:text-white">Try veo 4</span>
          </div>
          <p className="text-[13px] leading-6 text-gray-600 dark:text-gray-400">
            Generate cinematic AI videos with text prompts. No sign-up required. No limits.
            Powered by next-gen video models.
          </p>
        </div>

        {/* Right Side - About + Tools (紧贴最右侧) */}
        <div className="ml-auto grid grid-cols-2 gap-x-10 gap-y-2 text-[14px]">
          {/* About Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About</h3>
            <ul className="space-y-1">
              <li>
                <I18nLink href="/veo4/features" className="hover:text-blue-500 transition-colors">
                  Features
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/pricing" className="hover:text-blue-500 transition-colors">
                  Pricing
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/blogs" className="hover:text-blue-500 transition-colors">
                  Blogs
                </I18nLink>
              </li>
            </ul>
          </div>
          
          {/* Tools Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tools</h3>
            <ul className="space-y-1">
              <li>
                <I18nLink href="/veo4" className="hover:text-blue-500 transition-colors">
                  AI Video Generator
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/veo4" className="hover:text-blue-500 transition-colors">
                  Text to Video
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/veo4" className="hover:text-blue-500 transition-colors">
                  Image to Video
                </I18nLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section - 紧凑版权区 */}
      <div className="mt-8 pt-4 text-[13px] text-gray-500 dark:text-gray-500">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 gap-2">
          <span>© {new Date().getFullYear()} {siteConfig.name} Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <I18nLink href="/privacy-policy" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </I18nLink>
            <I18nLink href="/terms-of-service" className="hover:text-blue-500 transition-colors">
              Terms of Use
            </I18nLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
