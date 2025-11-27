// Modal chọn miền cho người tìm việc
import { useState } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";

const regions = [
  { id: "mien-bac", name: "Miền Bắc", icon: "🏔️" },
  { id: "mien-trung", name: "Miền Trung", icon: "🌊" },
  { id: "mien-nam", name: "Miền Nam", icon: "🌴" },
];

function RegionSelectionModal({ isOpen, onSelect, onClose }) {
  const [selectedRegion, setSelectedRegion] = useState(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedRegion) {
      onSelect(selectedRegion);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Chọn khu vực tìm việc
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Vui lòng chọn khu vực bạn muốn tìm việc để chúng tôi có thể đề xuất
          các công việc phù hợp nhất cho bạn.
        </p>

        {/* Region Options */}
        <div className="space-y-3 mb-6">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.name)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selectedRegion === region.name
                  ? "border-purple-600 bg-purple-50 shadow-md"
                  : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{region.icon}</span>
                <span
                  className={`text-lg font-semibold ${
                    selectedRegion === region.name
                      ? "text-purple-700"
                      : "text-gray-700"
                  }`}
                >
                  {region.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={!selectedRegion}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              selectedRegion
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:shadow-lg cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegionSelectionModal;

