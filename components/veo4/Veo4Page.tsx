import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import { VeoBG } from "@/components/shared/EnhancedBGs";
import { Veo4Generator } from "./Veo4Generator";
import Veo4FeatureShowcase from "./Veo4FeatureShowcase";

export default function Veo4PageContent() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <VeoBG />
      
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
        <section className="relative py-20 bg-transparent">        
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🎬 Ready to Create More?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of creators who are already using Veo 4 to bring their ideas to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#top">
              <Button className="highlight-button px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                🚀 Generate Another Video
              </Button>
            </Link>
            <Link href="/blogs">
              <Button variant="outline" className="border-2 border-border text-foreground hover:bg-muted px-6 py-3 rounded-full">
                <Info className="h-5 w-5 mr-2" />
                Read Our Blog
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center text-muted-foreground text-sm mt-8">
            <div className="flex -space-x-1 mr-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary/60 to-accent/60 rounded-full border-2 border-border" />
              <div className="w-8 h-8 bg-gradient-to-r from-accent/60 to-destructive/60 rounded-full border-2 border-border" />
              <div className="w-8 h-8 bg-gradient-to-r from-chart-1/60 to-primary/60 rounded-full border-2 border-border" />
            </div>
            1M+ videos created with Veo 4
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}