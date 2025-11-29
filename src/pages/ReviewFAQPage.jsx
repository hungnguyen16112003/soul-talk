// Trang Hỏi đáp
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaUser, FaReply, FaPaperPlane } from "react-icons/fa";
import { faqs } from "../data/mockData";
import useAuthStore from "../store/authStore";

function ReviewFAQPage() {
  const [openFAQs, setOpenFAQs] = useState(new Set());
  const [comments, setComments] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem("faq-comments");
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (e) {
        console.error("Error loading comments:", e);
      }
    }
  }, []);

  // Save comments to localStorage
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("faq-comments", JSON.stringify(comments));
    }
  }, [comments]);

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

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const comment = {
      id: Date.now(),
      question: newQuestion.trim(),
      author: user?.name || "Người dùng",
      authorId: user?.id || null,
      date: new Date().toISOString(),
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewQuestion("");
  };

  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      answer: replyText.trim(),
      author: user?.name || "Người dùng",
      authorId: user?.id || null,
      date: new Date().toISOString(),
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );
    setReplyText("");
    setReplyTo(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ❓ Hỏi đáp
          </h1>
          <p className="text-gray-600">
            Tìm câu trả lời cho các câu hỏi thường gặp
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
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
                        <FaChevronUp className="w-3.5 h-3.5 text-amber-600" />
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

        {/* Phần bình luận/Hỏi đáp cộng đồng */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              💬 Hỏi đáp cộng đồng
            </h2>
            <p className="text-gray-600">
              Đặt câu hỏi và nhận câu trả lời từ cộng đồng
            </p>
          </div>

          {/* Form đặt câu hỏi */}
          <div className="mb-8">
            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div>
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Đặt câu hỏi của bạn
                </label>
                <textarea
                  id="question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all flex items-center space-x-2 font-medium"
              >
                <FaPaperPlane className="w-4 h-4" />
                <span>Gửi câu hỏi</span>
              </button>
            </form>
          </div>

          {/* Danh sách câu hỏi và câu trả lời */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FaUser className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition-shadow"
                >
                  {/* Câu hỏi */}
                  <div className="mb-4">
                    <div className="flex items-start space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                        <FaUser className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">
                            {comment.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.date)}
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium">
                          {comment.question}
                        </p>
                      </div>
        </div>
      </div>

                  {/* Câu trả lời */}
                  {comment.replies.length > 0 && (
                    <div className="ml-14 space-y-4 border-l-2 border-amber-200 pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <FaReply className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-900 text-sm">
                                {reply.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(reply.date)}
                              </span>
                </div>
                            <p className="text-gray-700 text-sm">
                              {reply.answer}
                            </p>
                </div>
              </div>
                      ))}
                    </div>
                  )}

                  {/* Form trả lời */}
                  {replyTo === comment.id ? (
                    <div className="mt-4 ml-14 space-y-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Nhập câu trả lời của bạn..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-sm"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          className="bg-amber-500 text-white px-4 py-1.5 rounded-lg hover:bg-amber-600 transition-all text-sm font-medium flex items-center space-x-1"
                        >
                          <FaPaperPlane className="w-3 h-3" />
                          <span>Gửi trả lời</span>
                        </button>
                <button
                          onClick={() => {
                            setReplyTo(null);
                            setReplyText("");
                          }}
                          className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-300 transition-all text-sm"
                >
                  Hủy
                </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyTo(comment.id)}
                      className="mt-3 ml-14 text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center space-x-1 transition-colors"
                    >
                      <FaReply className="w-3 h-3" />
                      <span>Trả lời</span>
                </button>
                  )}
                </div>
              ))
            )}
              </div>
            </div>
          </div>
    </div>
  );
}

export default ReviewFAQPage;


