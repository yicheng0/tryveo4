"use client";

import { memo } from "react";
import { 
  Camera,
  Megaphone,
  BookOpen,
  Video,
  CheckCircle
} from "lucide-react";

const useCases = [
  {
    title: "Content Creators",
    description: "Create engaging video content for social media, YouTube, and other platforms with ease.",
    icon: Camera,
    benefits: ["Social media content", "YouTube videos", "Short-form content", "Brand storytelling"]
  },
  {
    title: "Marketing Teams", 
    description: "Produce professional marketing videos, product demos, and promotional content at scale.",
    icon: Megaphone,
    benefits: ["Product demonstrations", "Marketing campaigns", "Brand videos", "Promotional content"]
  },
  {
    title: "Educators",
    description: "Transform learning materials into engaging video content that captures student attention.",
    icon: BookOpen,
    benefits: ["Educational content", "Training materials", "Interactive lessons", "Visual explanations"]
  },
  {
    title: "Filmmakers",
    description: "Prototype scenes, create concept videos, and visualize ideas before full production.",
    icon: Video,
    benefits: ["Scene prototyping", "Concept visualization", "Storyboarding", "Pre-production"]
  }
];

function UseCases() {
  return (
    <section id="use-cases" className="py-24 bg-gray-50 dark:bg-bgMain">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-textMain">
            Use Cases
          </h2>
          <p className="text-lg text-gray-600 dark:text-textSubtle max-w-2xl mx-auto">
            Whether you're a content creator, marketer, educator, or filmmaker, 
            Veo 4 adapts to your unique needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="text-center bg-bgCard border border-borderSubtle rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex p-4 bg-primaryBlue/10 rounded-2xl mb-6">
                <useCase.icon className="h-8 w-8 text-primaryBlue" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-textMain">{useCase.title}</h3>
              <p className="text-base text-textSubtle mb-6 leading-relaxed">
                {useCase.description}
              </p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-textSubtle">
                    <CheckCircle className="h-4 w-4 text-primaryBlue mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(UseCases);