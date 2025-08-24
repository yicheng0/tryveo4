import { useTranslations } from "next-intl";
import FeatureBadge from "@/components/shared/FeatureBadge";

type TestimonialItem = {
  name: string;
  role: string;
  content: string;
  avatar: string;
};

export default function Testimonials() {
  const t = useTranslations("Landing.Testimonials");
  const testimonials: TestimonialItem[] = t.raw("items");

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FeatureBadge label={t("badge.label")} className="mb-8" />
          <h2 className="text-center z-10 text-2xl md:text-4xl font-serif font-semibold mb-4">
            <span className="bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 relative">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-primary/10 bg-background p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <blockquote className="text-foreground leading-relaxed text-center mb-6 text-sm">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center mb-3">
                      <span className="text-lg font-semibold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}