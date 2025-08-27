import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import TopFeatures from "@/components/home/TopFeatures";
import UseCases from "@/components/home/UseCases";
import FAQ from "@/components/home/FAQ";
import { getMessages } from "next-intl/server";

export default async function HomeComponent() {
  const messages = await getMessages();

  return (
    <div className="w-full bg-background text-white">
      {messages.Landing.Hero && <Hero />}
      <HowItWorks />
      <TopFeatures />
      <UseCases />
      {messages.Landing.Testimonials && <Testimonials />}
      {messages.Landing.FAQ && <FAQ />}
    </div>
  );
}
