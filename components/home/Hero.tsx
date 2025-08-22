import FeatureBadge from "@/components/shared/FeatureBadge";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { siteConfig } from "@/config/site";
import { MousePointerClick, Video, Wand2, Sparkles, Zap, Clock, Shield, Palette, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SiDiscord } from "react-icons/si";

export default function Hero() {
  const t = useTranslations("Landing.Hero");

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 py-16 lg:py-24 2xl:py-40 items-center justify-between">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-6">
            <FeatureBadge
              label={t("badge.label")}
              text={t("badge.text")}
              href={t("badge.href")}
            />
            <div className="flex gap-4 flex-col max-w-2xl">
               <h1 className="text-3xl font-bold text-foreground md:text-5xl leading-tight">
                 {t("title")}
               </h1>

               <p className="mt-6 text-base leading-8 text-muted-foreground">
                 {t("description")}
               </p>
             </div>
            <div className="mt-8 flex flex-row gap-3">
              <RainbowButton>
                <Link
                  href={t("getStartedLink") || "#"}
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition duration-500 hover:scale-95 hover:opacity-85"
                >
                  <MousePointerClick className="w-4 h-4" />
                  {t("getStarted")}
                </Link>
              </RainbowButton>
              <Button
                className="h-11 rounded-xl px-8 py-2 bg-background text-primary hover:text-primary/80 border-2 border-primary/20 hover:border-primary/40"
                variant="outline"
                asChild
              >
                <Link
                  href={t("viewDemosLink") || "#examples"}
                  className="flex items-center gap-2"
                >
                  {t("viewDemos")}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Video */}
           <div className="flex-1 flex justify-center items-center">
             <div className="relative w-full max-w-2xl">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30 border border-primary/10">
                 <div className="aspect-video w-full flex items-center justify-center backdrop-blur-sm">
                   <div className="text-foreground text-center p-8">
                     <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                       <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <h3 className="text-lg font-semibold mb-2 text-foreground">AI Video Generation</h3>
                     <p className="text-sm text-muted-foreground">Watch your ideas come to life</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Features Grid Section */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-foreground md:text-4xl mb-4">
              Veo 4 AI Video Generator Features
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
            {/* First Row - Feature Cards 1-4 */}
            {/* Feature Card 1 */}
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm transition duration-500 hover:border-primary/20 hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Advanced Scene Understanding
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Veo 4's enhanced AI comprehends complex narratives, character interactions, and environmental context for truly immersive storytelling.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm transition duration-500 hover:border-primary/20 hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Wand2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Multi-Modal Creative Input
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Transform sketches, photos, or detailed descriptions into dynamic videos with Veo 4's versatile input processing capabilities.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm transition duration-500 hover:border-primary/20 hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cinematic Quality Rendering
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Experience Hollywood-level production quality with Veo 4's advanced rendering engine, delivering 4K resolution and film-grade aesthetics.
                </p>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm transition duration-500 hover:border-primary/20 hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Intelligent Motion Dynamics
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Veo 4 generates natural physics-based movements, realistic lighting changes, and seamless camera transitions for professional results.
                </p>
              </div>
            </div>

            {/* Second Row - Feature Cards 5-8 */}
            {/* Feature Card 5 */}
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm transition duration-500 hover:border-primary/20 hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Lightning-Fast Generation
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Veo 4's optimized processing pipeline delivers professional videos in minutes, not hours, with real-time preview capabilities.
                </p>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm transition duration-500 hover:border-primary/20 hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Enterprise-Grade Security
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Built with robust data protection, content moderation, and privacy controls to ensure safe and compliant video generation.
                </p>
              </div>
            </div>

            {/* Feature Card 7 */}
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm transition duration-500 hover:border-primary/20 hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Palette className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Customizable Style Engine
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Fine-tune visual aesthetics with Veo 4's advanced style controls, from photorealistic to artistic, animation to documentary styles.
                </p>
              </div>
            </div>

            {/* Feature Card 8 */}
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 p-6 shadow-sm transition duration-500 hover:border-primary/20 hover:shadow-md">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Global Content Adaptation
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Create culturally-aware content with Veo 4's international localization features and multi-language video generation capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
