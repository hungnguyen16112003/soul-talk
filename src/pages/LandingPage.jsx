// Trang Landing - Chọn vai trò
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaBriefcase, FaUser } from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper min-h-screen">
      <Header />

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl w-full text-center">
          {/* Logo */}
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            EqualHirEqualHire
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Việc làm cho người khuyết tật
          </p>

          {/* Two Main Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {/* Nhà Tuyển Dụng Card */}
            <div
              onClick={() => navigate("/register")}
              className="group bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-blue-100 hover:border-blue-500 animate-fade-in"
            >
              <div className="flex justify-center mb-4">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <FaBriefcase className="w-16 h-16 md:w-20 md:h-20 text-blue-500" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 text-center">
                Tôi là Nhà Tuyển Dụng
              </h2>
              <p className="text-gray-600 text-center">
                Đăng tin tuyển dụng và tìm kiếm nhân tài phù hợp
              </p>
            </div>

            {/* Người Tìm Việc Card */}
            <div
              onClick={() => navigate("/jobseeker")}
              className="group bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-purple-100 hover:border-purple-500 animate-fade-in"
            >
              <div className="flex justify-center mb-4">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <FaUser className="w-16 h-16 md:w-20 md:h-20 text-purple-500" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300 text-center">
                Tôi là Người Tìm Việc
              </h2>
              <p className="text-gray-600 text-center">
                Tìm kiếm cơ hội việc làm phù hợp với khả năng của bạn
              </p>
            </div>
          </div>

          {/* Footer Text */}
          <p className="mt-12 text-gray-500 animate-fade-in">
            Kết nối cơ hội • Tạo dựng tương lai
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
