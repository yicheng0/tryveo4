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
    <section id="testimonials" className="py-24 bg-bgMain">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <FeatureBadge label={t("badge.label")} className="mb-8" />
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-textMain">
            {t("title")}
          </h2>
          <p className="text-lg text-textSubtle max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 relative">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="group bg-bgCard rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-borderSubtle"
              >
                <blockquote className="text-textMain leading-relaxed text-center mb-6 text-base">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primaryBlue flex items-center justify-center">
                    <span className="text-lg font-bold text-textMain">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-textMain text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-textSubtle">
                      {testimonial.role}
                    </p>
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