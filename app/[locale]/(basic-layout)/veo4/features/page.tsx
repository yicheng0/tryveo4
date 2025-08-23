import Veo4Features from "@/components/veo4/Veo4Features";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veo 4 Features - Advanced AI Video Generation Platform",
  description: "Explore the revolutionary features of Veo 4 AI. Create stunning videos from text or images with advanced scene understanding, integrated audio generation, and professional quality output.",
  keywords: "Veo 4, AI video generation, text to video, image to video, video creation, artificial intelligence",
  openGraph: {
    title: "Veo 4 Features - Advanced AI Video Generation Platform",
    description: "Explore the revolutionary features of Veo 4 AI. Create stunning videos from text or images with advanced scene understanding and integrated audio generation.",
    type: "website",
  },
};

export default function Veo4FeaturesPage() {
  return <Veo4Features />;
}