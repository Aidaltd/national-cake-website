"use client";
import { faqdata } from "@/lib/nationalcakeData";
import { CheckCircle, Plus } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";

export const Faq = () => {
  // Using null instead of an index to indicate no FAQ is open initially
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Toggle function to open/close FAQs
  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      // If clicking on the currently open FAQ, close it
      setOpenIndex(null);
    } else {
      // Otherwise, open the clicked FAQ
      setOpenIndex(index);
    }
  };

  return (
    <section className="w-full py-24 mb-28 px-4 md:px-10 lg:px-20" id="faq">
      <div className="mx-auto">
        {/* FAQ Header */}
        <div className="mb-20 flex flex-col items-start gap-8">
          <span className="tag">
            Frequently asked questions
          </span>
          <div className="flex flex-col items-start gap-4">
            <h2 className="font-semibold section-title">
              Do you have Questions? <br /> Don&apos;t worry we have answers!
            </h2>
            <p className="md:text-sm text-xs md:max-w-2xl w-full text-gray-600">
              Here are some of the most frequently asked questions we get,along with some answers to help you get started. If you can't find what you're looking for here, feel free to reach out to us!             
            </p>
          </div>
        </div>
        {/* Questions */}
        <motion.div layout className="max-w-4xl mx-auto mt-12 flex flex-col gap-6">
          {faqdata.filter((_, idx) => showAll || idx < 6).map((faq, faqIndex) => (
            <div
              key={faq.id}
              className="bg-custom-primary/5 rounded-2xl border border-custom-primary/20 p-6"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(faqIndex)}
              >
                <h3 className="font-medium text-custom-primary">{faq.question}</h3>
                <Plus
                  size={24}
                  className={twMerge(
                    "text-custom-primary flex-shrink-0 transition duration-300",
                    openIndex === faqIndex && "rotate-45"
                  )}
                />
              </div>
              <AnimatePresence>
                {openIndex === faqIndex && (
                  <motion.div
                    initial={{
                      height: 0,
                      marginTop: 0,
                    }}
                    animate={{
                      height: "auto",
                      marginTop: 24,
                    }}
                    exit={{
                      height: 0,
                      marginTop: 0,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-black/90 font-light">{faq.answer}</p>
                    {faq.list && (
                      <ul className="mt-4 space-y-2">
                        {faq.list.map((item, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <CheckCircle size={18} className="text-custom-primary" />
                            <span className="text-gray-500">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {faqdata.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-4 py-2 border border-custom-primary text-custom-primary rounded-lg hover:bg-custom-primary hover:text-white transition"
              >
                {showAll ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
