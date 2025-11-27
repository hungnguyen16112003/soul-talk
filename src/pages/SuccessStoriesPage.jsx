// Trang câu chuyện thành công
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successStories as initialStories } from "../data/mockData";
import { Toast, useToast } from "../components/Toast";
import { FaTimes, FaPen, FaTrash } from "react-icons/fa";
import useAuthStore from "../store/authStore";

function SuccessStoriesPage() {
  const { toast, showToast, hideToast } = useToast();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [stories, setStories] = useState(initialStories);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Hàm lấy emoji mặc định từ avatar của user
  const getDefaultEmoji = () => {
    // Nếu user có avatar là emoji, dùng nó
    if (user?.avatar && !user.avatar.startsWith("data:") && !user.avatar.startsWith("http")) {
      return user.avatar;
    }
    // Nếu không, dùng emoji mặc định
    return "👤";
  };

  const [newStory, setNewStory] = useState({
    name: user?.name || "",
    title: "",
    story: "",
    image: getDefaultEmoji(),
  });

  const handleCardClick = (story) => {
    navigate(`/success-stories/${story.id}`);
  };

  const handleOpenShareModal = () => {
    setIsShareModalOpen(true);
  };

  const handleShareStory = (e) => {
    e.preventDefault();
    if (!newStory.name || !newStory.title || !newStory.story) {
      showToast("Vui lòng điền đầy đủ thông tin!", "warning");
      return;
    }

    const story = {
      id: Date.now(),
      userId: user?.id || `user-${Date.now()}`,
      ...newStory,
      date: new Date().toISOString().split("T")[0],
    };

    setStories([story, ...stories]);
    setNewStory({
      name: user?.name || "",
      title: "",
      story: "",
      image: getDefaultEmoji(),
    });
    setIsShareModalOpen(false);
    showToast("Cảm ơn bạn đã chia sẻ câu chuyện của mình! Câu chuyện sẽ được duyệt trước khi hiển thị.", "success");
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setNewStory({
      name: user?.name || "",
      title: "",
      story: "",
      image: getDefaultEmoji(),
    });
  };

  const handleDeleteClick = (story, e) => {
    e.stopPropagation();
    setStoryToDelete(story);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (storyToDelete) {
      setStories(stories.filter((s) => s.id !== storyToDelete.id));
      setIsDeleteModalOpen(false);
      setStoryToDelete(null);
      showToast("Đã xóa câu chuyện thành công!", "success");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setStoryToDelete(null);
  };

  const emojiOptions = ["👤", "👨‍💻", "👩‍💼", "👨‍🎨", "👩‍🏫", "👨‍⚕️", "👩‍💻", "🌟"];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🌟 Câu chuyện thành công
            </h1>
            <p className="text-gray-600">
              Những câu chuyện truyền cảm hứng từ cộng đồng
            </p>
          </div>
          <button
            onClick={handleOpenShareModal}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto"
          >
            <FaPen className="w-4 h-4" />
            <span>Chia sẻ câu chuyện</span>
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story) => {
            const isOwner = user && story.userId === user.id;
            return (
              <div
                key={story.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full relative"
              >
                {isOwner && (
                  <button
                    onClick={(e) => handleDeleteClick(story, e)}
                    className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                    title="Xóa câu chuyện"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                )}
                <div 
                  onClick={() => handleCardClick(story)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl flex-shrink-0">{story.image}</div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-purple-600 transition-colors">
                        {story.name}
                      </h2>
                      <h3 className="text-lg font-medium text-purple-600 mb-2 line-clamp-2 hover:text-purple-700 transition-colors">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-4 flex-grow">
                    {story.story}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal chia sẻ câu chuyện */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FaPen className="w-5 h-5 text-purple-600" />
                Chia sẻ câu chuyện của bạn
              </h2>
              <button
                onClick={closeShareModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleShareStory} className="px-6 py-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên của bạn *
                  </label>
                  <input
                    type="text"
                    value={newStory.name}
                    onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Nhập tên của bạn"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu đề câu chuyện *
                  </label>
                  <input
                    type="text"
                    value={newStory.title}
                    onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="VD: Từ người khuyết tật đến lập trình viên thành công"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn emoji đại diện
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setNewStory({ ...newStory, image: emoji })}
                        className={`text-4xl p-3 rounded-lg border-2 transition-all cursor-pointer ${
                          newStory.image === emoji
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung câu chuyện *
                  </label>
                  <textarea
                    value={newStory.story}
                    onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
                    rows="8"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Chia sẻ câu chuyện thành công của bạn..."
                    required
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeShareModal}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-all font-medium cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer"
                >
                  Chia sẻ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && storyToDelete && (
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
                Bạn có chắc chắn muốn xóa câu chuyện <strong>"{storyToDelete.title}"</strong> không?
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

export default SuccessStoriesPage;

