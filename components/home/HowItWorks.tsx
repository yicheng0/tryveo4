"use client";

import { memo } from "react";

const steps = [
  {
    number: "01",
    title: "Describe Your Vision",
    description: "Write a detailed prompt describing the video you want to create with Veo 4 free, or upload an image to animate."
  },
  {
    number: "02", 
    title: "Choose Your Settings",
    description: "Select duration, style preferences, and parameters to customize your Veo 4 free video generation."
  },
  {
    number: "03",
    title: "Generate & Download",
    description: "Let Veo 4 free work its magic and download your professional-quality video in minutes."
  }
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-bgMain">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-textMain">
            How Veo 4 Free Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-textSubtle max-w-2xl mx-auto">
            Create professional videos with Veo 4 free in just three simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-primaryBlue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primaryBlue/30" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-textMain">{step.title}</h3>
              <p className="text-base text-gray-600 dark:text-textSubtle leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(HowItWorks);