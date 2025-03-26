import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar"; // Ensure the correct import path
import Footer from "./shared/Footer";

const faqs = [
  {
    question: "How can I apply for placements?",
    answer:
      "You can apply for placements through the official placement portal. Make sure to register and upload your resume.",
  },
  {
    question: "Who can I contact for placement-related queries?",
    answer:
      "You can reach out to the placement team members listed on our 'Meet the Team' page.",
  },
  {
    question: "What are the eligibility criteria for placements?",
    answer:
      "Eligibility varies by company, but most require a minimum CGPA and no backlogs.",
  },
  {
    question: "How do I prepare for placement interviews?",
    answer:
      "Focus on coding skills, aptitude tests, and communication skills. Attend mock interviews and practice common questions.",
  },
  {
    question: "When do placement drives usually start?",
    answer:
      "Placement drives typically begin in the final year, around August-September, but may vary depending on the company.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex flex-col items-center p-10">
        <h2 className="text-4xl font-bold text-[#FFD700] mb-8">
          Frequently Asked Questions
        </h2>

        <div className="w-full max-w-4xl space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 border border-gray-300 rounded-xl p-5 cursor-pointer shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-[#FFD700] text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <motion.p
                  className="mt-3 text-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
