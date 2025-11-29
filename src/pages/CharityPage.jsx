// Trang hỗ trợ khác
import { useNavigate } from "react-router-dom";
import { charityPrograms } from "../data/mockData";

function CharityPage() {
  const navigate = useNavigate();

  const handleCardClick = (program) => {
    navigate(`/charity/${program.id}`);
  };

  return (
    <div className="page-wrapper min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            💝 Hỗ trợ khác
          </h1>
          <p className="text-gray-600">
            Các chương trình hỗ trợ dành cho người khuyết tật
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {charityPrograms.map((program) => (
            <div
              key={program.id}
              onClick={() => handleCardClick(program)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col h-full overflow-hidden"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                  {program.title}
                </h2>
                <p className="text-purple-600 font-medium mb-2 line-clamp-1">
                  {program.organization}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                  {program.description}
                </p>
                {program.amount && (
                  <div className="mb-3 px-3 py-2 bg-green-50 rounded-lg">
                    <p className="text-sm font-semibold text-green-700 line-clamp-2">
                      💰 {program.amount}
                    </p>
                  </div>
                )}
                <div className="mb-4 space-y-1">
                  <p className="text-sm text-gray-600 line-clamp-1">
                    📍 {program.location}
                  </p>
                  {program.address && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                      🏢 {program.address.split('|')[0].trim()}
                    </p>
                  )}
                  {program.contact && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                      📞 {program.contact.split('|')[0].trim()}
                    </p>
                  )}
                  {program.email && (
                    <p className="text-sm text-gray-600 line-clamp-1">
                      📧 {program.email.split(' ')[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharityPage;

