// Trang Review & Hỏi đáp
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { reviews as initialReviews, faqs } from "../data/mockData";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";

function ReviewFAQPage() {
  const { toast, showToast, hideToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    userName: "",
    jobTitle: "",
    rating: 5,
    comment: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [openFAQs, setOpenFAQs] = useState(new Set());
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleStarHover = (rating) => {
    setHoveredStar(rating);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment || !newReview.rating) {
      showToast("Vui lòng điền đầy đủ thông tin!", "warning");
      return;
    }

    const review = {
      id: Date.now(),
      userId: user?.id || `user-${Date.now()}`,
      ...newReview,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([review, ...reviews]);
    setNewReview({
      userName: "",
      jobTitle: "",
      rating: 5,
      comment: "",
    });
    showToast("Cảm ơn bạn đã đánh giá!", "success");
  };

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter((r) => r.id !== reviewToDelete.id));
      setIsDeleteModalOpen(false);
      setReviewToDelete(null);
      showToast("Đã xóa đánh giá thành công!", "success");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const renderStars = (rating, isInteractive = false, onStarClick = null) => {
    return Array.from({ length: 5 }, (_, i) => i + 1).map((starValue) => {
      const isFilled = isInteractive
        ? hoveredStar >= starValue || (!hoveredStar && newReview.rating >= starValue)
        : starValue <= rating;

      return (
        <button
          key={starValue}
          type="button"
          onClick={isInteractive && onStarClick ? () => onStarClick(starValue) : undefined}
          onMouseEnter={isInteractive ? () => setHoveredStar(starValue) : undefined}
          onMouseLeave={isInteractive ? () => setHoveredStar(0) : undefined}
          className={`${
            isInteractive ? "cursor-pointer" : "cursor-default"
          } text-2xl transition-colors`}
        >
          {isInteractive ? (
            // Phần form đánh giá: dùng FaRegStar cho sao chưa chọn (chỉ viền)
            isFilled ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-gray-600" />
            )
          ) : (
            // Phần danh sách: dùng FaStar như cũ (có fill màu vàng hoặc xám)
            <FaStar
              className={isFilled ? "text-yellow-400" : "text-gray-300"}
              style={{ fill: isFilled ? "currentColor" : "none" }}
            />
          )}
        </button>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            💬 Đánh giá & Hỏi đáp
          </h1>
          <p className="text-gray-600">
            Chia sẻ đánh giá của bạn và tìm câu trả lời cho các câu hỏi thường gặp
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 px-6 py-4 font-medium transition-colors cursor-pointer ${
                activeTab === "reviews"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Đánh giá
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex-1 px-6 py-4 font-medium transition-colors cursor-pointer ${
                activeTab === "faq"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Hỏi đáp
            </button>
          </div>

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="p-6">
              {/* Review Form */}
              <div className="bg-purple-50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Viết đánh giá của bạn
                </h2>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên của bạn *
                    </label>
                    <input
                      type="text"
                      value={newReview.userName}
                      onChange={(e) =>
                        setNewReview({ ...newReview, userName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Nhập tên của bạn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Công việc (tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={newReview.jobTitle}
                      onChange={(e) =>
                        setNewReview({ ...newReview, jobTitle: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      placeholder="VD: Lập trình viên Frontend"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đánh giá của bạn *
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {renderStars(newReview.rating, true, handleStarClick)}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {newReview.rating} / 5 sao
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bình luận *
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Chia sẻ trải nghiệm của bạn..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all cursor-pointer"
                  >
                    Gửi đánh giá
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => {
                  const isOwner = user && review.userId === user.id;
                  return (
                    <div
                      key={review.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 relative"
                    >
                      {isOwner && (
                        <button
                          onClick={() => handleDeleteClick(review)}
                          className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                          title="Xóa đánh giá"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
                      <div className="flex items-start justify-between mb-3 pr-8">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {review.userName}
                          </h3>
                          {review.jobTitle && (
                            <p className="text-sm text-gray-600">
                              {review.jobTitle}
                            </p>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="p-6">
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
          )}
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && reviewToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl animate-scale-in">
            <div className="px-6 py-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaTrash className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Xác nhận xóa</h3>
                  <p className="text-sm text-gray-600">Hành động này không thể hoàn tác</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Bạn có chắc chắn muốn xóa đánh giá của <strong>"{reviewToDelete.userName}"</strong> không?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-all font-medium cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all font-medium cursor-pointer"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewFAQPage;


