// Trang Hỏi đáp
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { faqs } from "../data/mockData";

function ReviewFAQPage() {
  const [openFAQs, setOpenFAQs] = useState(new Set());

  const toggleFAQ = (faqId) => {
    setOpenFAQs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ❓ Hỏi đáp
          </h1>
          <p className="text-gray-600">
            Tìm câu trả lời cho các câu hỏi thường gặp
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFAQs.has(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4 flex-1">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <FaChevronUp className="w-3.5 h-3.5 text-purple-600" />
                      ) : (
                        <FaChevronDown className="w-3.5 h-3.5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewFAQPage;


