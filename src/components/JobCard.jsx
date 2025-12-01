// Component hiển thị thông tin công việc dạng card
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaCheckCircle,
  FaPauseCircle,
} from "react-icons/fa";

function JobCard({ job, onEdit, onDelete, showActions = false, isAdmin = false }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const jobId = job._id || job.id;
    navigate(`/job/${jobId}`);
  };

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
      onClick={!showActions ? handleCardClick : undefined}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <p className="text-purple-600 font-medium">{job.company}</p>
          </div>
          {isAdmin && job.employer && (
            <div className="mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                👤 {job.employer?.name || job.employer?.email || "N/A"}
              </span>
            </div>
          )}
          <div className="space-y-2 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-2 w-full">
              <FaMapMarkerAlt className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="flex-1 break-words">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 w-full">
              <FaMoneyBillWave className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="flex-1 break-words">{job.salary}</span>
            </div>
          </div>
          {job.disabilityTypes && job.disabilityTypes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {job.disabilityTypes.map((type, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
          <p className="text-gray-700 line-clamp-2 mb-2 flex-grow">
            {job.description}
          </p>
          {job.requirements && Array.isArray(job.requirements) && job.requirements.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Yêu cầu:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {job.requirements.slice(0, 3).map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span className="flex-1">{req}</span>
                  </li>
                ))}
                {job.requirements.length > 3 && (
                  <li className="text-amber-600 text-xs font-medium">
                    +{job.requirements.length - 3} yêu cầu khác...
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            job.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {job.status === "active" ? (
            <>
              <FaCheckCircle className="w-3.5 h-3.5 text-green-600" />
              <span>Còn tuyển</span>
            </>
          ) : (
            <>
              <FaPauseCircle className="w-3.5 h-3.5 text-gray-600" />
              <span>Tạm dừng</span>
            </>
          )}
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit(job);
            }}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Sửa
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(job);
            }}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  );
}

export default JobCard;
