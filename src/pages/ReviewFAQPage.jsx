// Trang Hỏi đáp - Fixed Infinite Loop
import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaReply,
  FaPaperPlane,
  FaQuestionCircle,
  FaComments,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import {
  faqService,
  commentService,
  ratingService,
} from "../services/faqService";
import { Toast, useToast } from "../components/Toast";
import useAuthStore from "../store/authStore";
import socketService from "../services/socketService";

function ReviewFAQPage() {
  const { toast, showToast, hideToast } = useToast();
  const [activeTab, setActiveTab] = useState("faq"); // "faq" or "rating"
  const [openFAQs, setOpenFAQs] = useState(new Set());
  const [faqs, setFaqs] = useState([]);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [isLoadingRatings, setIsLoadingRatings] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isLoadingFAQs, setIsLoadingFAQs] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [newCommentIds, setNewCommentIds] = useState(new Set());
  const [newReplyIds, setNewReplyIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const [isDeletingRating, setIsDeletingRating] = useState(false);

  // Refs to track processed items and prevent duplicates
  const processedCommentIds = useRef(new Set());
  const processedReplyIds = useRef(new Set());
  const hasLoadedFAQs = useRef(false);
  const hasLoadedComments = useRef(false);

  // Helper functions (stable, no re-creation)
  const normalizeId = (obj) => {
    return String(obj?.id || obj?._id || "");
  };

  const getCurrentUserId = () => {
    return normalizeId(user);
  };

  // Load FAQs - ONLY ONCE
  useEffect(() => {
    if (hasLoadedFAQs.current) return; // Prevent reload

    const loadFAQs = async () => {
      try {
        setIsLoadingFAQs(true);
        const response = await faqService.getFAQs();
        const faqsData =
          response.data.data?.faqs ||
          response.data.faqs ||
          response.data.data ||
          response.data ||
          [];

        const mappedFAQs = Array.isArray(faqsData)
          ? faqsData.map((faq) => ({
              ...faq,
              id: faq._id || faq.id,
            }))
          : [];

        setFaqs(mappedFAQs);
        hasLoadedFAQs.current = true; // Mark as loaded
      } catch (error) {
        console.error("Error loading FAQs:", error);
        showToast(
          "Không thể tải danh sách câu hỏi thường gặp. Vui lòng thử lại sau.",
          "error"
        );
        setFaqs([]);
      } finally {
        setIsLoadingFAQs(false);
      }
    };

    loadFAQs();
  }, []); // Empty array - run once

  // Load ratings from API
  const loadRatings = useCallback(async (page = 1) => {
    setIsLoadingRatings(true);
    try {
      const response = await ratingService.getRatings(page, 50); // Load up to 50 ratings

      const ratingsData =
        response.data?.data?.ratings || response.data?.ratings || [];

      const mappedRatings = Array.isArray(ratingsData)
        ? ratingsData.map((rating) => ({
            ...rating,
            id: rating.id,
            user: rating.user,
            rating: rating.rating,
            comment: rating.comment,
            createdAt: rating.createdAt,
          }))
        : [];

      setRatings(mappedRatings);
    } catch (error) {
      console.error("Error loading ratings:", error);
      setRatings([]);
      // Toast will be shown by component if needed
    } finally {
      setIsLoadingRatings(false);
    }
  }, []);

  const submitRating = async () => {
    if (!isAuthenticated) {
      showToast("Vui lòng đăng nhập để đánh giá!", "warning");
      return;
    }

    if (newRating === 0) {
      showToast("Vui lòng chọn số sao!", "warning");
      return;
    }

    // Kiểm tra xem user đã đánh giá chưa
    const userAlreadyRated = ratings.some(
      (rating) => rating.userId === user?.id
    );
    if (userAlreadyRated) {
      showToast(
        "Bạn đã đánh giá rồi. Mỗi người chỉ được đánh giá một lần.",
        "warning"
      );
      return;
    }

    setIsSubmittingRating(true);
    try {
      const response = await ratingService.createRating({
        rating: newRating,
        comment: ratingText.trim() || null,
      });

      const newRatingData =
        response.data?.data?.rating || response.data?.rating;

      if (newRatingData) {
        // Refresh ratings from server để đảm bảo đồng bộ
        await loadRatings();

        setNewRating(0);
        setRatingText("");

        showToast("Cảm ơn bạn đã đánh giá!", "success");

        // Emit realtime event cho các user khác
        socketService.emit("FE_NEW_RATING", newRatingData);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      const errorMessage =
        error.response?.data?.error || "Có lỗi xảy ra, vui lòng thử lại!";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmittingRating(false);
    }
  };

  // Load comments với pagination (mỗi lần lấy 20 comment vào state)
  const loadComments = async (page = 1, append = false) => {
    try {
      setIsLoadingComments(true);
      const response = await commentService.getComments(page, 1000); // Load many comments
      const commentsData =
        response.data.data?.comments ||
        response.data.comments ||
        response.data.data ||
        response.data ||
        [];

      const pagination =
        response.data.data?.pagination || response.data.pagination || {};
      const total = pagination.total || 0;
      const skip = (page - 1) * 10;
      // Không cần hasMore vì load tất cả comments một lần
      // Không cần set totalComments vì không dùng cho nút xem thêm

      const mappedComments = Array.isArray(commentsData)
        ? commentsData.map((comment) => {
            const commentId = normalizeId(comment);
            processedCommentIds.current.add(commentId);

            const replies = (comment.replies || []).map((reply) => {
              const replyId = normalizeId(reply);
              processedReplyIds.current.add(replyId);
              return {
                ...reply,
                id: reply._id || reply.id,
                author:
                  reply.authorName ||
                  reply.author?.name ||
                  reply.author ||
                  "Người dùng",
                authorId: reply.author?._id || reply.authorId || null,
                date: reply.createdAt || reply.date,
              };
            });

            return {
              ...comment,
              id: comment._id || comment.id,
              author:
                comment.authorName ||
                comment.author?.name ||
                comment.author ||
                "Người dùng",
              authorId: comment.author?._id || comment.authorId || null,
              date: comment.createdAt || comment.date,
              replies: replies,
            };
          })
        : [];

      if (append) {
        // Append thêm comment mới phía dưới
        // Đồng thời áp dụng hiệu ứng highlight nhẹ cho các comment mới
        const appendedIds = [];

        setComments((prev) => {
          const existingIds = new Set(prev.map((c) => normalizeId(c)));
          const newComments = mappedComments.filter((c) => {
            const id = normalizeId(c);
            if (existingIds.has(id)) return false;
            appendedIds.push(id);
            return true;
          });

          const updated = [...prev, ...newComments];

          // Nếu số comments mới > visibleCount hiện tại, tăng visibleCount
          if (updated.length > visibleCount) {
            setVisibleCount(updated.length);
          }

          return updated;
        });

        if (appendedIds.length > 0) {
          setNewCommentIds((prev) => new Set([...prev, ...appendedIds]));
          setTimeout(() => {
            setNewCommentIds((prev) => {
              const next = new Set(prev);
              appendedIds.forEach((id) => next.delete(id));
              return next;
            });
          }, 1500);
        }
      } else {
        // Replace comments (initial load)
        setComments(mappedComments);
        // Hiển thị tối đa 5 comment đầu tiên, hoặc ít hơn nếu tổng < 5
        setVisibleCount(Math.min(5, mappedComments.length));
        hasLoadedComments.current = true;
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      showToast(
        "Không thể tải danh sách câu hỏi cộng đồng. Vui lòng thử lại sau.",
        "error"
      );
      if (!append) {
        setComments([]);
      }
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Load comments - ONLY ONCE on mount và chỉ khi đã đăng nhập
  useEffect(() => {
    if (hasLoadedComments.current || !isAuthenticated) return; // Prevent reload và chỉ load khi đã đăng nhập
    loadComments(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); // Chạy lại khi authentication thay đổi

  // Load ratings on component mount và chỉ khi đã đăng nhập
  useEffect(() => {
    if (!isAuthenticated) return; // Chỉ load khi đã đăng nhập
    loadRatings();
  }, [isAuthenticated]); // Chạy lại khi authentication thay đổi

  // Socket.io realtime connection for comments and ratings
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const socket = socketService.connect(token);
    const currentUserId = getCurrentUserId();

    const handleNewComment = (commentData) => {
      const newCommentId = normalizeId(commentData);

      // Check if already processed
      if (processedCommentIds.current.has(newCommentId)) {
        return;
      }

      const newComment = {
        ...commentData,
        id: commentData._id || commentData.id,
        author:
          commentData.authorName ||
          commentData.author?.name ||
          commentData.author ||
          "Người dùng",
        authorId:
          commentData.author?._id ||
          commentData.author ||
          commentData.authorId ||
          null,
        date:
          commentData.createdAt || commentData.date || new Date().toISOString(),
        replies: commentData.replies || [],
        question: commentData.question,
      };

      // Mark as processed
      processedCommentIds.current.add(newCommentId);

      // Add to state
      setComments((prev) => {
        const exists = prev.some((c) => normalizeId(c) === newCommentId);
        if (exists) {
          return prev;
        }
        const updated = [newComment, ...prev];

        // Nếu số comments mới > visibleCount hiện tại, tăng visibleCount
        if (updated.length > visibleCount) {
          setVisibleCount(updated.length);
        }

        return updated;
      });

      // Add animation highlight
      setNewCommentIds((prev) => new Set([...prev, newComment.id]));
      setTimeout(() => {
        setNewCommentIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(newComment.id);
          return newSet;
        });
      }, 5000);

      showToast("Có câu hỏi mới từ cộng đồng!", "info");
    };

    const handleNewReply = (replyData) => {
      const { commentId, reply } = replyData;

      const replyId = normalizeId(reply);

      const replyAuthorId = normalizeId({
        id: reply.authorId || reply.author?._id || reply.author,
      });

      // Check if already processed
      if (processedReplyIds.current.has(replyId)) {
        return;
      }

      // Skip own replies
      const isOwnReply =
        currentUserId && replyAuthorId && replyAuthorId === currentUserId;

      if (isOwnReply) {
        return;
      }

      // Mark as processed
      processedReplyIds.current.add(replyId);
      // Update state
      setComments((prev) => {
        const updated = prev.map((comment) => {
          const currentCommentId = normalizeId(comment);

          if (currentCommentId === String(commentId)) {
            // Check for duplicate reply
            const replyExists = comment.replies?.some(
              (r) => normalizeId(r) === replyId
            );

            if (replyExists) {
              return comment;
            }

            const mappedReply = {
              ...reply,
              id: reply._id || reply.id,
              author:
                reply.authorName ||
                reply.author?.name ||
                reply.author ||
                "Người dùng",
              authorId:
                reply.author?._id || reply.authorId || reply.author || null,
              date: reply.createdAt || reply.date,
              answer: reply.answer,
            };

            const updatedComment = {
              ...comment,
              replies: [...(comment.replies || []), mappedReply],
            };
            return updatedComment;
          }
          return comment;
        });
        return updated;
      });

      // Add animation highlight
      setNewReplyIds((prev) => new Set([...prev, reply.id || reply._id]));
      setTimeout(() => {
        setNewReplyIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(reply.id || reply._id);
          return newSet;
        });
      }, 5000);

      showToast("Có câu trả lời mới!", "info");
    };

    const handleNewRating = (ratingData) => {
      setRatings((prev) => {
        const exists = prev.some((rating) => rating.id === ratingData.id);
        if (exists) return prev;
        return [ratingData, ...prev];
      });
      showToast("Có đánh giá mới!", "info");
    };

    const handleDeleteCommentSocket = (deleteData) => {
      const { commentId } = deleteData;

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));

      showToast("Một bình luận đã được xóa!", "info");
    };

    const handleDeleteRatingSocket = (deleteData) => {
      const { ratingId } = deleteData;

      setRatings((prev) => {
        const exists = prev.some((rating) => rating.id === ratingId);
        if (exists) {
          return prev.filter((rating) => rating.id !== ratingId);
        }
        return prev;
      });

      showToast("Một đánh giá đã được xóa!", "info");
    };

    // Register socket listeners
    socket.on("BE_NEW_COMMENT", handleNewComment);
    socket.on("BE_NEW_REPLY", handleNewReply);
    socket.on("BE_NEW_RATING", handleNewRating);
    socket.on("BE_DELETE_COMMENT", handleDeleteCommentSocket);
    socket.on("BE_DELETE_RATING", handleDeleteRatingSocket);

    return () => {
      socket.off("BE_NEW_COMMENT", handleNewComment);
      socket.off("BE_NEW_REPLY", handleNewReply);
      socket.off("BE_NEW_RATING", handleNewRating);
      socket.off("BE_DELETE_COMMENT", handleDeleteCommentSocket);
      socket.off("BE_DELETE_RATING", handleDeleteRatingSocket);
    };
  }, [user]); // Only re-run when user changes

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

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    if (!isAuthenticated) {
      showToast("Vui lòng đăng nhập để đặt câu hỏi!", "warning");
      return;
    }

    try {
      const response = await commentService.createComment(newQuestion.trim());
      const commentData =
        response.data.data?.comment ||
        response.data.comment ||
        response.data.data ||
        response.data;

      const newComment = {
        ...commentData,
        id: commentData._id || commentData.id,
        author:
          commentData.authorName ||
          commentData.author?.name ||
          user?.name ||
          "Người dùng",
        authorId:
          commentData.author?._id || commentData.authorId || user?.id || null,
        date:
          commentData.createdAt || commentData.date || new Date().toISOString(),
        replies: [],
        question: commentData.question,
      };

      const newCommentId = normalizeId(newComment);
      processedCommentIds.current.add(newCommentId);

      setComments((prev) => {
        const exists = prev.some((c) => normalizeId(c) === newCommentId);
        if (exists) return prev;

        const updated = [newComment, ...prev];

        // Nếu số comments mới > visibleCount hiện tại, tăng visibleCount
        if (updated.length > visibleCount) {
          setVisibleCount(updated.length);
        }

        return updated;
      });

      // Emit socket event
      const socket = socketService.connect(localStorage.getItem("token"));
      socket.emit("FE_NEW_COMMENT", {
        ...newComment,
        id: newComment.id,
        author: newComment.author,
        authorId: newComment.authorId,
        date: newComment.date,
        replies: [],
        question: newComment.question,
      });

      setNewQuestion("");
      showToast("Đã gửi câu hỏi thành công!", "success");
    } catch (error) {
      console.error("Error creating comment:", error);
      showToast("Không thể gửi câu hỏi. Vui lòng thử lại sau.", "error");
    }
  };

  const handleDeleteComment = async (commentId) => {
    // Hiển thị modal xác nhận
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa bình luận này?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeletingComment(true);
    try {
      await commentService.deleteComment(commentId);

      // Remove comment from local state
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));

      showToast("Đã xóa bình luận thành công!", "success");

      // Emit realtime event
      socketService.emit("FE_DELETE_COMMENT", { commentId });
    } catch (error) {
      console.error("Error deleting comment:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Không thể xóa bình luận. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    } finally {
      setIsDeletingComment(false);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    // Hiển thị modal xác nhận
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?");

    if (!confirmed) {
      return;
    }

    setIsDeletingRating(true);
    try {
      await ratingService.deleteRating(ratingId);

      // Remove rating from local state
      setRatings((prev) => prev.filter((rating) => rating.id !== ratingId));

      showToast("Đã xóa đánh giá thành công!", "success");

      // Emit realtime event
      socketService.emit("FE_DELETE_RATING", { ratingId });
    } catch (error) {
      console.error("Error deleting rating:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Không thể xóa đánh giá. Vui lòng thử lại sau.";
      showToast(errorMessage, "error");
    } finally {
      setIsDeletingRating(false);
    }
  };

  const handleSubmitReply = async (commentId) => {
    if (!replyText.trim()) return;

    if (!isAuthenticated) {
      showToast("Vui lòng đăng nhập để trả lời!", "warning");
      return;
    }

    try {
      const response = await commentService.addReply(
        commentId,
        replyText.trim()
      );
      const commentData =
        response.data.data?.comment ||
        response.data.comment ||
        response.data.data ||
        response.data;

      const updatedComment = {
        ...commentData,
        id: commentData._id || commentData.id,
        author:
          commentData.authorName ||
          commentData.author?.name ||
          commentData.author ||
          "Người dùng",
        authorId: commentData.author?._id || commentData.authorId || null,
        date: commentData.createdAt || commentData.date,
        replies: (commentData.replies || []).map((reply) => ({
          ...reply,
          id: reply._id || reply.id,
          author:
            reply.authorName ||
            reply.author?.name ||
            reply.author ||
            "Người dùng",
          authorId: reply.author?._id || reply.authorId || null,
          date: reply.createdAt || reply.date,
        })),
      };

      const lastReply =
        updatedComment.replies[updatedComment.replies.length - 1];
      const lastReplyId = normalizeId(lastReply);
      processedReplyIds.current.add(lastReplyId);

      setComments((prev) =>
        prev.map((comment) =>
          normalizeId(comment) === String(commentId) ? updatedComment : comment
        )
      );

      // Emit socket event
      const socket = socketService.connect(localStorage.getItem("token"));
      socket.emit("FE_NEW_REPLY", {
        commentId: commentId,
        reply: {
          ...lastReply,
          id: lastReply.id,
          author: lastReply.author,
          authorId: lastReply.authorId || user?.id || null,
          date: lastReply.date,
          answer: lastReply.answer,
        },
      });

      setReplyText("");
      setReplyTo(null);
      showToast("Đã gửi câu trả lời thành công!", "success");
    } catch (error) {
      console.error("Error adding reply:", error);
      showToast("Không thể gửi câu trả lời. Vui lòng thử lại sau.", "error");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
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
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaComments className="w-8 h-8 text-amber-500" />
            Hỏi đáp & Đánh giá
          </h1>
          <p className="text-gray-600">
            Tìm câu trả lời cho các câu hỏi thường gặp và chia sẻ đánh giá của
            bạn
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 relative">
              <button
                onClick={() => setActiveTab("faq")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 relative ${
                  activeTab === "faq"
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaQuestionCircle className="w-4 h-4 inline mr-2" />
                Hỏi đáp
              </button>
              <button
                onClick={() => setActiveTab("rating")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 relative ${
                  activeTab === "rating"
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaStar className="w-4 h-4 inline mr-2" />
                Đánh giá
                {ratings.length > 0 && (
                  <span className="ml-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                    {ratings.length}
                  </span>
                )}
              </button>

              {/* Animated indicator */}
              <div
                className={`absolute bottom-0 h-0.5 bg-amber-500 transition-all duration-300 ease-in-out ${
                  activeTab === "faq" ? "left-0 w-20" : "left-32 w-20"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "faq" ? (
          <>
            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              {isLoadingFAQs ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Đang tải câu hỏi thường gặp...</p>
                </div>
              ) : faqs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Chưa có câu hỏi thường gặp nào.</p>
                </div>
              ) : (
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
                            isOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
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
              )}
            </div>

            {/* Community Q&A Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FaComments className="w-6 h-6 text-blue-500" />
                  Hỏi đáp cộng đồng
                </h2>
                <p className="text-gray-600">
                  Đặt câu hỏi và nhận câu trả lời từ cộng đồng
                </p>
              </div>

              {/* Question Form */}
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

              {/* Comments List */}
              {isLoadingComments ? (
                <div className="text-center py-12 text-gray-500">
                  <p>Đang tải câu hỏi cộng đồng...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {comments.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <FaUser className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>
                        Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!
                      </p>
                    </div>
                  ) : (
                    <>
                      {comments.slice(0, visibleCount).map((comment) => (
                        <div
                          key={
                            comment.id ||
                            comment._id ||
                            `comment-${Math.random()}`
                          }
                          className={`border border-gray-200 rounded-lg p-5 bg-gray-50 transition-all duration-500 ${
                            newCommentIds.has(comment.id)
                              ? "ring-2 ring-amber-400 bg-amber-50 shadow-lg animate-drop-in"
                              : "hover:shadow-md"
                          }`}
                        >
                          {/* Question */}
                          <div className="mb-4">
                            <div className="flex items-start space-x-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                                <FaUser className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-gray-900">
                                    {comment.author}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">
                                      {formatDate(comment.date)}
                                    </span>
                                    {/* Nút xóa nếu user là tác giả */}
                                    {isAuthenticated &&
                                      comment.authorId === user?.id && (
                                        <button
                                          onClick={() =>
                                            handleDeleteComment(comment.id)
                                          }
                                          disabled={isDeletingComment}
                                          className="text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                          title="Xóa bình luận"
                                        >
                                          <FaTrash className="w-3 h-3" />
                                        </button>
                                      )}
                                  </div>
                                </div>
                                <p className="text-gray-800 font-medium">
                                  {comment.question}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-14 space-y-4 border-l-2 border-amber-200 pl-4">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id || `reply-${Math.random()}`}
                                  className={`flex items-start space-x-3 transition-all duration-500 ${
                                    newReplyIds.has(reply.id)
                                      ? "bg-amber-50 rounded-lg p-3 -ml-2 ring-2 ring-amber-300 animate-pulse"
                                      : ""
                                  }`}
                                >
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

                          {/* Reply Form */}
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
                      ))}

                      {/* Nút Xem thêm - chỉ hiển thị khi có nhiều hơn 5 comments */}
                      {comments.length > 5 &&
                        visibleCount < comments.length && (
                          <div className="text-center pt-4">
                            <button
                              onClick={() => {
                                // Tăng thêm 5 comments để hiển thị
                                const nextVisible = Math.min(
                                  visibleCount + 5,
                                  comments.length
                                );
                                setVisibleCount(nextVisible);
                              }}
                              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all font-medium flex items-center space-x-2 mx-auto cursor-pointer"
                            >
                              <span>
                                {`Xem thêm (${Math.max(
                                  0,
                                  comments.length - visibleCount
                                )} câu hỏi còn lại)`}
                              </span>
                            </button>
                          </div>
                        )}
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Rating Section */}
            <div className="mt-12 space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                  <FaStar className="w-6 h-6 text-yellow-500" />
                  Đánh giá của bạn
                </h2>
                <p className="text-gray-600">
                  Chia sẻ trải nghiệm và đánh giá của bạn về trang web
                </p>
              </div>

              {/* Submit Rating Form */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Chia sẻ đánh giá của bạn
                </h3>

                <div className="space-y-4">
                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đánh giá (1-5 sao)
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`w-8 h-8 transition-colors ${
                            star <= newRating
                              ? "text-yellow-400"
                              : "text-gray-300 hover:text-yellow-400"
                          }`}
                        >
                          <FaStar className="w-full h-full" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhận xét (không bắt buộc)
                    </label>
                    <textarea
                      value={ratingText}
                      onChange={(e) => setRatingText(e.target.value)}
                      placeholder="Chia sẻ trải nghiệm của bạn..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={submitRating}
                    disabled={isSubmittingRating}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 px-6 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingRating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-4 h-4" />
                        <span>Gửi đánh giá</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Ratings List */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Các đánh giá ({ratings.length})
                </h3>

                {isLoadingRatings ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Đang tải đánh giá...</p>
                  </div>
                ) : ratings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaStar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p>Chưa có đánh giá nào.</p>
                    <p className="text-sm mt-2">
                      Hãy là người đầu tiên đánh giá!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ratings.map((rating) => (
                      <div
                        key={rating.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {rating.user.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {rating.user}
                              </p>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= rating.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {new Date(rating.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                            {/* Nút xóa nếu user là tác giả */}
                            {isAuthenticated && rating.userId === user?.id && (
                              <button
                                onClick={() => handleDeleteRating(rating.id)}
                                disabled={isDeletingRating}
                                className="text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Xóa đánh giá"
                              >
                                <FaTrash className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>

                        {rating.comment && (
                          <p className="text-gray-700 mt-2">{rating.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewFAQPage;
