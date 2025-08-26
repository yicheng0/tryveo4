"use client";

import { Button } from "@/components/ui/button";
import { LazyVideo } from "@/components/ui/lazy-video";
import Link from "next/link";

interface FeatureItem {
  title: string;
  description: string;
  videoUrl: string;
  buttonText: string;
}

const features: FeatureItem[] = [
  {
    title: "High-Quality 1080p Video Output",
    description: "Experience stunning visual fidelity with Veo 4's advanced rendering engine. Generate crisp, professional-grade videos at full HD resolution with enhanced detail preservation and color accuracy that brings your creative vision to life.",
    videoUrl: "/videos/1.mp4",
    buttonText: "Start Veo4 AI Video Now"
  },
  {
    title: "Text-to-Video Creation",
    description: "Transform your ideas into captivating videos with just a text prompt. Veo 4's scene understanding technology interprets your descriptions and creates dynamic, contextually-aware videos that match your creative intent perfectly.",
    videoUrl: "/videos/2.mp4",
    buttonText: "Try Text-to-Video"
  },
  {
    title: "Image-to-Video Animation",
    description: "Bring static images to life with intelligent animation. Upload any image and describe the motion you want - Veo 4 will create smooth, natural animations while preserving the original image's style and composition.",
    videoUrl: "/videos/3.mp4",
    buttonText: "Animate Your Images"
  },
  {
    title: "Integrated Audio Generation",
    description: "Enhance your videos with synchronized audio that complements the visual content. Veo 4's integrated audio generation creates ambient sounds, effects, and background music that perfectly matches your video's mood and atmosphere.",
    videoUrl: "/videos/4.mp4",
    buttonText: "Experience Audio Magic"
  },
  {
    title: "Advanced Scene Understanding",
    description: "Veo 4's sophisticated AI comprehends complex scenes, ensuring realistic physics, lighting, and object interactions. Every generated video maintains natural consistency and believable motion dynamics for truly professional results.",
    videoUrl: "/videos/5.mp4",
    buttonText: "Explore Scene AI"
  }
];

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
      {/* Video Section */}
      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`} role="img" aria-label={`Demo video for ${feature.title}`}>
        <LazyVideo 
          src={feature.videoUrl} 
          autoPlay={true}
          loop={true}
          className="transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-primaryBlue/50 rounded-xl"
        />
      </div>

      {/* Content Section */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
        <h3 className="text-2xl font-bold text-textMain leading-tight">
          {feature.title}
        </h3>
        <p className="text-lg text-textSubtle leading-relaxed">
          {feature.description}
        </p>
        <Link href="/veo4">
          <Button variant="primaryBlue" className="px-6 py-3 rounded-xl">
            {feature.buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default function Veo4FeatureShowcase() {
  return (
    <section className="relative py-20 bg-bgMain">
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-textMain mb-6 leading-tight">
             Veo 4 Core Features
          </h2>
          <p className="text-lg md:text-xl text-textSubtle max-w-4xl mx-auto leading-relaxed">
            Discover the revolutionary capabilities that make Veo 4 the most advanced AI video generation platform. 
            Each feature is designed to unlock your creative potential with cutting-edge AI technology.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-24 lg:space-y-28">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
}