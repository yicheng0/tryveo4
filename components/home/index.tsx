import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/footer/Footer";
import { BG1 } from "@/components/shared/BGs";
import Veo4FeatureShowcase from "@/components/veo4/Veo4FeatureShowcase";
import { getMessages } from "next-intl/server";

export default async function HomeComponent() {
  const messages = await getMessages();

  return (
    <div className="w-full">
      <BG1 />

      {messages.Landing.Hero && <Hero />}

      <Veo4FeatureShowcase />

      {messages.Landing.Testimonials && <Testimonials />}
    </div>
  );
}
