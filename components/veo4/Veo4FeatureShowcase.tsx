"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FeatureItem {
  title: string;
  description: string;
  videoUrl: string;
  buttonText: string;
}

const features: FeatureItem[] = [
  {
    title: "✨✨✨ High-Quality 1080p Video Output",
    description: "Experience stunning visual fidelity with Veo 4's advanced rendering engine. Generate crisp, professional-grade videos at full HD resolution with enhanced detail preservation and color accuracy that brings your creative vision to life.",
    videoUrl: "/videos/veo4_quality.mp4",
    buttonText: "Start Veo4 AI Video Now"
  },
  {
    title: "🎨🎨🎨 Text-to-Video Creation",
    description: "Transform your ideas into captivating videos with just a text prompt. Veo 4's scene understanding technology interprets your descriptions and creates dynamic, contextually-aware videos that match your creative intent perfectly.",
    videoUrl: "/videos/veo4_text_to_video.mp4",
    buttonText: "Try Text-to-Video"
  },
  {
    title: "🖼️🖼️🖼️ Image-to-Video Animation",
    description: "Bring static images to life with intelligent animation. Upload any image and describe the motion you want - Veo 4 will create smooth, natural animations while preserving the original image's style and composition.",
    videoUrl: "/videos/veo4_image_to_video.mp4",
    buttonText: "Animate Your Images"
  },
  {
    title: "🎵🎵🎵 Integrated Audio Generation",
    description: "Enhance your videos with synchronized audio that complements the visual content. Veo 4's integrated audio generation creates ambient sounds, effects, and background music that perfectly matches your video's mood and atmosphere.",
    videoUrl: "/videos/veo4_audio.mp4",
    buttonText: "Experience Audio Magic"
  }
];

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
      {/* Video Section */}
      <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative">
          <video
            className="rounded-xl shadow-md w-full"
            controls
            muted
            autoPlay
            loop
            playsInline
          >
            <source src={feature.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500/10 to-pink-500/10 pointer-events-none" />
        </div>
      </div>

      {/* Content Section */}
      <div className={`${isEven ? 'md:order-2' : 'md:order-1'} space-y-6`}>
        <h3 className="text-xl font-bold text-white leading-tight">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          {feature.description}
        </p>
        <Link href="/veo4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm px-4 py-2 transition-all duration-300 hover:scale-105">
            {feature.buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default function Veo4FeatureShowcase() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_40%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚀 Veo 4 Core Features
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover the revolutionary capabilities that make Veo 4 the most advanced AI video generation platform
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Create Amazing Videos?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using Veo 4 to bring their ideas to life
          </p>
          <Link href="/veo4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
              🎬 Start Creating Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}