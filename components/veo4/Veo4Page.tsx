import Veo4FeatureShowcase from "./Veo4FeatureShowcase";
import { Veo4Generator } from "./Veo4Generator";

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
      </div>
    </div>
  );
}