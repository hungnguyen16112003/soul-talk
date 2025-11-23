// Component hiển thị thông tin công việc dạng card
import { useNavigate } from "react-router-dom";

function JobCard({ job, onEdit, onDelete, showActions = false }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job/${job.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={!showActions ? handleCardClick : undefined}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {job.title}
          </h3>
          <p className="text-purple-600 font-medium mb-2">{job.company}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
            <span>📍 {job.location}</span>
            <span>💰 {job.salary}</span>
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
          <p className="text-gray-700 line-clamp-2 mb-2">{job.description}</p>
          {job.requirements && job.requirements.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Yêu cầu:
              </p>
              <ul className="text-sm text-gray-600 line-clamp-2">
                {job.requirements.slice(0, 2).map((req, idx) => (
                  <li key={idx}>• {req}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                job.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {job.status === "active" ? "Còn tuyển" : "Tạm dừng"}
            </span>
          </div>
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


