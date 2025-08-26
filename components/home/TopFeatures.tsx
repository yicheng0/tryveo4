"use client";

import { memo } from "react";
import { 
  Video, 
  Image as ImageIcon,
  Sparkles, 
  Zap, 
  Palette,
  ArrowRight
} from "lucide-react";

const features = [
  {
    title: "Advanced Video Generation",
    description: "Create stunning 1080p videos from text descriptions with Veo 4's cutting-edge AI technology. Generate professional-quality content in minutes, not hours.",
    icon: Video,
    actionText: "Start Creating"
  },
  {
    title: "Image-to-Video Animation",
    description: "Transform static images into dynamic, engaging videos. Upload any image and watch as Veo 4 brings it to life with realistic motion and smooth transitions.",
    icon: ImageIcon,
    actionText: "Try Animation"
  },
  {
    title: "Scene Understanding",
    description: "Veo 4's advanced scene understanding ensures realistic physics, lighting, and object interactions in every generated video.",
    icon: Sparkles,
    actionText: "Explore Scenes"
  },
  {
    title: "Integrated Audio Generation",
    description: "Generate synchronized audio that perfectly complements your video content. From ambient sounds to dynamic soundtracks.",
    icon: Zap,
    actionText: "Add Audio"
  },
  {
    title: "Creative Control",
    description: "Fine-tune every aspect of your video with advanced prompting and style controls. Achieve your exact creative vision.",
    icon: Palette,
    actionText: "Customize"
  }
];

function TopFeatures() {
  return (
    <section id="top-features" className="py-24 bg-bgMain">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-textMain">
            Top Features
          </h2>
          <p className="text-lg text-textSubtle max-w-2xl mx-auto">
            Discover what makes Veo 4 the most advanced AI video generation platform available today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-bgCard border border-borderSubtle rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex p-4 rounded-2xl bg-primaryBlue/10 mb-6">
                <feature.icon className="h-8 w-8 text-primaryBlue" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-textMain">{feature.title}</h3>
              <p className="text-base text-textSubtle mb-6 leading-relaxed">
                {feature.description}
              </p>
              <button className="bg-primaryBlue hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-medium shadow-md transition duration-200 inline-flex items-center gap-2 group-hover:translate-x-1">
                {feature.actionText}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(TopFeatures);