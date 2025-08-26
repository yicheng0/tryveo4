import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import { getMessages } from "next-intl/server";

export default async function HomeComponent() {
  const messages = await getMessages();

  return (
    <div className="w-full bg-background text-white">
      {messages.Landing.Hero && <Hero />}
      {messages.Landing.Testimonials && <Testimonials />}
    </div>
  );
}
