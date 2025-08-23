"use client";

import ImageToImageDemo from "@/components/veo4/ImageToImageDemo";
import ImageToVideoDemo from "@/components/veo4/ImageToVideoDemo";
import MultiTurnChatDemo from "@/components/veo4/MultiTurnChatDemo";
import SingleTurnChatDemo from "@/components/veo4/SingleTurnChatDemo";
import TextToImageDemo from "@/components/veo4/TextToImageDemo";
import { cn } from "@/lib/utils";
import {
  Film
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  {
    id: "image-to-video",
    name: "Text/Image to Video",
    icon: Film,
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    borderColor: "border-rose-200 dark:border-rose-800",
  },
];

export default function Veo4Demo() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const item of navItems) {
        const section = sectionRefs.current[item.id];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      window.scrollTo({
        top: section.offsetTop + 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>
      
      <div className="w-fit sticky top-20 z-30 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl mb-12 mx-4">
        <div className="flex flex-nowrap overflow-x-auto gap-2 py-3 px-4 hide-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 transform hover:scale-105",
                activeSection === item.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {navItems.map((item) => (
          <section
            key={item.id}
            id={item.id}
            ref={(el) => {
              sectionRefs.current[item.id] = el;
              return undefined;
            }}
            className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl w-full backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02]"
          >
            <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20">
              <div className="w-full">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                      {item.name}
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                      {getDescriptionForSection(item.id)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm p-6 sm:p-8">
              <div className="w-full">
                <DemoComponent id={item.id} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function getDescriptionForSection(id: string): string {
  switch (id) {
    case "single-chat":
      return "Ask questions and get instant AI responses";
    case "multi-chat":
      return "Have extended conversations with context memory";
    case "text-to-image":
      return "Generate stunning images from text descriptions";
    case "image-analysis":
      return "Extract insights and information from images";
    case "image-to-image":
      return "Transform images with artistic styles and effects";
    case "image-to-video":
      return "Transform static images into dynamic, high-quality 1080p videos with Veo 4's advanced scene understanding and integrated audio generation";
    case "text-to-video":
      return "Create professional videos directly from text descriptions with Veo 4's cutting-edge AI technology";
    default:
      return "";
  }
}

function DemoComponent({ id }: { id: string }) {
  switch (id) {
    case "single-chat":
      return <SingleTurnChatDemo />;
    case "multi-chat":
      return <MultiTurnChatDemo />;
    case "text-to-image":
      return <TextToImageDemo />;
    case "image-to-image":
      return <ImageToImageDemo />;
    case "image-to-video":
      return <ImageToVideoDemo />;
    default:
      return null;
  }
}
