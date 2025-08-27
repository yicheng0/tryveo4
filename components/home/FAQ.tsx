"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const t = useTranslations("Landing.FAQ");
  const faqItems: FAQItem[] = t.raw("items");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-bgMain">
      <div className="max-w-4xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-textMain">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-textSubtle max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-bgCard rounded-lg border border-gray-200 dark:border-borderSubtle shadow-sm"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-bgCard/50 transition-colors duration-200 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-textMain">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <IoChevronUp className="h-5 w-5 text-gray-500 dark:text-textSubtle flex-shrink-0" />
                ) : (
                  <IoChevronDown className="h-5 w-5 text-gray-500 dark:text-textSubtle flex-shrink-0" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 dark:border-borderSubtle pt-4">
                    <p className="text-gray-600 dark:text-textSubtle leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}