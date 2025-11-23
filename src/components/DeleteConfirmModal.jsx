// Modal xác nhận xóa tin tuyển dụng
function DeleteConfirmModal({ isOpen, onClose, onConfirm, job }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Xác nhận xóa</h2>
        <p className="text-gray-700 mb-2">
          Bạn có chắc chắn muốn xóa tin tuyển dụng:
        </p>
        <p className="text-lg font-semibold text-purple-600 mb-6">
          "{job.title}"
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;


