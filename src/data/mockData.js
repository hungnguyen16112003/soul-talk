// Mock data cho ứng dụng

export const mockJobs = [
  {
    id: 1,
    title: "Lập trình viên Frontend",
    company: "Tech Solutions",
    location: "TP.HCM",
    salary: "15-20 triệu",
    description:
      "Tuyển dụng lập trình viên Frontend có kinh nghiệm với React, Vue.js",
    requirements: [
      "Kinh nghiệm React 2+ năm",
      "HTML/CSS/JavaScript",
      "Làm việc nhóm",
    ],
    disabilityTypes: ["Khiếm thị", "Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
  },
  {
    id: 2,
    title: "Nhân viên tư vấn khách hàng",
    company: "Customer Care Co",
    location: "Hà Nội",
    salary: "8-12 triệu",
    description: "Tuyển nhân viên tư vấn khách hàng qua điện thoại",
    requirements: ["Giao tiếp tốt", "Kiên nhẫn", "Máy tính cơ bản"],
    disabilityTypes: ["Khiếm thị"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
  },
  {
    id: 3,
    title: "Nhập liệu viên",
    company: "Data Entry Ltd",
    location: "Đà Nẵng",
    salary: "6-10 triệu",
    description: "Công việc nhập liệu dữ liệu vào hệ thống",
    requirements: ["Đánh máy nhanh", "Tỉ mỉ", "Máy tính cơ bản"],
    disabilityTypes: ["Vận động"],
    severityLevel: "Trung bình",
    status: "active",
    employerAvatar: "👨‍💻",
  },
  {
    id: 4,
    title: "Thiết kế đồ họa",
    company: "Creative Studio",
    location: "TP.HCM",
    salary: "12-18 triệu",
    description: "Tuyển dụng thiết kế đồ họa có khả năng sáng tạo",
    requirements: ["Photoshop, Illustrator", "Kinh nghiệm 1+ năm", "Portfolio"],
    disabilityTypes: ["Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍🎨",
  },
  {
    id: 5,
    title: "Nhân viên Content Writer",
    company: "Media Corp",
    location: "Hà Nội",
    salary: "7-12 triệu",
    description: "Viết nội dung cho website và mạng xã hội",
    requirements: ["Viết tốt", "Sáng tạo", "Hiểu biết SEO"],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
  },
  {
    id: 6,
    title: "Kế toán viên",
    company: "Finance Plus",
    location: "Đà Nẵng",
    salary: "10-15 triệu",
    description: "Xử lý các công việc kế toán cho công ty",
    requirements: ["Bằng kế toán", "Excel tốt", "Cẩn thận"],
    disabilityTypes: ["Vận động", "Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
  },
  {
    id: 7,
    title: "Nhân viên chăm sóc khách hàng",
    company: "Support Team",
    location: "TP.HCM",
    salary: "8-11 triệu",
    description: "Trả lời và giải đáp thắc mắc của khách hàng",
    requirements: ["Giao tiếp tốt", "Kiên nhẫn", "Máy tính cơ bản"],
    disabilityTypes: ["Khiếm thị"],
    severityLevel: "Trung bình",
    status: "active",
    employerAvatar: "👨‍💼",
  },
  {
    id: 8,
    title: "Dịch thuật viên",
    company: "Translation Pro",
    location: "Hà Nội",
    salary: "9-14 triệu",
    description: "Dịch thuật tài liệu từ tiếng Anh sang tiếng Việt",
    requirements: ["Tiếng Anh tốt", "Viết tốt", "Tỉ mỉ"],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
  },
];

export const disabilityTypes = [
  { id: 1, name: "Khiếm thính", icon: "👂" },
  { id: 2, name: "Khiếm thị", icon: "👁️" },
  { id: 3, name: "Vận động", icon: "🦽" },
  { id: 4, name: "Trí tuệ", icon: "🧠" },
  { id: 5, name: "Khác", icon: "🤝" },
];

export const severityLevels = [
  { id: 1, name: "Nhẹ", description: "Có thể làm việc độc lập" },
  { id: 2, name: "Trung bình", description: "Cần hỗ trợ một phần" },
  { id: 3, name: "Nặng", description: "Cần hỗ trợ nhiều" },
];

// Helper function để filter jobs theo disability
export const filterJobsByDisability = (jobs, disabilityType, severityLevel) => {
  return jobs.filter((job) => {
    const matchesDisability =
      !disabilityType || job.disabilityTypes.includes(disabilityType);
    const matchesSeverity =
      !severityLevel || job.severityLevel === severityLevel;
    return matchesDisability && matchesSeverity && job.status === "active";
  });
};

// Charity programs
export const charityPrograms = [
  {
    id: 1,
    title: "Hỗ trợ học bổng cho người khuyết tật",
    organization: "Quỹ Từ thiện Việt Nam",
    description:
      "Chương trình cấp học bổng hàng năm cho sinh viên khuyết tật có hoàn cảnh khó khăn, hỗ trợ chi phí học tập và sinh hoạt",
    location: "Toàn quốc",
    contact: "contact@charity.vn",
  },
  {
    id: 2,
    title: "Tặng xe lăn cho người khuyết tật",
    organization: "Hội Chữ thập đỏ",
    description:
      "Hỗ trợ xe lăn miễn phí cho người khuyết tật vận động có hoàn cảnh khó khăn tại các tỉnh thành trên cả nước",
    location: "Hà Nội, TP.HCM",
    contact: "support@redcross.vn",
  },
  {
    id: 3,
    title: "Chương trình hỗ trợ việc làm cho người khuyết tật",
    organization: "Trung tâm Hỗ trợ Người khuyết tật",
    description:
      "Tổ chức các khóa đào tạo nghề miễn phí và giới thiệu việc làm phù hợp cho người khuyết tật, giúp họ có cơ hội tự lập và hòa nhập cộng đồng",
    location: "Đà Nẵng",
    contact: "info@support-center.vn",
  },
  {
    id: 4,
    title: "Quỹ hỗ trợ phẫu thuật chỉnh hình",
    organization: "Bệnh viện Nhi đồng",
    description:
      "Chương trình hỗ trợ phẫu thuật chỉnh hình miễn phí cho trẻ em khuyết tật có hoàn cảnh khó khăn, giúp cải thiện chất lượng cuộc sống",
    location: "TP.HCM",
    contact: "fund@children-hospital.vn",
  },
  {
    id: 5,
    title: "Dự án hỗ trợ công nghệ hỗ trợ",
    organization: "Tech for Good",
    description:
      "Cung cấp thiết bị công nghệ hỗ trợ như máy trợ thính, máy đọc chữ nổi, phần mềm hỗ trợ cho người khuyết tật có nhu cầu",
    location: "Hà Nội",
    contact: "assistive@techforgood.vn",
  },
  {
    id: 6,
    title: "Chương trình hỗ trợ dinh dưỡng",
    organization: "Quỹ Bảo trợ Trẻ em",
    description:
      "Cung cấp thực phẩm dinh dưỡng và bổ sung vitamin cho trẻ em và người khuyết tật có hoàn cảnh khó khăn",
    location: "Toàn quốc",
    contact: "nutrition@childrenfund.vn",
  },
];

// Healthcare services
export const healthCareServices = [
  {
    id: 1,
    title: "Khám sức khỏe miễn phí",
    hospital: "Bệnh viện Đa khoa Trung ương",
    description:
      "Chương trình khám sức khỏe định kỳ miễn phí hàng tháng cho người khuyết tật, bao gồm kiểm tra tổng quát, xét nghiệm cơ bản và tư vấn sức khỏe",
    location: "Hà Nội",
    contact: "0241234567",
  },
  {
    id: 2,
    title: "Vật lý trị liệu và Phục hồi chức năng",
    hospital: "Trung tâm PHCN Quốc gia",
    description:
      "Dịch vụ vật lý trị liệu chuyên sâu với giá ưu đãi dành cho người khuyết tật vận động, giúp cải thiện khả năng vận động và hòa nhập",
    location: "TP.HCM",
    contact: "0287654321",
  },
  {
    id: 3,
    title: "Khám mắt và hỗ trợ thị lực",
    hospital: "Bệnh viện Mắt Trung ương",
    description:
      "Kiểm tra mắt miễn phí, cấp kính mắt với giá ưu đãi, và hỗ trợ thiết bị trợ thị cho người khiếm thị",
    location: "Hà Nội",
    contact: "0241234568",
  },
  {
    id: 4,
    title: "Khám tai và hỗ trợ thính giác",
    hospital: "Bệnh viện Tai Mũi Họng",
    description:
      "Kiểm tra thính lực miễn phí, tư vấn và hỗ trợ máy trợ thính với giá ưu đãi cho người khiếm thính",
    location: "Đà Nẵng",
    contact: "0236123456",
  },
  {
    id: 5,
    title: "Tư vấn tâm lý và hỗ trợ tinh thần",
    hospital: "Trung tâm Tâm lý học Lâm sàng",
    description:
      "Dịch vụ tư vấn tâm lý miễn phí cho người khuyết tật và gia đình, giúp vượt qua khó khăn và hòa nhập tốt hơn",
    location: "TP.HCM",
    contact: "0287654322",
  },
  {
    id: 6,
    title: "Khám răng và chăm sóc răng miệng",
    hospital: "Bệnh viện Răng Hàm Mặt",
    description:
      "Chương trình khám răng miễn phí và điều trị răng miệng với giá ưu đãi dành cho người khuyết tật",
    location: "Hà Nội",
    contact: "0241234569",
  },
];

// Career guidance articles
export const careerGuidanceArticles = [
  {
    id: 1,
    title: "Làm thế nào để tìm việc phù hợp với khả năng của bạn?",
    author: "Chuyên gia Tư vấn Nghề nghiệp",
    content:
      "Hướng dẫn chi tiết về cách tìm việc phù hợp với khả năng và tình trạng khuyết tật của bạn. Bao gồm các bước đánh giá bản thân, xác định điểm mạnh, và tìm kiếm cơ hội việc làm phù hợp trên các nền tảng tuyển dụng chuyên biệt.",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Kỹ năng cần thiết trong công việc hiện đại",
    author: "Nhà Tuyển Dụng Chuyên nghiệp",
    content:
      "Những kỹ năng quan trọng cần phát triển để thành công trong công việc, bao gồm kỹ năng giao tiếp, làm việc nhóm, sử dụng công nghệ, và khả năng thích ứng với môi trường làm việc mới.",
    date: "2024-01-20",
  },
  {
    id: 3,
    title: "Xây dựng CV và Portfolio ấn tượng",
    author: "Chuyên viên HR",
    content:
      "Hướng dẫn cách viết CV và tạo portfolio chuyên nghiệp, làm nổi bật điểm mạnh của bạn, và trình bày kinh nghiệm làm việc một cách hiệu quả để thu hút nhà tuyển dụng.",
    date: "2024-01-25",
  },
  {
    id: 4,
    title: "Kỹ thuật phỏng vấn xin việc thành công",
    author: "Career Coach",
    content:
      "Chia sẻ các kỹ thuật và mẹo quan trọng để tự tin trong phỏng vấn, trả lời câu hỏi hiệu quả, và để lại ấn tượng tích cực với nhà tuyển dụng. Bao gồm cách chuẩn bị và thực hành trước khi phỏng vấn.",
    date: "2024-02-01",
  },
  {
    id: 5,
    title: "Làm việc từ xa và tự do - Cơ hội cho người khuyết tật",
    author: "Chuyên gia Digital Work",
    content:
      "Khám phá các cơ hội việc làm từ xa và freelance phù hợp với người khuyết tật. Hướng dẫn cách tìm kiếm, ứng tuyển và thành công trong các công việc online, từ lập trình, thiết kế, đến viết nội dung và dịch thuật.",
    date: "2024-02-05",
  },
  {
    id: 6,
    title: "Xây dựng mạng lưới nghề nghiệp và networking",
    author: "Business Mentor",
    content:
      "Tầm quan trọng của networking trong việc tìm kiếm cơ hội nghề nghiệp. Hướng dẫn cách tham gia các sự kiện, cộng đồng, và xây dựng mối quan hệ với các chuyên gia trong ngành để mở rộng cơ hội việc làm.",
    date: "2024-02-10",
  },
];

// Success stories
export const successStories = [
  {
    id: 1,
    userId: "user-1",
    name: "Nguyễn Văn A",
    title:
      "Từ người khuyết tật vận động đến lập trình viên thành công tại công ty công nghệ hàng đầu",
    story:
      "Câu chuyện về hành trình vượt khó của Nguyễn Văn A - một người khuyết tật vận động đã biến đam mê lập trình thành sự nghiệp thành công. Bắt đầu từ việc tự học lập trình tại nhà, anh đã kiên trì theo đuổi ước mơ và hiện đang làm việc tại một công ty công nghệ lớn với mức lương ổn định. Anh chia sẻ về những khó khăn đã vượt qua và cách công nghệ đã giúp anh hòa nhập vào thị trường lao động.",
    image: "👨‍💻",
  },
  {
    id: 2,
    userId: "user-2",
    name: "Trần Thị B",
    title:
      "Thành công trong công việc tư vấn khách hàng và trở thành Team Leader",
    story:
      "Trần Thị B là một người khiếm thị đã chứng minh rằng khuyết tật không phải là rào cản trong sự nghiệp. Với khả năng giao tiếp tuyệt vời và sự kiên nhẫn, cô đã xuất sắc trong vai trò tư vấn khách hàng qua điện thoại. Sau 2 năm làm việc, cô đã được thăng chức lên Team Leader và hiện đang dẫn dắt một nhóm 10 nhân viên. Cô chia sẻ về cách cô sử dụng công nghệ hỗ trợ và phát triển kỹ năng nghe để thành công trong công việc.",
    image: "👩‍💼",
  },
  {
    id: 3,
    userId: "user-3",
    name: "Lê Văn C",
    title:
      "Từ nhân viên nhập liệu đến chủ doanh nghiệp dịch vụ số hóa tài liệu",
    story:
      "Lê Văn C bắt đầu sự nghiệp như một nhân viên nhập liệu với mức lương thấp. Nhưng với tinh thần học hỏi và đam mê công nghệ, anh đã tự học thêm các kỹ năng số hóa và quản lý dự án. Sau 5 năm, anh đã thành lập công ty riêng chuyên về dịch vụ số hóa tài liệu, tạo việc làm cho nhiều người khuyết tật khác. Anh chia sẻ về hành trình từ nhân viên đến doanh nhân và cách anh xây dựng một doanh nghiệp thành công.",
    image: "👨‍💼",
  },
  {
    id: 4,
    userId: "user-4",
    name: "Phạm Thị D",
    title: "Thiết kế đồ họa freelance - Tự do tài chính và làm việc linh hoạt",
    story:
      "Phạm Thị D là một người khiếm thính đã tìm thấy thành công trong lĩnh vực thiết kế đồ họa freelance. Bằng cách sử dụng các công cụ thiết kế hiện đại và giao tiếp qua email, chat, cô đã xây dựng được danh tiếng trong ngành và có thu nhập ổn định. Cô làm việc từ nhà với giờ giấc linh hoạt, giúp cô cân bằng giữa công việc và cuộc sống cá nhân. Cô chia sẻ về cách cô vượt qua thách thức giao tiếp và xây dựng mạng lưới khách hàng.",
    image: "👩‍🎨",
  },
];

// Reviews
export const reviews = [
  {
    id: 1,
    userId: "user-1",
    userName: "Nguyễn Văn A",
    jobTitle: "Lập trình viên Frontend",
    rating: 5,
    comment: "Website rất hữu ích, giúp tôi tìm được công việc phù hợp!",
    date: "2024-01-10",
  },
  {
    id: 2,
    userId: "user-2",
    userName: "Trần Thị B",
    jobTitle: "Nhân viên tư vấn",
    rating: 4,
    comment: "Dịch vụ tốt, hỗ trợ nhiệt tình.",
    date: "2024-01-12",
  },
];

// FAQs
export const faqs = [
  {
    id: 1,
    question: "Làm thế nào để tìm việc phù hợp với khả năng của tôi?",
    answer:
      "Bạn có thể sử dụng bộ lọc trên trang tìm việc để chọn loại khuyết tật, mức độ nghiêm trọng và vị trí công việc. Hệ thống sẽ tự động đề xuất các công việc phù hợp với hồ sơ của bạn.",
  },
  {
    id: 2,
    question: "Tôi có cần đăng ký tài khoản để ứng tuyển không?",
    answer:
      "Có, bạn cần đăng ký tài khoản người tìm việc để có thể xem chi tiết công việc và nộp đơn ứng tuyển. Quá trình đăng ký hoàn toàn miễn phí và đơn giản.",
  },
  {
    id: 3,
    question: "Làm thế nào để cập nhật thông tin hồ sơ của tôi?",
    answer:
      "Sau khi đăng nhập, bạn có thể vào phần 'Cập nhật hồ sơ' hoặc 'Thông tin tài khoản' để chỉnh sửa thông tin cá nhân, loại khuyết tật, mức độ nghiêm trọng và các kỹ năng của mình.",
  },
  {
    id: 4,
    question: "Nhà tuyển dụng có thể từ chối tôi vì khuyết tật không?",
    answer:
      "Theo quy định của pháp luật, việc phân biệt đối xử dựa trên khuyết tật là bất hợp pháp. Các nhà tuyển dụng trên nền tảng này cam kết tạo cơ hội việc làm công bằng cho tất cả ứng viên.",
  },
  {
    id: 5,
    question: "Tôi có thể tìm các dịch vụ hỗ trợ nào trên website?",
    answer:
      "Website cung cấp nhiều dịch vụ hỗ trợ bao gồm: chương trình từ thiện, dịch vụ chăm sóc sức khỏe, tư vấn hướng nghiệp, và chia sẻ câu chuyện thành công. Bạn có thể truy cập các mục này từ menu chính.",
  },
  {
    id: 6,
    question: "Làm thế nào để nộp đơn ứng tuyển?",
    answer:
      "Khi tìm thấy công việc phù hợp, nhấp vào 'Xem chi tiết' để đọc đầy đủ thông tin. Sau đó nhấp vào nút 'Ứng tuyển' và điền thông tin cần thiết. Hồ sơ của bạn sẽ được gửi đến nhà tuyển dụng.",
  },
  {
    id: 7,
    question: "Tôi có thể lưu công việc để xem lại sau không?",
    answer:
      "Hiện tại bạn có thể bookmark trang công việc trong trình duyệt. Chúng tôi đang phát triển tính năng lưu công việc yêu thích và sẽ ra mắt trong thời gian tới.",
  },
  {
    id: 8,
    question: "Làm thế nào để cập nhật tình trạng khuyết tật của tôi?",
    answer:
      "Bạn có thể cập nhật thông tin khuyết tật trong phần 'Cập nhật hồ sơ'. Hãy chọn loại khuyết tật và mức độ nghiêm trọng chính xác để nhận được đề xuất công việc phù hợp nhất.",
  },
  {
    id: 9,
    question: "Website có hỗ trợ người khuyết tật thị giác không?",
    answer:
      "Có, chúng tôi đang nỗ lực cải thiện khả năng tiếp cận của website. Hiện tại website hỗ trợ các trình đọc màn hình phổ biến và chúng tôi sẽ tiếp tục cải thiện trải nghiệm cho người khuyết tật thị giác.",
  },
  {
    id: 10,
    question: "Làm thế nào để liên hệ với nhà tuyển dụng?",
    answer:
      "Sau khi ứng tuyển, nhà tuyển dụng sẽ liên hệ với bạn qua thông tin liên hệ mà bạn đã cung cấp trong hồ sơ. Bạn cũng có thể tìm thông tin liên hệ của nhà tuyển dụng trong phần chi tiết công việc.",
  },
  {
    id: 11,
    question: "Tôi có thể xóa tài khoản của mình không?",
    answer:
      "Có, bạn có thể yêu cầu xóa tài khoản bằng cách liên hệ với bộ phận hỗ trợ hoặc vào phần cài đặt tài khoản. Lưu ý rằng việc xóa tài khoản sẽ xóa tất cả dữ liệu liên quan.",
  },
  {
    id: 12,
    question: "Làm thế nào để báo cáo công việc không phù hợp hoặc lừa đảo?",
    answer:
      "Nếu bạn phát hiện công việc không phù hợp hoặc có dấu hiệu lừa đảo, vui lòng báo cáo ngay cho chúng tôi qua email hỗ trợ hoặc tính năng báo cáo trên trang chi tiết công việc. Chúng tôi sẽ xử lý ngay lập tức.",
  },
];
