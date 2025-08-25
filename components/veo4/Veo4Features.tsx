"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Sparkles, 
  Zap, 
  Video, 
  Image as ImageIcon,
  Palette,
  BookOpen,
  Megaphone,
  Camera,
  ArrowRight,
  Star
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Advanced Video Generation",
    description: "Create stunning 1080p videos from text descriptions with Veo 4's cutting-edge AI technology. Generate professional-quality content in minutes, not hours.",
    icon: Video,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    actionText: "Start Creating"
  },
  {
    title: "Image-to-Video Animation",
    description: "Transform static images into dynamic, engaging videos. Upload any image and watch as Veo 4 brings it to life with realistic motion and smooth transitions.",
    icon: ImageIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    actionText: "Try Animation"
  },
  {
    title: "Scene Understanding",
    description: "Veo 4's advanced scene understanding ensures realistic physics, lighting, and object interactions in every generated video.",
    icon: Sparkles,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    actionText: "Explore Scenes"
  },
  {
    title: "Integrated Audio Generation",
    description: "Generate synchronized audio that perfectly complements your video content. From ambient sounds to dynamic soundtracks.",
    icon: Zap,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    actionText: "Add Audio"
  },
  {
    title: "Creative Control",
    description: "Fine-tune every aspect of your video with advanced prompting and style controls. Achieve your exact creative vision.",
    icon: Palette,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    actionText: "Customize"
  }
];

const steps = [
  {
    number: "01",
    title: "Describe Your Vision",
    description: "Write a detailed prompt describing the video you want to create, or upload an image to animate."
  },
  {
    number: "02", 
    title: "Choose Your Settings",
    description: "Select duration, style preferences, and any additional parameters to customize your video."
  },
  {
    number: "03",
    title: "Generate & Download",
    description: "Let Veo 4 work its magic and download your professional-quality video in minutes."
  }
];

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

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    content: "Veo 4 has completely transformed my content creation workflow. What used to take days now takes minutes.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Marketing Director", 
    content: "The quality and speed of video generation is incredible. It's revolutionized how we approach video marketing.",
    rating: 5
  },
  {
    name: "Dr. Emily Watson",
    role: "Educator",
    content: "My students are more engaged than ever with the interactive video content I can now create effortlessly.",
    rating: 5
  }
];

function Veo4Features() {
  return (
    <div className="min-h-screen bg-bgMain">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bgMain">
        <div className="relative max-w-7xl mx-auto px-6 md:px-20 py-24">
          <div className="text-center">
            <Badge className="mb-8 bg-primaryBlue text-textMain font-medium px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by Veo 4
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-textMain">
              Explore the Power of{" "}
              <span className="text-primaryBlue">
                Veo 4 AI
              </span>
            </h1>
            <p className="text-lg text-textSubtle mb-8 max-w-3xl mx-auto">
              Free, Fast, and Feature-Rich video generation. Create professional-quality videos 
              from text or images in minutes with cutting-edge AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/veo4">
                <Button variant="primaryBlue" className="px-6 py-3 rounded-xl">
                  <Play className="h-5 w-5 mr-2" />
                  Start Creating Now
                </Button>
              </Link>
              <Button className="border border-borderSubtle bg-bgCard hover:bg-bgMain text-textSubtle hover:text-textMain font-medium px-6 py-3 rounded-xl transition duration-200">
                <Video className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-textMain">
              Revolutionary Features
            </h2>
            <p className="text-lg text-textSubtle max-w-2xl mx-auto">
              Discover what makes Veo 4 the most advanced AI video generation platform available today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group bg-bgCard border-borderSubtle hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex p-4 rounded-2xl bg-primaryBlue/10 mb-6">
                    <feature.icon className="h-8 w-8 text-primaryBlue" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-textMain">{feature.title}</h3>
                  <p className="text-textSubtle mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <Button variant="primaryBlue" className="px-6 py-3 rounded-xl group-hover:translate-x-1">
                    {feature.actionText}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional videos in just three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 highlight-bg rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Perfect for Every Creator
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re a content creator, marketer, educator, or filmmaker, 
              Veo 4 adapts to your unique needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center glass-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl mb-6">
                    <useCase.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {useCase.description}
                  </p>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by Creators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what professionals are saying about Veo 4.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 highlight-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Create Amazing Videos?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using Veo 4 to bring their ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/veo4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Play className="h-5 w-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              <Video className="h-5 w-5 mr-2" />
              View Examples
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(Veo4Features);