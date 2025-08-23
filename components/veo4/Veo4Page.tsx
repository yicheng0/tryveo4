import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import { Veo4Generator } from "./Veo4Generator";
import Veo4FeatureShowcase from "./Veo4FeatureShowcase";

export default function Veo4PageContent() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative">
      {/* 全局背景层 - 线性渐变 + 径向渐变光圈 */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#121212] to-[#1a0f1a] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_50%)] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.06)_0%,transparent_40%)] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.06)_0%,transparent_40%)] pointer-events-none z-0"></div>
      
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎬 Ready to Create More?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of creators who are already using Veo 4 to bring their ideas to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#top">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                🚀 Generate Another Video
              </Button>
            </Link>
            <Link href="/blogs">
              <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full">
                <Info className="h-5 w-5 mr-2" />
                Read Our Blog
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center text-gray-400 text-sm mt-8">
            <div className="flex -space-x-1 mr-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white/20" />
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white/20" />
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white/20" />
            </div>
            1M+ videos created with Veo 4
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}