// Trang học bổng
import { useNavigate } from "react-router-dom";
import { scholarships } from "../data/mockData";

function ScholarshipPage() {
  const navigate = useNavigate();

  const handleCardClick = (scholarship) => {
    navigate(`/scholarships/${scholarship.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎓 Học bổng
          </h1>
          <p className="text-gray-600">
            Các chương trình học bổng dành cho người khuyết tật
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              onClick={() => handleCardClick(scholarship)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col h-full overflow-hidden"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                  {scholarship.title}
                </h2>
                <p className="text-purple-600 font-medium mb-2 line-clamp-1">
                  {scholarship.organization}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                  {scholarship.description}
                </p>
                {scholarship.amount && (
                  <div className="mb-3 px-3 py-2 bg-green-50 rounded-lg">
                    <p className="text-sm font-semibold text-green-700 line-clamp-2">
                      💰 {scholarship.amount}
                    </p>
                  </div>
                )}
                <div className="mb-4 space-y-1">
                  <p className="text-sm text-gray-600 line-clamp-1">
                    📍 {scholarship.location}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    📧 {scholarship.contact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScholarshipPage;

