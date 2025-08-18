import FeatureBadge from "@/components/shared/FeatureBadge";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Star, StarHalf } from "lucide-react";
import { useTranslations } from "next-intl";

type TestimonialItem = {
  name: string;
  role: string;
  content: string;
  avatar: string;
};

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      <div className="text-yellow-400 flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="fill-current h-5 w-5" />
        ))}
        {hasHalfStar && <StarHalf className="fill-current h-5 w-5" />}
      </div>
      <span className="ml-2 text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function Testimonials() {
  const t = useTranslations("Landing.Testimonials");
  const testimonials: TestimonialItem[] = t.raw("items");

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FeatureBadge label={t("badge.label")} className="mb-8" />
          <h2 className="text-center z-10 text-2xl md:text-4xl font-sans font-semibold mb-4">
            <span className="bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Video Carousel Style Container */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl p-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={`${testimonial.name}-${index}`} className="min-h-[16rem]">
                  <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                      <div className="relative flex flex-1 flex-col justify-between gap-3">
                        {/* Rating stars - using 5 stars for all testimonials */}
                        <RatingStars rating={5.0} />
                        
                        {/* Quote content */}
                        <blockquote className="text-foreground leading-relaxed">
                          "{testimonial.content}"
                        </blockquote>
                        
                        {/* Author info */}
                        <div className="flex items-center mt-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-foreground">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative quote mark */}
                      <div className="absolute top-4 right-4 text-4xl text-gray-200 dark:text-gray-700 opacity-30">
                        "
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                10,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Videos Created
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                5,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Happy Creators
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                4.9/5
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
