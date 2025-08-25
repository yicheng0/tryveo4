import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import { VeoBG } from "@/components/shared/EnhancedBGs";
import { Veo4Generator } from "./Veo4Generator";
import Veo4FeatureShowcase from "./Veo4FeatureShowcase";

export default function Veo4PageContent() {
  return (
    <div className="min-h-screen bg-bgMain text-textMain relative">
      
      <div className="relative z-10">
        {/* Main Generator Interface - Above the fold */}
        <section className="relative bg-transparent">
          <Veo4Generator />
        </section>

        {/* Features Showcase - Below the generator */}
        <section className="relative bg-transparent">
          <Veo4FeatureShowcase />
        </section>

        {/* Optional CTA Section */}
        <section className="relative py-24 bg-bgMain">        
          <div className="max-w-4xl mx-auto px-6 md:px-20 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-textMain mb-4 leading-tight">
            🎬 Ready to Create More?
          </h2>
          <p className="text-lg text-textSubtle max-w-2xl mx-auto mb-8">
            Join thousands of creators who are already using Veo 4 to bring their ideas to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#top">
              <Button variant="primaryBlue" size="lg" className="rounded-xl">
                🚀 Generate Another Video
              </Button>
            </Link>
            <Link href="/blogs">
              <Button className="border border-borderSubtle bg-bgCard hover:bg-bgMain text-textSubtle hover:text-textMain font-medium px-6 py-3 rounded-xl transition duration-200">
                <Info className="h-5 w-5 mr-2" />
                Read Our Blog
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center text-textSubtle text-sm mt-8">
            <div className="flex -space-x-1 mr-3">
              <div className="w-8 h-8 bg-primaryBlue rounded-full border-2 border-borderSubtle" />
              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-borderSubtle" />
              <div className="w-8 h-8 bg-blue-700 rounded-full border-2 border-borderSubtle" />
            </div>
            1M+ videos created with Veo 4
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}