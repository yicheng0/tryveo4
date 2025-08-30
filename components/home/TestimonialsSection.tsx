import Image from "next/image";
import { memo } from "react";

interface TestimonialData {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  testimonial: string;
}

const testimonialsData: TestimonialData[] = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Creative Director",
    company: "TechCorp Studios",
    avatar: "/avatars/sarah-chen.jpg",
    rating: 5,
    testimonial: 'Veo 4 has completely revolutionized our video production pipeline. The quality is indistinguishable from traditional filming, but we can create content in minutes instead of days.'
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    title: "Content Creator",
    company: "Digital Dreams Media",
    avatar: "/avatars/marcus-rodriguez.jpg",
    rating: 5,
    testimonial: 'As a solo creator, Veo 4 gives me the power of an entire production team. The AI understands context and emotion better than I ever imagined possible.'
  },
  {
    id: "3",
    name: "Elena Vasquez",
    title: "Marketing Lead",
    company: "InnovateCorp",
    avatar: "/avatars/elena-vasquez.jpg",
    rating: 4,
    testimonial: 'We\'ve increased our video output by 500% while maintaining premium quality. Veo 4 isn\'t just a tool – it\'s a creative partner that understands our brand vision.'
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-borderSubtle"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Individual testimonial card component
const TestimonialCard = ({ testimonial }: { testimonial: TestimonialData }) => {
  return (
    <div className="group relative h-full">
      {/* Dark themed card */}
      <div className="h-full bg-bgCard border border-borderSubtle rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* User info header */}
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar with initials */}
          <div className="w-12 h-12 rounded-full bg-primaryBlue flex items-center justify-center">
            <span className="text-textMain font-bold text-lg">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          
          {/* User details */}
          <div className="flex-1">
            <h4 className="text-textMain font-semibold text-base">
              {testimonial.name}
            </h4>
            <p className="text-sm text-textSubtle">
              {testimonial.title} • {testimonial.company}
            </p>
          </div>
        </div>

        {/* Star rating */}
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Testimonial text */}
        <blockquote className="text-textMain text-base leading-relaxed">
          '{testimonial.testimonial}'
        </blockquote>
      </div>
    </div>
  );
};

function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-bgMain">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-textMain mb-4 leading-tight">
            What People Are Saying
          </h2>
          <p className="text-lg text-textSubtle max-w-2xl mx-auto">
            Join thousands of creators loving Veo 4 and transforming their creative workflows
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primaryBlue mb-2">100k+</div>
              <div className="text-sm text-textSubtle">Happy Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primaryBlue mb-2">4.9/5</div>
              <div className="text-sm text-textSubtle">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primaryBlue mb-2">99.9%</div>
              <div className="text-sm text-textSubtle">Service Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);
