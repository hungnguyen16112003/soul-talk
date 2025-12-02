// Mock data cho ứng dụng

export const mockJobs = [
  {
    id: 1,
    title: "Nhân viên học việc - Điêu khắc, chạm trổ",
    company: "Trung tâm Bảo trợ - Dạy nghề và Tạo việc làm thành phố",
    location: "Miền Nam",
    salary:
      "Học việc 3 triệu/tháng (3 tháng) - Sau đó 4.5 - 9 triệu/tháng (tùy khả năng)",
    description:
      "Trung tâm dạy nghề, dạy văn hóa và giới thiệu việc làm miễn phí cho người khuyết tật và thanh thiếu niên có hoàn cảnh khó khăn. Cơ sở tiện khắc dạy nghề khuyết tật cần tuyển nhân viên học việc. Công việc: điêu khắc, chạm trổ, lắp ghép hàng thủ công mỹ nghệ gỗ và chăm sóc bonsai. Thời gian làm việc: 7h30 - 17h30 hàng ngày. Chế độ: bao ăn, ở.",
    requirements: [
      "Số lượng: 10 Nam",
      "Khuyết tật chân, tự di chuyển được, tay linh hoạt hoặc khiếm thính",
      "Chịu khó, có nghị lực, đam mê học hỏi",
    ],
    disabilityTypes: ["Vận động", "Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
    contact: "028 3932 0483 - Zalo: 0903638596",
    address: "P.Thới An, Tp.HCM",
    email: "vieclamnkthcm@gmail.com",
    website: "https://vieclamnkt.top/",
  },
  {
    id: 2,
    title: "Tuyển sinh nghề thủ công miễn phí",
    company: "Trung Tâm Linh Quang",
    location: "Miền Bắc",
    salary: "Học nghề miễn phí - Có thu nhập sau 3-6 tháng",
    description:
      "Trung tâm Dạy nghề Nhân đạo và Tạo việc làm cho Trẻ em khuyết tật Việt Nam (Trung tâm Linh Quang) thông báo tuyển sinh khóa học nghề MIỄN PHÍ: Gia công làm giấy thủ công (Gia công nhãn vở, túi quà, thiệp chúc mừng, bao lì xì, hộp quà, sản phẩm trang trí...). Đối tượng: Thanh thiếu niên, người khuyết tật, tự kỷ có khả năng tự phục vụ cơ bản. Yêu cầu: hai tay sử dụng linh hoạt, đi đứng lại được. Thời gian học: 8h00 – 17h, từ thứ Hai đến thứ Bảy hàng tuần. Quyền lợi: Học nghề hoàn toàn miễn phí, được hướng dẫn tận tình, cung cấp dụng cụ học tập và nguyên vật liệu đầy đủ. Sau 3–6 tháng học việc, học viên có cơ hội được nhận được làm việc và có thu nhập. Được có cơ hội tham gia miễn phí các khóa học rèn luyện kỹ năng sống và học thêm các môn năng khiếu.",
    requirements: [
      "Thanh thiếu niên, người khuyết tật, tự kỷ có khả năng tự phục vụ cơ bản",
      "Hai tay sử dụng linh hoạt, đi đứng lại được",
      "Người có hoàn cảnh kinh tế khó khăn, mong muốn học nghề để tự lập",
    ],
    disabilityTypes: ["Vận động", "Trí tuệ", "Khác"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
    contact: "0911.386.568",
    address:
      "Số 25/48 Linh Quang, Văn Chương, P. Văn Miếu - Quốc Tử Giám, Hà Nội",
    email: "trungtamnhandaokt@gmail.com",
    website: "https://www.facebook.com/vieclamchotrekhuyettat/",
  },
  {
    id: 3,
    title: "Dạy nghề và tạo việc làm cho người khuyết tật",
    company:
      "Trung Tâm Dạy Nghề Và Tạo Việc Làm Cho Người Khuyết Tật Thành Phố Huế",
    location: "Miền Trung",
    salary: "Theo thỏa thuận",
    description:
      "Trung Tâm Dạy Nghề Và Tạo Việc Làm Cho Người Khuyết Tật Thành Phố Huế là nơi đào tạo nghề và tạo việc làm cho người khuyết tật. Trung tâm cung cấp các khóa học nghề phù hợp với khả năng của từng học viên, giúp họ có cơ hội học tập, phát triển kỹ năng và tìm được việc làm ổn định. Môi trường làm việc và học tập thân thiện, hỗ trợ tận tình, tạo điều kiện tốt nhất cho người khuyết tật hòa nhập và phát triển.",
    requirements: [
      "Người khuyết tật có khả năng học tập và làm việc",
      "Có tinh thần học hỏi và cầu tiến",
      "Tuân thủ quy định của trung tâm",
    ],
    disabilityTypes: ["Vận động", "Khiếm thính", "Khiếm thị", "Trí tuệ"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
    contact: "0234.3516565 - Di động 0935771315 (A Lâm)",
    address: "16 Thánh Gióng, Phường Phú Xuân, Thành phố Huế",
    email: "trungtamdaynghenkt@gmail.com",
    website: "https://www.facebook.com/profile.php?id=61556078404812",
  },
  {
    id: 4,
    title: "Lao động phổ thông",
    company: "Công ty TNHH Khuôn Bế Sương Quyên",
    location: "Miền Nam",
    salary: "Thỏa thuận",
    description:
      "Công ty TNHH Khuôn Bế Sương Quyên cần tuyển lao động phổ thông. Số lượng: 05 nam. Yêu cầu: KT chân, tự di chuyển được, hai tay & mắt tốt/ khiếm thính; dưới 30 tuổi; siêng năng, chịu khó; trung thực. Thời gian: giờ hành chính. Chế độ: đầy đủ; có chỗ ở lại.",
    requirements: [
      "Số lượng: 05 nam",
      "KT chân, tự di chuyển được, hai tay & mắt tốt/ khiếm thính",
      "Dưới 30 tuổi",
      "Siêng năng, chịu khó, trung thực",
    ],
    disabilityTypes: ["Vận động", "Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
    contact: "028 3932 0483 - Zalo: 0903638596",
    address: "P.Tân Khánh, Tp.HCM (P.Tân Phước Khánh, TX.Tân Uyên cũ)",
    email: "vieclamnkthcm@gmail.com",
    website: "https://vieclamnkt.top/",
  },
  {
    id: 5,
    title: "Nhân viên vận hành - Người Điếc/Khiếm thính",
    company: "Giặt là Sáng (Giặt Ký +)",
    location: "Miền Bắc",
    salary:
      "Hỗ trợ học nghề: 3 triệu/tháng - Lương chính thức: 4,5 triệu/tháng + thưởng",
    description:
      "Tiệm giặt là của người Điếc là một sáng kiến của SÁNG – nhóm thanh niên hoạt động vì quyền của người Điếc/khiếm thính tại Hà Nội. Dưới thương hiệu Giặt Ký + là chuỗi cơ sở kinh doanh giặt là tại Hà Nội, tiệm sử dụng hoàn toàn nhân sự là những người Điếc. Quy trình giao tiếp với khách hàng được thiết kế riêng để quá trình vận hành trơn tru. Lợi nhuận của Tiệm Giặt Ký + sẽ được sử dụng hoàn toàn cho các lớp học kỹ năng sống cho người Điếc, hỗ trợ người Điếc hòa nhập xã hội. Công việc: Làm sạch quần áo, giày dép, chăm sóc sản phẩm của khách hàng. Thu ngân, tính tiền sổ bán hàng. Sử dụng máy tính và điện thoại để làm việc.",
    requirements: [
      "Là người Điếc/Khiếm thính",
      "Sạch sẽ, cẩn thận, quan sát tốt, kiên trì",
      "Cởi mở, thân thiện, ham học hỏi, mong muốn sự tiến bộ",
      "Có kế hoạch lâu dài cho tương lai",
    ],
    disabilityTypes: ["Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
    contact: "0982669933 (vui lòng nhắn tin)",
    address:
      "Cơ sở 1: số 7 đường Bờ Sông Sét, phường Tương Mai, Hà Nội | Cơ sở 2: số 101G4, ngõ 477 Nguyễn Trãi, phường Thanh Liệt, Hà Nội",
    email: "thuyluong1291@gmail.com",
    website: "https://sanglaundry.com/",
  },
  {
    id: 6,
    title: "Nhân viên may - Người khuyết tật",
    company: "Xưởng may người khuyết tật thành phố Đà Nẵng",
    location: "Miền Trung",
    salary: "Theo thỏa thuận",
    description:
      "Xưởng may người khuyết tật thành phố Đà Nẵng là nơi tạo công ăn việc làm cho những người không may gặp phải sự khiếm khuyết, giúp họ phần nào ổn định cuộc sống của mình. Xưởng chuyên may các sản phẩm may mặc, tạo môi trường làm việc thân thiện và hỗ trợ cho người khuyết tật. Công việc bao gồm: may quần áo, hoàn thiện sản phẩm, kiểm tra chất lượng. Môi trường làm việc hòa nhập, đồng nghiệp thân thiện, quản lý tận tâm hỗ trợ.",
    requirements: [
      "Là người khuyết tật",
      "Có khả năng học nghề may",
      "Tinh thần học hỏi, cẩn thận",
      "Tuân thủ quy định làm việc",
    ],
    disabilityTypes: ["Vận động", "Khiếm thính", "Khiếm thị"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
    contact: "093 696 31 67",
    address: "218 Hoàng Văn Thái, Thành phố Đà Nẵng",
    email: "tdbbrowns@gmail.com",
    website: "https://www.facebook.com/profile.php?id=100062921127314",
  },
  {
    id: 7,
    title: "Nhân viên kế toán/ Nhân viên thiết kế",
    company: "Công ty TNHH Khuôn Bế Sương Quyên",
    location: "Miền Nam",
    salary: "Thỏa thuận",
    description:
      "Công ty TNHH Khuôn Bế Sương Quyên cần tuyển nhân viên kế toán hoặc nhân viên thiết kế. Số lượng: 01 Nam/ Nữ. Yêu cầu: khuyết tật chân, đi lại được; hai tay tốt; biết sử dụng máy vi tính; thành thạo Word, Excel; có nghiệp vụ kế toán/ biết thiết kế. Thời gian: 7h30 - 17h00. Chế độ: đầy đủ.",
    requirements: [
      "Số lượng: 01 Nam/ Nữ",
      "Khuyết tật chân, đi lại được; hai tay tốt",
      "Biết sử dụng máy vi tính",
      "Thành thạo Word, Excel",
      "Có nghiệp vụ kế toán/ biết thiết kế",
    ],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
    contact: "028 3932 0483 - Zalo: 0903638596",
    address:
      "P.Tân Khánh, Tp.HCM (P.Tân Phước Khánh, TX.Tân Uyên, Bình Dương cũ)",
    email: "vieclamnkthcm@gmail.com",
    website: "https://vieclamnkt.top/",
  },
  {
    id: 8,
    title: "Lao động may - Người khuyết tật",
    company: "SafeViet",
    location: "Miền Bắc",
    salary:
      "Lương học việc: 6 triệu/tháng + bao ăn + ở | Lương chính thức: 9-11 triệu/tháng",
    description:
      "DNXH Safeviet là Doanh nghiệp xã hội luôn hướng tới sự công bằng, trao cơ hội cho người dễ tổn thương. Tuyển dụng: CÔNG VIỆC MAY: 06 người, PHỤ VIỆC MAY: 02 người. Thợ phụ việc: Khâu khuy cúc, vắt gấu, là đồ hoàn thiện. Thợ may: May sơmi và quần tây. Không biết việc sẽ được dạy và đào tạo. Thời gian làm việc: Từ 8 giờ sáng đến 17 giờ 30 – Nghỉ trưa 1 tiếng. Mỗi tháng nghỉ 2 ngày. Môi trường làm việc sang trọng: Không hút thuốc, không sử dụng chất kích thích (Bia, rượu, café, trà) trong giờ làm việc. Hạn chế tối đa sử dụng điện thoại.",
    requirements: [
      "Là người khuyết tật nhẹ: tay hoạt động bình thường, mắt tinh",
      "Đã biết may hoặc yêu thích công việc may",
      "Không phân biệt nam, nữ",
      "Tuổi từ 18 đến 40",
      "Trung thực - ý thức làm việc tự giác cao",
      "Biết đi xe máy là một lợi thế, doanh nghiệp sẽ cung cấp xe máy",
    ],
    disabilityTypes: ["Vận động", "Khiếm thị"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
    contact:
      "0983238969 (Anh Nam) - Lưu ý không nhắn tin và chỉ gọi trong giờ hành chính",
    address:
      "Địa chỉ 1: Biệt thự số 20, phố Hạ Hồi, Cửa Nam, Hà Nội | Địa chỉ 2: Biệt thự 39B phố Hàng Bài - Cửa Nam - Hà Nội | Địa chỉ 3: Số 9 Nguyễn Du - Hai Bà Trưng - Hà Nội",
    email: "",
    website: "https://www.facebook.com/DNXHSafeviet/",
  },
  {
    id: 9,
    title: "Nhân viên vận hành - Người Điếc/Khiếm thính (TP.HCM)",
    company: "Giặt là Sáng (Giặt Ký +)",
    location: "Miền Nam",
    salary:
      "Hỗ trợ học nghề: 3 triệu/tháng - Lương chính thức: 4,5 triệu/tháng + thưởng",
    description:
      "Tiệm giặt là của người Điếc là một sáng kiến của SÁNG – nhóm thanh niên hoạt động vì quyền của người Điếc/khiếm thính. Dưới thương hiệu Giặt Ký + là chuỗi cơ sở kinh doanh giặt là, tiệm sử dụng hoàn toàn nhân sự là những người Điếc. Quy trình giao tiếp với khách hàng được thiết kế riêng để quá trình vận hành trơn tru. Lợi nhuận của Tiệm Giặt Ký + sẽ được sử dụng hoàn toàn cho các lớp học kỹ năng sống cho người Điếc, hỗ trợ người Điếc hòa nhập xã hội. Công việc: Làm sạch quần áo, giày dép, chăm sóc sản phẩm của khách hàng. Thu ngân, tính tiền sổ bán hàng. Sử dụng máy tính và điện thoại để làm việc. Quyền lợi: Tăng lương theo kinh nghiệm 6 tháng, 1 năm. Chế độ BHXH, BHYT, BHTN. Được học nghề miễn phí. Được đào tạo các kỹ năng mềm. Cơ hội đi học theo khả năng và mong muốn để phát triển bản thân. Được trao quyền và có cơ hội làm chủ. Du lịch 1 năm 1 lần, thưởng lễ Tết và tham gia vào các hoạt động của doanh nghiệp.",
    requirements: [
      "Là người Điếc/Khiếm thính (Nhân viên được đào tạo bằng ngôn ngữ ký hiệu)",
      "Sạch sẽ, cẩn thận, quan sát tốt, kiên trì",
      "Cởi mở, thân thiện, ham học hỏi, mong muốn sự tiến bộ",
      "Có kế hoạch lâu dài cho tương lai",
    ],
    disabilityTypes: ["Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
    contact: "0982669933 (vui lòng nhắn tin)",
    address:
      "Cơ sở 3: 117/109B Nguyễn Hữu Cảnh, phường Thạnh Mỹ Tây, TPHCM | Cơ sở 4: 354A Trường Sa, phường Cầu Kiệu, TPHCM | Cơ sở 5: 35 Thân Nhân Trung, phường Long Bình, Đồng Nai",
    email: "thuyluong1291@gmail.com",
    website: "https://sanglaundry.com/",
  },
  {
    id: 10,
    title: "Dạy nghề may cho người khuyết tật",
    company: "TokyoLife",
    location: "Miền Bắc",
    salary:
      "Lương theo sản phẩm và phụ cấp (ăn trưa, độc hại, chuyên cần) - Hỗ trợ chỗ ở cho người ở xa",
    description:
      "TokyoLife tiên phong triển khai dự án Thiên thần - Tạo việc làm bền vững cho người khuyết tật. Đến nay, TokyoLife tự hào vì đã tạo được việc làm cho 142 người khuyết tật tại xưởng sản xuất, văn phòng, và hệ thống cửa hàng trên toàn quốc. Quyền lợi: Được đào tạo nghề bài bản. Lương theo sản phẩm và phụ cấp (ăn trưa, độc hại, chuyên cần). Hỗ trợ chỗ ở cho người ở xa. Có cơ hội việc làm chính thức và lâu dài. Tham gia BHXH, BHYT, BHTN và rất nhiều chế độ phúc lợi hấp dẫn khác khi ký Hợp đồng chính thức. Nghỉ hưởng lương các ngày lễ tết theo quy định Nhà nước và thêm 02 ngày của Người khuyết tật (18/04 & 03/12). Thời gian làm việc: 08:00 - 17:00, thứ Hai đến thứ Bảy.",
    requirements: [
      "Người khuyết tật có khả năng học nghề may",
      "Có tinh thần học hỏi và cầu tiến",
      "Tuân thủ quy định làm việc",
    ],
    disabilityTypes: ["Vận động", "Khiếm thính", "Khiếm thị"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
    contact:
      "Chị Cúc – 0912344723 (sử dụng được ngôn ngữ ký hiệu) hoặc anh Tùng – 0948868080",
    address: "Đường Nguyễn Văn Cừ, Ngọc Lâm, Long Biên, Hà Nội",
    email: "tuyendung@tokyolife.vn",
    website: "https://tuyendung.tokyolife.vn/",
  },
  {
    id: 11,
    title: "Lập trình viên",
    company: "Công ty TNHH BYRYON",
    location: "Miền Trung",
    salary: "12.000.000 - 20.000.000 VND",
    description:
      "Công ty TNHH BYRYON tuyển dụng lập trình viên để phát triển phần mềm, bảo trì hệ thống và xử lý lỗi. Công việc đòi hỏi tư duy logic tốt, có kinh nghiệm lập trình và khả năng làm việc độc lập cũng như trong nhóm. Môi trường làm việc chuyên nghiệp, hỗ trợ phát triển kỹ năng và cơ hội thăng tiến.",
    requirements: [
      "Phù hợp với: Khuyết tật chân",
      "Trình độ học vấn: Đại học",
      "Trình độ chuyên môn: Nâng cao",
      "Tư duy logic tốt, có kinh nghiệm lập trình",
      "Có khả năng làm việc độc lập và trong nhóm",
    ],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💻",
    contact: "0907099077",
    address: "Đà Nẵng",
    email: "bryon@gmail.com",
    website: "",
  },
  {
    id: 12,
    title: "Nhân viên quản lý kho",
    company:
      "Xưởng sản xuất dụng cụ ăn uống, dụng cụ bếp thủ công Hoa Hướng Dương",
    location: "Miền Nam",
    salary: "7-9 triệu đồng/tháng",
    description:
      "Xưởng sản xuất dụng cụ ăn uống, dụng cụ bếp thủ công Hoa Hướng Dương, hỗ trợ việc làm cho người khuyết tật. Mô tả công việc: Quản lý các sản phẩm trong kho, sắp xếp và bảo quản sản phẩm. Quyền lợi: Lương thưởng định kỳ, lễ tết theo quy định nhà nước, BHXH đầy đủ, bao cơm trưa. Thời gian làm việc: 8 tiếng / ngày. Hình thức làm việc: Toàn thời gian.",
    requirements: [
      "Phù hợp với: Khiếm thính, Điếc hoàn toàn, Khó giao tiếp, Câm",
      "Trình độ học vấn: Không yêu cầu",
      "Trình độ chuyên môn: Không yêu cầu",
      "Sức khỏe bình thường",
    ],
    disabilityTypes: ["Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
    contact: "0125264881",
    address: "Long An",
    email: "hoahuongduong@gmail.com",
    website: "",
  },
  {
    id: 13,
    title: "Nhân viên phụ kho - Người khuyết tật",
    company: "TokyoLife",
    location: "Miền Bắc",
    salary: "6 – 8 triệu/tháng + phụ cấp ăn trưa & chỗ ở cho người ở xa",
    description:
      "TokyoLife tiên phong triển khai dự án Thiên thần - Tạo việc làm bền vững cho người khuyết tật. Quyền lợi: Thu nhập: 6 – 8 triệu/tháng. Có phụ cấp ăn trưa & chỗ ở cho người ở xa. Không yêu cầu kinh nghiệm, được đào tạo và hướng dẫn chi tiết. Tham gia BHXH, BHYT, BHTN + nhiều phúc lợi hấp dẫn khác sau khi ký Hợp đồng chính thức. Nghỉ hưởng lương các ngày lễ tết theo quy định Nhà nước và thêm 02 ngày của Người khuyết tật (18/04 & 03/12). Môi trường làm việc thân thiện, hòa nhập, tôn trọng và đồng hành cùng Người khuyết tật. Thời gian làm việc: Làm 8 tiếng (từ Thứ Hai đến Thứ Bảy).",
    requirements: [
      "Người khuyết tật",
      "Không yêu cầu kinh nghiệm",
      "Có tinh thần học hỏi",
    ],
    disabilityTypes: ["Vận động", "Khiếm thính", "Khiếm thị"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💼",
    contact:
      "Chị Cúc – 0912344723 (sử dụng được ngôn ngữ ký hiệu) hoặc anh Tùng – 0948868080",
    address: "Khoang Mái, Đồng Trúc, Thạch Thất, Hà Nội",
    email: "tuyendung@tokyolife.vn",
    website: "https://tuyendung.tokyolife.vn/",
  },
  {
    id: 14,
    title: "Nhân viên đóng gói và kiểm hàng",
    company:
      "Xưởng sản xuất dụng cụ ăn uống, dụng cụ bếp thủ công Hoa Hướng Dương",
    location: "Miền Nam",
    salary: "4.800.000 - 5.500.000 đồng",
    description:
      "Xưởng sản xuất dụng cụ ăn uống, dụng cụ bếp thủ công Hoa Hướng Dương, hỗ trợ việc làm cho người khuyết tật. Mô tả công việc: Đóng gói sản phẩm vào hộp, kiểm tra chất lượng và số lượng trước khi giao hàng. Quyền lợi: Thưởng theo số lượng đơn hàng, làm việc trong môi trường thân thiện. Thời gian làm việc: 8 tiếng mỗi ngày, nghỉ chủ nhật. Hình thức làm việc: toàn thời gian.",
    requirements: [
      "Phù hợp với: Khiếm thính",
      "Trình độ học vấn: Không yêu cầu",
      "Trình độ chuyên môn: Không yêu cầu",
      "Tỉ mỉ, có khả năng ngồi lâu, thao tác tay tốt",
    ],
    disabilityTypes: ["Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👩‍💼",
    contact: "0125264881",
    address: "Long An",
    email: "hoahuongduong@gmail.com",
    website: "",
  },
  {
    id: 16,
    title: "Học việc sửa chữa máy tính",
    company: "Quoc Tuan PC",
    location: "Miền Bắc",
    salary: "1.500.000 - 2.500.000 đồng",
    description:
      "Mua bán, sửa chữa laptop, PC, nhận đào tạo học viên (Ưu tiên người khuyết tật phù hợp). Mô tả công việc: Tham gia đào tạo thực hành sửa chữa laptop/PC, hỗ trợ kỹ thuật viên trong quá trình làm việc. Quyền lợi: Được đào tạo miễn phí, hỗ trợ ăn trưa, cơ hội trở thành nhân viên chính thức sau 3 tháng. Thời gian làm việc: Ca hành chính (8h00–17h00).",
    requirements: [
      "Phù hợp với: Khiếm thính, Khuyết tật chân",
      "Không yêu cầu trình độ học vấn",
      "Không yêu cầu trình độ chuyên môn",
      "Khả năng quan sát, tinh thần học hỏi cao",
    ],
    disabilityTypes: ["Khiếm thính", "Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍💻",
    contact: "0909444333",
    address: "Hải Phòng",
    email: "quoctuanpc@gmail.com",
    website: "",
  },
  {
    id: 17,
    title: "Thợ thủ công mỹ nghệ",
    company:
      "Xưởng sản xuất dụng cụ ăn uống, dụng cụ bếp thủ công Hoa Hướng Dương",
    location: "Miền Nam",
    salary: "5.500.000-7.000.000 đồng",
    description:
      "Xưởng sản xuất dụng cụ ăn uống, dụng cụ bếp thủ công Hoa Hướng Dương, hỗ trợ việc làm cho người khuyết tật. Mô tả công việc: Tạo hình, chạm khắc, sơn, đánh bóng các sản phẩm gỗ theo mẫu thiết kế. Quyền lợi: Được đào tạo nghề miễn phí, hỗ trợ chỗ ăn ở. Thời gian làm việc: 7 tiếng mỗi ngày.",
    requirements: [
      "Phù hợp với: Khiếm thính, Khiếm thị",
      "Trình độ học vấn: Không yêu cầu",
      "Trình độ chuyên môn: Không yêu cầu",
      "Khéo tay, kiên nhẫn, sáng tạo",
    ],
    disabilityTypes: ["Khiếm thính", "Khiếm thị"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍🎨",
    contact: "0125264881",
    address: "Long An",
    email: "hoahuongduong@gmail.com",
    website: "",
  },
  {
    id: 18,
    title: "Phụ bếp",
    company: "Cơm tấm Ngô Quyền",
    location: "Miền Nam",
    salary: "4.500.000- 5.500.000 đồng",
    description:
      "Cơm tấm Ngô Quyền tuyển dụng phụ bếp. Mô tả công việc: Chuẩn bị nguyên liệu, rửa chén, hỗ trợ bếp chính trong quá trình nấu ăn. Quyền lợi: Bao ăn 1 bữa, thưởng hiệu quả công việc. Thời gian làm việc: 8 tiếng hoặc theo ca linh hoạt.",
    requirements: [
      "Phù hợp với: Khiếm thính",
      "Trình độ học vấn: Không yêu cầu",
      "Trình độ chuyên môn: Không yêu cầu",
      "Siêng năng, cẩn thận",
    ],
    disabilityTypes: ["Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "👨‍🍳",
    contact: "0585004340",
    address: "Tây Ninh",
    email: "comtamngoquyen@gmail.com",
    website: "",
  },
  {
    id: 19,
    title: "Nhân viên đóng gói Part Time",
    company: "Công ty Cổ phần Tỏa Sáng",
    location: "Miền Nam",
    salary: "26,000 đ/h - Trung bình 4,000,000 – 4,500,000 VNĐ/tháng",
    description:
      "Công ty Cổ phần Tỏa Sáng tuyển dụng nhân viên đóng gói Part Time. Mô tả công việc: Kiểm tra sửa lỗi sản phẩm cụ thể là cọ, bông, lược,... Đóng gói và dán tem, QR theo hướng dẫn. Đếm số lượng hàng hóa và hỗ trợ đội nhóm theo yêu cầu trong phạm vi công việc. Thời gian làm việc: Từ thứ 2 đến thứ 7 gồm 2 ca: Từ 8h – 12h và từ 13h-17h, có thể đăng ký 1 ngày làm việc nhưng không khuyến khích tần suất nhiều. Quyền lợi: Nhận lương theo tháng, tham gia BHXH, được đăng ký ca mỗi tuần làm việc linh động, được hướng dẫn và tạo điều kiện môi trường hòa nhập.",
    requirements: [
      "Số lượng: 8-15 người",
      "Các bạn lao động khuyết tật có thể nhìn được",
      "Khả năng di chuyển hạn chế vẫn ứng tuyển được",
      "Tỉ mỉ, tập trung làm việc",
      "Trên 18 tuổi",
    ],
    disabilityTypes: ["Vận động", "Khiếm thị"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "🏭",
    contact: "Zalo: 0399988336",
    address: "70 đường số 2, phường Bình Trưng, thành phố HCM",
    email: "",
    website: "https://toolinmyroom.com/",
  },
  {
    id: 20,
    title: "Nhân viên chăm sóc khách hàng",
    company: "Renrui International",
    location: "Miền Nam",
    salary: "10 – 25 triệu VNĐ/tháng (tùy năng lực)",
    description:
      "Renrui International tuyển dụng nhân viên chăm sóc khách hàng và nhân viên bán hàng. Công việc: Chăm sóc khách hàng, tư vấn và hỗ trợ khách hàng, xử lý đơn hàng và yêu cầu của khách hàng. Môi trường làm việc: Cơ sở làm việc có tiếp cận xe lăn, hỗ trợ phỏng vấn online nếu phù hợp mới đến TPHCM để nhận việc.",
    requirements: [
      "Chăm chỉ, biết lắng nghe",
      "Hoạt bát, nhanh nhẹn",
      "Giao tiếp rõ ràng, phát âm chuẩn (có thể nói chậm nhưng không mang giọng vùng miền)",
      "Kỹ năng tin học cơ bản: nhập liệu, tìm kiếm thông tin trên mạng",
      "Trình độ tối thiểu: Tốt nghiệp THCS (cấp 2)",
      "Người khuyết tật vận động (cơ sở làm việc có tiếp cận xe lăn)",
      "Có khả năng chủ động sinh hoạt cá nhân, đi lại và ăn uống",
    ],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "💼",
    contact: "",
    address: "Quận 9, Quận 11, Quận 12 – TP. Hồ Chí Minh",
    email: "",
    website: "",
  },
  {
    id: 21,
    title: "Nhân viên bán hàng",
    company: "Renrui International",
    location: "Miền Nam",
    salary: "10 – 25 triệu VNĐ/tháng (tùy năng lực)",
    description:
      "Renrui International tuyển dụng nhân viên bán hàng. Công việc: Tư vấn sản phẩm, bán hàng, chăm sóc khách hàng. Môi trường làm việc: Cơ sở làm việc có tiếp cận xe lăn, hỗ trợ phỏng vấn online nếu phù hợp mới đến TPHCM để nhận việc.",
    requirements: [
      "Chăm chỉ, biết lắng nghe",
      "Hoạt bát, nhanh nhẹn",
      "Giao tiếp rõ ràng, phát âm chuẩn (có thể nói chậm nhưng không mang giọng vùng miền)",
      "Kỹ năng tin học cơ bản: nhập liệu, tìm kiếm thông tin trên mạng",
      "Trình độ tối thiểu: Tốt nghiệp THCS (cấp 2)",
      "Người khuyết tật vận động (cơ sở làm việc có tiếp cận xe lăn)",
      "Có khả năng chủ động sinh hoạt cá nhân, đi lại và ăn uống",
    ],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "💼",
    contact: "",
    address: "Quận 9, Quận 11, Quận 12 – TP. Hồ Chí Minh",
    email: "",
    website: "",
  },
  {
    id: 22,
    title: "Nhân viên siêu thị",
    company: "Mega Market",
    location: "Miền Nam",
    salary: "Theo thỏa thuận",
    description:
      "Mega Market tuyển dụng nhân viên siêu thị. Công việc: Phục vụ khách hàng, sắp xếp hàng hóa, hỗ trợ tại quầy thanh toán. Môi trường làm việc thân thiện, hỗ trợ người khuyết tật.",
    requirements: [
      "Người khuyết tật có khả năng làm việc",
      "Nhiệt tình, thân thiện với khách hàng",
      "Có thể đứng hoặc ngồi làm việc",
    ],
    disabilityTypes: ["Vận động", "Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "🛒",
    contact: "",
    address: "Quận 12 và Quận 2 (cũ), TPHCM",
    email: "",
    website: "",
  },
  {
    id: 23,
    title: "Nhân viên siêu thị",
    company: "Bs'mart",
    location: "Miền Nam",
    salary: "Theo thỏa thuận",
    description:
      "Bs'mart tuyển dụng nhân viên siêu thị. Công việc: Phục vụ khách hàng, sắp xếp hàng hóa, hỗ trợ tại quầy thanh toán. Môi trường làm việc thân thiện, hỗ trợ người khuyết tật. Địa điểm làm việc tùy theo nhu cầu ứng viên.",
    requirements: [
      "Người khuyết tật có khả năng làm việc",
      "Nhiệt tình, thân thiện với khách hàng",
      "Có thể đứng hoặc ngồi làm việc",
    ],
    disabilityTypes: ["Vận động", "Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "🛒",
    contact: "",
    address: "Tùy theo nhu cầu ứng viên, TPHCM",
    email: "",
    website: "",
  },
  {
    id: 24,
    title: "Chăm sóc khách hàng - App taxi công nghệ",
    company: "Concentrix",
    location: "Miền Nam",
    salary: "Theo thỏa thuận",
    description:
      "Concentrix tuyển dụng nhân viên chăm sóc khách hàng cho app taxi công nghệ. Công việc: Hỗ trợ khách hàng qua điện thoại, xử lý yêu cầu và khiếu nại, tư vấn dịch vụ. Môi trường làm việc chuyên nghiệp, hỗ trợ người khuyết tật.",
    requirements: [
      "Người khuyết tật có khả năng giao tiếp tốt",
      "Giọng nói rõ ràng, dễ nghe",
      "Kỹ năng tin học cơ bản",
      "Nhiệt tình, kiên nhẫn với khách hàng",
    ],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "📞",
    contact: "",
    address: "TPHCM",
    email: "",
    website: "",
  },
  {
    id: 25,
    title: "Nhân viên chốt đơn hàng",
    company: "Concentrix",
    location: "Miền Nam",
    salary: "Theo thỏa thuận",
    description:
      "Concentrix tuyển dụng nhân viên chốt đơn hàng. Công việc: Tư vấn khách hàng, chốt đơn hàng, xử lý đơn hàng qua điện thoại. Môi trường làm việc chuyên nghiệp, hỗ trợ người khuyết tật.",
    requirements: [
      "Người khuyết tật có khả năng giao tiếp tốt",
      "Giọng nói rõ ràng, dễ nghe",
      "Kỹ năng tin học cơ bản",
      "Nhiệt tình, thuyết phục tốt",
    ],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "📞",
    contact: "",
    address: "TPHCM",
    email: "",
    website: "",
  },
  {
    id: 26,
    title: "Nhân viên Tư vấn dinh dưỡng",
    company: "Concentrix",
    location: "Miền Nam",
    salary: "Theo thỏa thuận",
    description:
      "Concentrix tuyển dụng nhân viên tư vấn dinh dưỡng. Công việc: Tư vấn dinh dưỡng cho khách hàng, hỗ trợ khách hàng lựa chọn sản phẩm phù hợp. Môi trường làm việc chuyên nghiệp, hỗ trợ người khuyết tật.",
    requirements: [
      "Người khuyết tật có khả năng giao tiếp tốt",
      "Giọng nói rõ ràng, dễ nghe",
      "Kỹ năng tin học cơ bản",
      "Có kiến thức về dinh dưỡng là một lợi thế",
      "Nhiệt tình, tư vấn chuyên nghiệp",
    ],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "📞",
    contact: "",
    address: "TPHCM",
    email: "",
    website: "",
  },
  {
    id: 27,
    title: "Nhân viên may và thủ công",
    company: "Xưởng may",
    location: "Miền Nam",
    salary: "5 – 7 triệu/tháng (tùy năng lực)",
    description:
      "Xưởng may tuyển dụng nhân viên may và thủ công. Công việc: May sản phẩm theo yêu cầu. Thời gian làm việc: 8:00 – 17:00 (Thứ Hai – Thứ Bảy). Chế độ: Được hưởng đầy đủ các chế độ theo quy định của Nhà nước. Ăn ở tự túc.",
    requirements: [
      "Nhanh nhẹn, khéo tay",
      "Biết sử dụng máy may",
      "Có thể làm việc độc lập",
      "Tỉ mỉ, cẩn thận",
    ],
    disabilityTypes: ["Vận động"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "🧵",
    contact: "",
    address: "144 Đường Số 1A, Phường Bình Hưng Hoà B, Quận Bình Tân, TP.HCM",
    email: "",
    website: "",
  },
  {
    id: 28,
    title: "Lao động phổ thông - Người Khiếm thính/Điếc",
    company: "Công ty DAESIN",
    location: "Miền Bắc",
    salary:
      "8 – 12 triệu/tháng (Lương cơ bản: 5.003.200 đồng/tháng + Phụ cấp: 1.000.000 đồng/tháng)",
    description:
      "Công ty DAESIN tuyển dụng lao động phổ thông dành cho người Khiếm thính/Điếc. Làm việc tại KCN Điềm Thụy, Phú Bình, Thái Nguyên. Chế độ: Lương cơ bản 5.003.200 đồng/tháng, phụ cấp 1.000.000 đồng/tháng, cung cấp suất ăn miễn phí, thưởng lương tháng 13 và các dịp lễ tết, tham gia BHXH, BHYT, BHTN đầy đủ, có ký túc xá cho công nhân xa nhà. Nhận việc ngay sau khi trúng tuyển, hồ sơ thiếu có thể bổ sung sau.",
    requirements: [
      "Nam/nữ đủ 18 tuổi",
      "Người Khiếm thính/Điếc",
      "Không yêu cầu bằng cấp",
      "Nhận việc ngay sau khi trúng tuyển",
      "Hồ sơ thiếu có thể bổ sung sau",
    ],
    disabilityTypes: ["Khiếm thính"],
    severityLevel: "Nhẹ",
    status: "active",
    employerAvatar: "🏭",
    contact: "0392 928 623 – 0984 269 683",
    address: "KCN Điềm Thụy, Phú Bình, Thái Nguyên",
    email: "",
    website: "",
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

// Scholarships - Học bổng
export const scholarships = [
  {
    id: 1,
    title: "Học bổng chính sách nhà nước",
    organization:
      "Bộ GD&ĐT, Bộ LĐTBXH, UBND tỉnh/thành phố, Quỹ Bảo trợ trẻ em, Hội Khuyến học",
    description:
      "Chương trình học bổng chính sách nhà nước dành cho người khuyết tật đang học chính quy từ phổ thông đến đại học, học nghề. Ưu tiên NKT nghèo, cận nghèo, mồ côi hoặc dân tộc thiểu số.",
    location: "Toàn quốc",
    contact: "Liên hệ Bộ GD&ĐT, Bộ LĐTBXH hoặc UBND địa phương",
    image: "https://picsum.photos/800/600?random=1",
    requirements: [
      "Người khuyết tật (có giấy xác nhận khuyết tật)",
      "Học sinh, sinh viên đang học chính quy: phổ thông, trung cấp, cao đẳng, đại học, học nghề",
      "Ưu tiên NKT nghèo, cận nghèo, mồ côi hoặc dân tộc thiểu số",
      "Học sinh: hạnh kiểm khá trở lên, có tiến bộ",
      "Sinh viên: điểm trung bình học kỳ/năm >= 6,5–7,0 (tùy chương trình)",
      "Học chính quy, không bị kỷ luật nặng",
    ],
    documents: [
      "Giấy xác nhận/giám định khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn (nếu có)",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng theo mẫu",
    ],
    amount: "Theo quy định của từng chương trình",
  },
  {
    id: 2,
    title: "Tiếp Sức Đến Trường (2025)",
    organization: "Quỹ Vì Trẻ Em Khuyết Tật + Đoàn Thanh niên Bộ Ngoại giao",
    description:
      "Chương trình học bổng dành cho học sinh khuyết tật từ tiểu học đến THPT tại 12 tỉnh được triển khai. Mỗi suất học bổng trị giá 4 triệu đồng + quà học tập.",
    location: "12 tỉnh được triển khai",
    contact: "Quỹ Vì Trẻ Em Khuyết Tật",
    image: "https://picsum.photos/800/600?random=2",
    requirements: [
      "Là học sinh khuyết tật (có giấy xác nhận khuyết tật cấp xã)",
      "Hoàn cảnh khó khăn/hộ nghèo/cận nghèo",
      "Đang theo học từ tiểu học → THPT tại tỉnh được triển khai",
      "Hạnh kiểm tốt, điểm học tập trung bình trở lên",
      "Chưa nhận học bổng khác có giá trị tương đương trong cùng thời điểm",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy xác nhận hộ nghèo/cận nghèo (nếu có)",
      "Xác nhận của trường về kết quả học tập",
    ],
    amount: "1.200 suất học bổng, mỗi suất 4 triệu đồng + quà học tập",
  },
  {
    id: 3,
    title: "Học bổng 'Vì tương lai' – Học sinh khuyết tật, mồ côi Hóc Môn",
    organization: "Công ty Minh Quang + MTTQ Huyện Hóc Môn",
    description:
      "Chương trình học bổng dành cho học sinh khuyết tật hoặc mồ côi ở Hóc Môn, thuộc hộ khó khăn hoặc gia đình lao động thu nhập thấp, có nhu cầu tiếp tục đi học.",
    location: "Huyện Hóc Môn, TP.HCM",
    contact: "MTTQ Huyện Hóc Môn",
    image: "https://picsum.photos/800/600?random=3",
    requirements: [
      "Học sinh khuyết tật hoặc mồ côi ở Hóc Môn",
      "Thuộc hộ khó khăn/gia đình lao động thu nhập thấp",
      "Có nhu cầu tiếp tục đi học",
    ],
    documents: [
      "Giấy chứng nhận khuyết tật (nếu thuộc nhóm NKT)",
      "Xác nhận hộ nghèo/hoàn cảnh khó khăn",
      "Giấy xác nhận đang là học sinh",
    ],
    amount:
      "47 suất học bổng năm học 2024-2025, tổng ~67,2 triệu đồng + 1.000 quyển tập",
  },
  {
    id: 4,
    title: "Học bổng SCG 'Sharing the Dream'",
    organization: "Tập đoàn SCG",
    description:
      "Chương trình học bổng dành cho sinh viên đại học chính quy tại Việt Nam. SCG ưu tiên sinh viên khuyết tật (không bắt buộc nhưng tăng điểm xét).",
    location: "Toàn quốc",
    contact: "Tập đoàn SCG",
    image: "https://picsum.photos/800/600?random=4",
    requirements: [
      "Là sinh viên đại học chính quy tại VN",
      "SCG ưu tiên sinh viên khuyết tật (không bắt buộc nhưng tăng điểm xét)",
      "Điểm trung bình ≥ 7.0 hoặc theo chuẩn từng năm",
      "Hoạt động cộng đồng (có lợi thế)",
    ],
    documents: [
      "Giấy chứng nhận khuyết tật hoặc hồ sơ y tế liên quan",
      "Bảng điểm",
      "Hồ sơ hoạt động cộng đồng",
    ],
    amount: "Theo quy định của chương trình",
  },
  {
    id: 5,
    title: "Học bổng MoMo cho trẻ em khuyết tật",
    organization:
      "MoMo (ứng dụng tài chính) + Quỹ Vì Trẻ Em Khuyết Tật Việt Nam",
    description:
      "Chương trình học bổng dành cho trẻ em khuyết tật từ 6–18 tuổi, học sinh đang học tại các trường trong danh sách 12 tỉnh. Hoàn cảnh khó khăn được ưu tiên.",
    location: "12 tỉnh",
    contact: "Quỹ Vì Trẻ Em Khuyết Tật Việt Nam",
    image: "https://picsum.photos/800/600?random=5",
    requirements: [
      "Trẻ em khuyết tật từ 6–18 tuổi",
      "Học sinh đang học tại các trường trong danh sách 12 tỉnh",
      "Hoàn cảnh khó khăn được ưu tiên",
    ],
    documents: [
      "Giấy chứng nhận khuyết tật",
      "Giấy xác nhận hoàn cảnh từ địa phương hoặc nhà trường",
    ],
    amount: "50 suất học bổng, mỗi suất 4.000.000 đ",
  },
  {
    id: 6,
    title: "Chính sách học bổng + hỗ trợ theo Thông tư 42/2013",
    organization: "Nhà nước (BGDĐT, LĐTBXH, BTC)",
    description:
      "Chương trình học bổng và hỗ trợ học tập theo Thông tư 42/2013 dành cho học sinh, sinh viên khuyết tật nghèo hoặc cận nghèo. Bao gồm quỹ học bổng + hỗ trợ học tập, phương tiện học tập.",
    location: "Toàn quốc",
    contact: "Bộ GD&ĐT, Bộ LĐTBXH",
    image: "https://picsum.photos/800/600?random=6",
    requirements: [
      "Học sinh, sinh viên khuyết tật nghèo hoặc cận nghèo",
      "Đang học chính quy",
      "Có giấy xác nhận khuyết tật",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hộ nghèo/cận nghèo",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng theo mẫu",
    ],
    amount: "Theo quy định Thông tư 42/2013",
  },
  {
    id: 7,
    title: "Học bổng tỉnh Đồng Nai cho NKT",
    organization: "Hội Khuyến học tỉnh Đồng Nai",
    description:
      "Chương trình học bổng dành cho học sinh, sinh viên khuyết tật có hộ khẩu Đồng Nai, có nỗ lực học tập, hạnh kiểm tốt, thuộc hộ nghèo/cận nghèo hoặc có hoàn cảnh khó khăn.",
    location: "Tỉnh Đồng Nai",
    contact: "Hội Khuyến học tỉnh Đồng Nai",
    image: "https://picsum.photos/800/600?random=7",
    requirements: [
      "Học sinh, sinh viên khuyết tật có hộ khẩu Đồng Nai",
      "Có nỗ lực học tập, hạnh kiểm tốt",
      "Thuộc hộ nghèo/cận nghèo hoặc có hoàn cảnh khó khăn",
    ],
    documents: [
      "Giấy chứng nhận khuyết tật",
      "Xác nhận của trường và chính quyền địa phương",
      "Học bạ/bảng điểm",
    ],
    amount: "Theo quy định của tỉnh",
  },
  {
    id: 8,
    title: "Học bổng Australia Awards (Việt Nam)",
    organization: "Chính phủ Australia",
    description:
      "Chương trình học bổng du học của Chính phủ Australia. Không phải chương trình dành riêng cho NKT nhưng nâng điểm ưu tiên cho người khuyết tật khi xét học bổng du học.",
    location: "Toàn quốc",
    contact: "Australia Awards Vietnam",
    image: "https://picsum.photos/800/600?random=8",
    requirements: [
      "Tốt nghiệp ĐH",
      "Tiếng Anh đủ yêu cầu (IELTS 6.5 trở lên tùy ngành)",
      "Có hồ sơ hoạt động hoặc thành tích",
      "Ưu tiên người khuyết tật khi xét học bổng du học",
    ],
    documents: [
      "Giấy chứng nhận khuyết tật hoặc bằng chứng y tế tương đương",
      "Bằng tốt nghiệp ĐH",
      "Chứng chỉ tiếng Anh",
      "Hồ sơ hoạt động/thành tích",
    ],
    amount: "Học bổng du học toàn phần",
  },
  {
    id: 9,
    title: "PNJ – 'Nâng bước em đến trường'",
    organization: "Công ty CP Vàng bạc Đá quý Phú Nhuận – PNJ",
    description:
      "Chương trình học bổng và hỗ trợ dụng cụ học tập dành cho học sinh khuyết tật có hoàn cảnh khó khăn, duy trì học lực tối thiểu.",
    location: "Toàn quốc",
    contact: "Công ty PNJ",
    image: "https://picsum.photos/800/600?random=9",
    requirements: [
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "3–5 triệu/năm + hỗ trợ dụng cụ học tập",
  },
  {
    id: 10,
    title: "ThienLong – 'Cấp học bổng dụng cụ học tập'",
    organization: "Thiên Long Group",
    description:
      "Chương trình cấp học bổng và bộ dụng cụ học tập dành cho học sinh khuyết tật có hoàn cảnh khó khăn, duy trì học lực tối thiểu.",
    location: "Toàn quốc",
    contact: "Thiên Long Group",
    image: "https://picsum.photos/800/600?random=10",
    requirements: [
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "Bộ dụng cụ học tập, học bổng 1–3 triệu",
  },
  {
    id: 11,
    title: "Suntory PepsiCo – 'Mizuiku: Em yêu nước sạch' (ưu tiên NKT)",
    organization: "Suntory PepsiCo",
    description:
      "Chương trình hỗ trợ học phí, nước sạch, dụng cụ học tập dành cho học sinh khuyết tật có hoàn cảnh khó khăn, duy trì học lực tối thiểu.",
    location: "Toàn quốc",
    contact: "Suntory PepsiCo",
    image: "https://picsum.photos/800/600?random=11",
    requirements: [
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "Hỗ trợ học phí, nước sạch, dụng cụ học tập",
  },
  {
    id: 12,
    title: "FPT – Học bổng Khuyến học dành cho học sinh đặc biệt",
    organization: "Tập đoàn FPT",
    description:
      "Chương trình học bổng dành cho học sinh đặc biệt, bao gồm học sinh khuyết tật. Dành cho các trường liên kết của FPT và các quỹ tỉnh.",
    location: "Toàn quốc",
    contact: "Tập đoàn FPT",
    image: "https://picsum.photos/800/600?random=12",
    requirements: [
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
      "Dành cho các trường liên kết của FPT và các quỹ tỉnh",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "3–10 triệu/năm",
  },
  {
    id: 13,
    title: "Prudential – 'Pru Tương Lai Tươi Sáng'",
    organization: "Prudential Việt Nam",
    description:
      "Chương trình học bổng dành cho học sinh nghèo, yếu thế, bao gồm học sinh khuyết tật. Dành cho các trường liên kết của FPT và các quỹ tỉnh.",
    location: "Toàn quốc",
    contact: "Prudential Việt Nam",
    image: "https://picsum.photos/800/600?random=13",
    requirements: [
      "Học sinh nghèo, yếu thế, bao gồm học sinh khuyết tật",
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "2–5 triệu/năm",
  },
  {
    id: 14,
    title: "Caritas Việt Nam – Học bổng cho trẻ khuyết tật",
    organization: "Caritas (thuộc Giáo hội Công giáo)",
    description:
      "Chương trình học bổng và hỗ trợ dành cho trẻ khuyết tật, trẻ tự kỷ, trẻ bại não. Bao gồm học phí, phục hồi chức năng, học bổng.",
    location: "Toàn quốc",
    contact: "Caritas Việt Nam",
    image: "https://picsum.photos/800/600?random=14",
    requirements: [
      "Trẻ khuyết tật, trẻ tự kỷ, trẻ bại não",
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "Học phí, phục hồi chức năng, học bổng 1–5 triệu",
  },
  {
    id: 15,
    title: "Blue Dragon Children's Foundation",
    organization: "Blue Dragon Children's Foundation",
    description:
      "Chương trình tài trợ học phí toàn phần, thiết bị học tập, hỗ trợ cá nhân dành cho trẻ em đường phố, trẻ em bị buôn bán, trẻ em khuyết tật.",
    location: "Toàn quốc",
    contact: "Blue Dragon Children's Foundation",
    image: "https://picsum.photos/800/600?random=15",
    requirements: [
      "Trẻ em đường phố, trẻ em bị buôn bán, trẻ em khuyết tật",
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "Tài trợ học phí toàn phần, thiết bị học tập, hỗ trợ cá nhân",
  },
  {
    id: 16,
    title:
      "Saigon Children's Charity (Saigonchildren) – Child Development Scholarship",
    organization: "Saigon Children's Charity",
    description:
      "Chương trình học bổng dành cho trẻ em khó khăn, trẻ khuyết tật được ưu tiên mạnh. Bao gồm học phí, xe đạp, thiết bị học tập, trợ cấp hằng tháng.",
    location: "Toàn quốc",
    contact: "Saigon Children's Charity",
    image: "https://picsum.photos/800/600?random=16",
    requirements: [
      "Trẻ em khó khăn, trẻ khuyết tật được ưu tiên mạnh",
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "Học phí, xe đạp, thiết bị học tập, trợ cấp hằng tháng",
  },
  {
    id: 17,
    title: "VinaCapital Foundation (Vicare)",
    organization: "VinaCapital Foundation",
    description:
      "Chương trình tài trợ học phí ngắn hạn hoặc dài hạn dành cho trẻ em khuyết tật tim bẩm sinh hoặc bệnh nặng.",
    location: "Toàn quốc",
    contact: "VinaCapital Foundation",
    image: "https://picsum.photos/800/600?random=17",
    requirements: [
      "Trẻ em khuyết tật tim bẩm sinh hoặc bệnh nặng",
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "Tài trợ học phí ngắn hạn hoặc dài hạn",
  },
  {
    id: 18,
    title: "AAV – ActionAid Vietnam",
    organization: "ActionAid Vietnam",
    description:
      "Chương trình học bổng, dụng cụ học tập, mentor dành cho trẻ em yếu thế, bao gồm trẻ khuyết tật.",
    location: "Toàn quốc",
    contact: "ActionAid Vietnam",
    image: "https://picsum.photos/800/600?random=18",
    requirements: [
      "Trẻ em yếu thế, bao gồm trẻ khuyết tật",
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "Học bổng, dụng cụ học tập, mentor",
  },
  {
    id: 19,
    title: "Quỹ Bảo Trợ Trẻ Em Việt Nam",
    organization: "Bộ LĐTBXH",
    description:
      "Chương trình học bổng trẻ khuyết tật, phẫu thuật phục hồi chức năng, thiết bị hỗ trợ học tập dành cho trẻ em khuyết tật có hoàn cảnh khó khăn.",
    location: "Toàn quốc",
    contact: "Quỹ Bảo Trợ Trẻ Em Việt Nam",
    image: "https://picsum.photos/800/600?random=19",
    requirements: [
      "Trẻ em khuyết tật",
      "Có giấy xác nhận khuyết tật",
      "Hoàn cảnh khó khăn",
      "Duy trì học lực tối thiểu",
      "Nộp hồ sơ đầy đủ và đúng hạn",
    ],
    documents: [
      "Giấy xác nhận khuyết tật",
      "Giấy chứng minh hoàn cảnh khó khăn",
      "Học bạ/bảng điểm",
      "Đơn xin học bổng",
    ],
    amount: "1–20 triệu tùy trường hợp",
  },
];

// Charity programs - Tổ chức từ thiện
export const charityPrograms = [
  // MIỀN BẮC
  {
    id: 1,
    title: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    organization: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    description:
      "Cải thiện chất lượng cuộc sống cho trẻ khuyết tật, trẻ mồ côi và các em nhỏ có hoàn cảnh khó khăn, Quỹ đã không ngừng nỗ lực mang lại hy vọng và niềm tin cho các em qua những chương trình thiết thực và lâu dài.",
    location: "Miền Bắc",
    contact: "+84 865 019 639",
    email: "contact@vitreemkhuyettat.org",
    website: "vitreemkhuyettat.org",
    facebook: "https://www.facebook.com/vitreemkhuyettatvietnam/#",
    address:
      "Tầng 11 Tòa Mipec Office, số 229 Tây Sơn, phường Ngã Tư Sở, Quận Đống Đa, Hà Nội",
    bankAccount: "0312 - Ngân hàng TMCP Quân đội (MBBank)",
    image: "https://picsum.photos/800/600?random=20",
  },
  {
    id: 2,
    title: "Viện Nghiên cứu phát triển cộng đồng (ACDC)",
    organization: "Viện Nghiên cứu phát triển cộng đồng (ACDC)",
    description:
      "Tổ chức đặt mục tiêu thúc đẩy thay đổi nhận thức xã hội về khuyết tật, góp phần hoàn thiện luật và chính sách cho người khuyết tật và các nhóm yếu thế. Chúng tôi tập trung mở rộng các dịch vụ hỗ trợ, xây dựng và duy trì mạng lưới người khuyết tật để đưa tiếng nói của họ vươn xa. Đồng thời, ACDC không ngừng nâng cao năng lực nội tại để bảo đảm hiệu quả và bền vững trong mọi hoạt động.",
    location: "Miền Bắc",
    contact: "+84 24 6675 3946 hoặc +84 24 6291 0814",
    email: "admin@acdc.org.vn",
    website: "https://accdc.vn",
    facebook: "https://www.facebook.com/acdcvn/?ref=embed_page#",
    address:
      "Tầng 2, tòa B, chung cư Bộ Công An, cuối ngõ 282 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội",
    image: "https://picsum.photos/800/600?random=21",
  },
  {
    id: 3,
    title: "Hội Chữ thập đỏ Việt Nam",
    organization: "Hội Chữ thập đỏ Việt Nam",
    description:
      "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng với mục đích cao cả là nhân đạo, hòa bình, hữu nghị, góp phần thực hiện mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh. Hội chăm lo hỗ trợ về vật chất và tinh thần cho những người khó khăn, nạn nhân chiến tranh, nạn nhân thiên tai, thảm họa; tham gia chăm sóc sức khỏe ban đầu cho nhân dân; vận động các tổ chức, cá nhân tham gia các hoạt động nhân đạo do Hội tổ chức.",
    location: "Miền Bắc",
    contact: "+84 24 3822 4030",
    email: "vanphongctd@gmail.com hoặc international@redcross.org.vn",
    website: "https://redcross.org.vn/",
    facebook: "https://www.facebook.com/redcross.org.vn/",
    address: "Số 82, Nguyễn Du, phường Cửa Nam, Hà Nội",
    image: "https://picsum.photos/800/600?random=22",
  },
  {
    id: 4,
    title: "Tổ chức Tình nguyện vì Giáo dục (V.E.O)",
    organization: "Tổ chức Tình nguyện vì Giáo dục (V.E.O)",
    description:
      "Tổ chức là một cộng đồng mạng lưới kết nối các tình nguyện viên trên toàn thế giới nhằm chung tay giúp đỡ những đối tượng khó khăn, trong đó có người khuyết tật, thông qua các chương trình giáo dục của tổ chức.",
    location: "Miền Bắc",
    contact: "+84 70 508 1088",
    email: "info@volunteerforeducation.org",
    website: "https://www.veo.com.vn/",
    facebook: "https://www.facebook.com/veovolunteer/?locale=vi_VN",
    address: "Tầng 3, Tòa nhà D12 Giảng Võ, Ba Đình, Hà Nội",
    image: "https://picsum.photos/800/600?random=23",
  },
  {
    id: 5,
    title: "Hội Cứu trợ trẻ em tàn tật Việt Nam",
    organization: "Hội Cứu trợ trẻ em tàn tật Việt Nam",
    description: "Hội Cứu trợ trẻ em tàn tật Việt Nam",
    location: "Miền Bắc",
    contact: "+84 24 3853 2785",
    email: "cuutrotretantat@gmail.com",
    website: "https://cuutrotreemtantat.com.vn/hoi-cuu-tro-tu-thien-khac/",
    address: "Số 42, Ngô Thì Nhậm, Phường Hai Bà Trưng, Hà Nội",
    bankAccount:
      "Tên tài khoản: Hội Cứu trợ trẻ em tàn tật Việt Nam | Số tài khoản: 0021 0000 19233 | Ngân hàng: Vietcombank",
    image: "https://picsum.photos/800/600?random=24",
  },
  {
    id: 6,
    title: "Hội Nạn nhân chất độc da cam/dioxin Việt Nam",
    organization: "Hội Nạn nhân chất độc da cam/dioxin Việt Nam",
    description:
      "Hội được thành lập nhằm huy động mọi tiềm năng của xã hội, của các nhà hảo tâm trong nước và nước ngoài, tạo mọi điều kiện giúp đỡ để những nạn nhân chất độc da cam và gia đình hòa nhập cộng đồng, xã hội góp phần vào sự nghiệp xây dựng và bảo vệ Tổ quốc Việt Nam Xã hội Chủ nghĩa.",
    location: "Miền Bắc",
    contact:
      "Điện thoại Văn phòng: +84 246 265 2642 | Quỹ: +84 246 672 5588 | Tạp chí Da cam Việt Nam: +84 246 265 2654",
    email: "vava.org.vn@gmail.com",
    website: "vava.org.vn",
    address: "Số 35 đường Hồ Mễ Trì, phường Yên Hòa, Hà Nội",
    bankAccount:
      "Tên tài khoản: QUY NAN NHAN CHAT DOC DA CAM/DIOXIN VN | Số tài khoản: 0011000863681 | Ngân hàng: Vietcombank",
    moreInfo:
      "Thông tin chi tiết các tỉnh thành: https://vava.org.vn/thong-tin-cac-tinh-thanh-hoi-tren-ca-nuoc",
    image: "https://picsum.photos/800/600?random=25",
  },

  // MIỀN TRUNG
  {
    id: 7,
    title: "Viện Nghiên cứu phát triển cộng đồng (ACDC)",
    organization: "Viện Nghiên cứu phát triển cộng đồng (ACDC)",
    description:
      "Tổ chức đặt mục tiêu thúc đẩy thay đổi nhận thức xã hội về khuyết tật, góp phần hoàn thiện luật và chính sách cho người khuyết tật và các nhóm yếu thế. Chúng tôi tập trung mở rộng các dịch vụ hỗ trợ, xây dựng và duy trì mạng lưới người khuyết tật để đưa tiếng nói của họ vươn xa. Đồng thời, ACDC không ngừng nâng cao năng lực nội tại để bảo đảm hiệu quả và bền vững trong mọi hoạt động.",
    location: "Miền Trung",
    contact:
      "Huế: +84 234 381 0217 hoặc +84 234 626 5454 | Quảng Trị: +84 233 3520 001 hoặc +84 233 3504 898 | Đà Nẵng: +84 235 6534 357",
    email: "admin@acdc.org.vn",
    website: "https://accdc.vn",
    facebook: "https://www.facebook.com/acdcvn/?ref=embed_page#",
    address:
      "Huế: Tầng 1, Shophouse A32, đường số 2, KĐT The Manor Crown, 62 Tố Hữu, phường Vỹ Dạ, Thành phố Huế | Quảng Trị: Khu Trung tâm phục vụ Đối ngoại, số 18 Nguyễn Cơ Thạch, phường Nam Đông Hà, tỉnh Quảng Trị | Đà Nẵng: Số 48 - 50 Nguyễn Phước Lan, phường Hoà Xuân, Thành phố Đà Nẵng",
    image: "https://picsum.photos/800/600?random=26",
  },
  {
    id: 8,
    title: "Hội Nạn nhân chất độc da cam/dioxin Việt Nam",
    organization: "Hội Nạn nhân chất độc da cam/dioxin Việt Nam",
    description:
      "Hội được thành lập nhằm huy động mọi tiềm năng của xã hội, của các nhà hảo tâm trong nước và nước ngoài, tạo mọi điều kiện giúp đỡ để những nạn nhân chất độc da cam và gia đình hòa nhập cộng đồng, xã hội góp phần vào sự nghiệp xây dựng và bảo vệ Tổ quốc Việt Nam Xã hội Chủ nghĩa.",
    location: "Miền Trung",
    contact:
      "Điện thoại Văn phòng: +84 246 265 2642 | Quỹ: +84 246 672 5588 | Tạp chí Da cam Việt Nam: +84 246 265 2654",
    email: "vava.org.vn@gmail.com",
    website: "vava.org.vn",
    address: "Số 35 đường Hồ Mễ Trì, phường Yên Hòa, Hà Nội",
    bankAccount:
      "Tên tài khoản: QUY NAN NHAN CHAT DOC DA CAM/DIOXIN VN | Số tài khoản: 0011000863681 | Ngân hàng: Vietcombank",
    moreInfo:
      "Thông tin chi tiết các tỉnh thành: https://vava.org.vn/thong-tin-cac-tinh-thanh-hoi-tren-ca-nuoc",
    image: "https://picsum.photos/800/600?random=27",
  },

  // MIỀN NAM
  {
    id: 9,
    title: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    organization: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    description:
      "Quỹ Vì trẻ em khuyết tật Việt Nam, một tổ chức phi lợi nhuận hoạt động trong lĩnh vực nhân đạo và từ thiện, được chính thức thành lập từ năm 2010 theo quyết định của Bộ Nội Vụ. Với sứ mệnh cải thiện chất lượng cuộc sống cho trẻ khuyết tật, trẻ mồ côi và các em nhỏ có hoàn cảnh khó khăn, Quỹ đã không ngừng nỗ lực mang lại hy vọng và niềm tin cho các em qua những chương trình thiết thực và lâu dài.",
    location: "Miền Nam",
    contact: "+84 865 019 639",
    email: "contact@vitreemkhuyettat.org",
    website: "vitreemkhuyettat.org",
    facebook: "https://www.facebook.com/vitreemkhuyettatvietnam/#",
    address:
      "Số 184 Nam Kỳ Khởi Nghĩa, phường Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh",
    bankAccount: "0312 - Ngân hàng TMCP Quân đội (MBBank)",
    image: "https://picsum.photos/800/600?random=28",
  },
  {
    id: 10,
    title: "Hội Chữ thập đỏ Việt Nam",
    organization: "Hội Chữ thập đỏ Việt Nam",
    description:
      "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng với mục đích cao cả là nhân đạo, hòa bình, hữu nghị, góp phần thực hiện mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh. Hội chăm lo hỗ trợ về vật chất và tinh thần cho những người khó khăn, nạn nhân chiến tranh, nạn nhân thiên tai, thảm họa; tham gia chăm sóc sức khỏe ban đầu cho nhân dân; vận động các tổ chức, cá nhân tham gia các hoạt động nhân đạo do Hội tổ chức.",
    location: "Miền Nam",
    contact: "+84 24 3822 4030",
    email: "vanphongctd@gmail.com hoặc international@redcross.org.vn",
    website: "https://redcross.org.vn/",
    facebook: "https://www.facebook.com/redcross.org.vn/",
    address: "201 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh",
    image: "https://picsum.photos/800/600?random=29",
  },
  {
    id: 11,
    title: "Hội từ thiện trẻ em Sài Gòn",
    organization: "Hội từ thiện trẻ em Sài Gòn",
    description:
      "Giúp trẻ em Việt Nam có hoàn cảnh khó khăn được tiếp cận giáo dục và có sự khởi đầu tốt hơn trong cuộc sống. saigonchildren chỉ hoạt động tại Việt Nam và mọi hoạt động của tổ chức gắn liền với cam kết hỗ trợ trẻ em vượt qua những rào cản về kinh tế, địa lý, kiến thức và những khiếm khuyết để đến trường.",
    location: "Miền Nam",
    contact: "+84 28 3930 3502",
    fax: "+84 28 3930 3503",
    website: "https://www.saigonchildren.com/vi/",
    facebook: "https://www.facebook.com/Saigonchildren/",
    address: "59 Trần Quốc Thảo, phường Xuân Hòa, Thành phố Hồ Chí Minh",
    bankAccount:
      "Tên tài khoản: Saigon Children’s Charity CIO | Số tài khoản: 601704060507595 | Ngân hàng: VIB Bank | Địa chỉ ngân hàng: Tòa nhà Viettel, 285 Cách Mạng Tháng 08, Phường Hòa Hưng, TP.HCM",
    moreInfo:
      "Hoạt động tại: An Giang, TP. Cần Thơ, Đồng Nai, Đồng Tháp, Quảng Trị, Tây Ninh",
    image: "https://picsum.photos/800/600?random=30",
  },
  {
    id: 12,
    title: "Hội Nạn nhân chất độc da cam/dioxin Việt Nam",
    organization: "Hội Nạn nhân chất độc da cam/dioxin Việt Nam",
    description:
      "Hội được thành lập nhằm huy động mọi tiềm năng của xã hội, của các nhà hảo tâm trong nước và nước ngoài, tạo mọi điều kiện giúp đỡ để những nạn nhân chất độc da cam và gia đình hòa nhập cộng đồng, xã hội góp phần vào sự nghiệp xây dựng và bảo vệ Tổ quốc Việt Nam Xã hội Chủ nghĩa.",
    location: "Miền Nam",
    contact:
      "Điện thoại Văn phòng: +84 246 265 2642 | Quỹ: +84 246 672 5588 | Tạp chí Da cam Việt Nam: +84 246 265 2654",
    email: "vava.org.vn@gmail.com",
    website: "vava.org.vn",
    address: "Số 35 đường Hồ Mễ Trì, phường Yên Hòa, Hà Nội",
    bankAccount:
      "Tên tài khoản: QUY NAN NHAN CHAT DOC DA CAM/DIOXIN VN | Số tài khoản: 0011000863681 | Ngân hàng: Vietcombank",
    moreInfo:
      "Thông tin chi tiết các tỉnh thành: https://vava.org.vn/thong-tin-cac-tinh-thanh-hoi-tren-ca-nuoc",
    image: "https://picsum.photos/800/600?random=31",
  },
];

// Healthcare services
export const healthCareServices = [
  // Miền Bắc
  {
    id: 1,
    title: "Bệnh viện phục hồi chức năng Hà Nội",
    hospital: "Bệnh viện phục hồi chức năng Hà Nội",
    description:
      "Bệnh viện Phục hồi chức năng Hà Nội cung cấp các dịch vụ hỗ trợ người khuyết tật như khám – đánh giá chức năng, vật lý trị liệu, hoạt động trị liệu, ngôn ngữ trị liệu và phục hồi vận động sau chấn thương. Bệnh viện giúp cải thiện khả năng vận động, giao tiếp và sinh hoạt, đồng thời tư vấn dụng cụ trợ giúp để nâng cao chất lượng cuộc sống.",
    location: "Miền Bắc",
    contact: "082.881.0068 - Hotline: 0243.221.6229",
    address: "35 Lê Văn Thiêm – Thanh Xuân Trung, Thanh Xuân – Hà Nội",
    review:
      "Bệnh viện hàng đầu về vật lý trị liệu phục hồi chức năng ở Hà Nội. Nhân viên y tế toàn người trẻ, nhiệt tình, năng động, hướng dẫn bệnh nhân nhiệt tình. Không có bất cứ một sự vòi vĩnh nào ở đây cả. Chỉ sau 8 ngày tập luyện chăm chỉ, chân tôi từ gấp 90 độ đã gấp được khoảng 115 độ, bỏ được nạng và lấy được dáng đi chuẩn lúc đầu.",
  },
  {
    id: 2,
    title: "Trung tâm phục hồi người khuyết tật Thụy An",
    hospital: "Trung tâm phục hồi người khuyết tật Thụy An",
    description:
      "Bệnh viện cung cấp các dịch vụ hỗ trợ toàn diện cho người khuyết tật, bao gồm can thiệp cho trẻ tự kỷ, chăm sóc sức khỏe và theo dõi phát triển toàn diện, cùng các chương trình phục hồi chức năng vận động giúp cải thiện khả năng sinh hoạt và hòa nhập.",
    location: "Miền Bắc",
    contact: "+84 2433965366 - +84 2433965378 - Hotline: +84 984258991",
    address: "Thôn Áng Đông, xã Quảng Oai, TP. Hà Nội",
    email: "thuyancentre@yahoo.com",
    website: "www.thuyancentre.vn",
    fanpage: "https://fb.com/trungtamthuyan",
    review:
      "Một nơi có điều kiện rất tốt cho các cháu khuyết tật. Dù là lần đầu đến nhưng rất ấn tượng với các bé ở đây. Chúc tập thể thầy cô, bác sĩ, cán bộ và nhân viên trung tâm luôn mạnh khoẻ, hạnh phúc và bình an!",
  },
  {
    id: 3,
    title: "Trung tâm chăm sóc sức nghe hearLIFE (chi nhánh Hà Nội)",
    hospital: "Trung tâm chăm sóc sức nghe hearLIFE (chi nhánh Hà Nội)",
    description:
      "Trung tâm cung cấp các dịch vụ thăm khám và đánh giá thính lực toàn diện cho người khuyết tật, bao gồm kiểm tra và đo thính lực đơn âm, đánh giá khả năng nghe – phân biệt lời nói, nhĩ lượng và kiểm tra trở kháng. Ngoài ra, trung tâm thực hiện các kỹ thuật chuyên sâu như OAE, ABR, đánh giá rối loạn xử lý thính giác trung ương (CAPD) và các test kích thích Promontory/eABR nhằm hỗ trợ chẩn đoán và lựa chọn phương pháp can thiệp phù hợp.",
    location: "Miền Bắc",
    contact: "+84 243 203 6288",
    address: "202 Lê Trọng Tấn, Phương Liệt, Hà Nội",
    email: "enquiry@hearlifevietnam.com",
    review:
      "Thiết bị luôn được nâng tầm, cập nhập tiến bộ khoa học để đáp ứng tối ưu nhu cầu của khách hàng, dịch vụ thính học và phục hồi ngôn ngữ hữu hiệu hàng đầu đã đưa khách hàng hoà nhập vào cuộc sống âm thanh",
  },
  {
    id: 4,
    title: "Bệnh viện y học cổ truyền Trung Ương",
    hospital: "Bệnh viện y học cổ truyền Trung Ương",
    description:
      "Bệnh viện cung cấp dịch vụ phục hồi chức năng cho người khuyết tật bằng phương pháp kết hợp giữa y học cổ truyền và hiện đại, bao gồm châm cứu, xoa bóp – bấm huyệt, vật lý trị liệu và phục hồi vận động. Ngoài ra, bệnh viện điều trị các bệnh lý mãn tính như đau thần kinh tọa, thoái hóa cột sống, viêm khớp; đồng thời hỗ trợ trị liệu ngôn ngữ và tư vấn – khám phục hồi chức năng cho người khuyết tật vận động và khuyết tật thần kinh.",
    location: "Miền Bắc",
    contact: "84-4-38263616",
    address: "29 Nguyễn Bỉnh Khiêm, phường Hai Bà Trưng, TP. Hà Nội",
    email: "benhvienyhoccotruyentw@gmail.com",
    fax: "84-4- 38229353",
    review:
      "Các y, bác sĩ tại khoa điều trị làm việc rất tận tình chu đáo, nhanh chóng. Thái độ rất nhẹ nhàng. Chỉ dẫn bệnh nhân và người nhà rất chu đáo. Trong quá trình em mình trị liệu. Mình và người nhà còn được hướng dẫn vào phòng chờ dành cho người nhà có điều hoà và rất sạch sẽ.",
  },
  {
    id: 5,
    title: "Bệnh viện tâm thần trung ương 1",
    hospital: "Bệnh viện tâm thần trung ương 1",
    description:
      "Bệnh viện bao gồm thăm khám và điều trị các rối loạn tâm thần điển hình, các rối loạn liên quan đến tâm lý, rối nhiễu ở trẻ em và lứa tuổi học đường, cũng như các rối loạn do rượu và ma túy. Bên cạnh đó còn có tư vấn – trị liệu tâm lý, cùng các chương trình phục hồi chức năng và vật lý trị liệu cho người khuyết tật.",
    location: "Miền Bắc",
    contact: "024.33.853.227",
    address: "Xã Hòa Bình - huyện Thường Tín - Hà Nội",
    email: "bvtttw1@gmail.com",
    website: "https://bvtttw1.gov.vn",
    fax: "024.33.853.190",
    review:
      "Bệnh viện tâm thần trung ương một năm ở huyện Thường tín có không gian rộng rãi thoáng mát nhiều cây xanh sạch sẽ thuận tiện giao thông đi lại nơi đây chuyên điều trị cho những bệnh nhân tâm thần từ người già đến trẻ nhỏ. Hiện tại bệnh viện đang rất chú trọng đến công tác phòng chống dịch covit 19",
  },
  {
    id: 6,
    title: "Viện Dân số, Sức khỏe và Phát triển (PHAD)",
    hospital: "Viện Dân số, Sức khỏe và Phát triển (PHAD)",
    description:
      "Dịch vụ cho người khuyết tật gồm chăm sóc – phục hồi chức năng, điều trị bệnh truyền nhiễm và bệnh mạn tính, hỗ trợ sức khỏe tâm thần, tiếp cận y tế qua ứng dụng di động, cùng các chương trình đảm bảo an toàn sức khỏe trước tác động môi trường.",
    location: "Miền Bắc",
    contact: "(+84) 2473 000 988",
    address:
      "Số 18, ngõ 132, Hoa Bằng, Cầu Giấy, Hà Nội\nVăn phòng điều hành: Tầng 14, tòa nhà Icon4, số 1-3 Cầu Giấy, Đống Đa, Hà Nội",
    email: "phad@phad.org",
  },
  // Miền Trung
  {
    id: 7,
    title: "Bệnh viện chỉnh hình và phục hồi chức năng Đà Nẵng",
    hospital: "Bệnh viện chỉnh hình và phục hồi chức năng Đà Nẵng",
    description:
      "Bệnh viện Chỉnh hình và Phục hồi chức năng Đà Nẵng cung cấp các dịch vụ hỗ trợ toàn diện cho người khuyết tật như khám – đánh giá chức năng, phục hồi vận động, chỉnh hình, đo – lắp chân tay giả, nẹp chỉnh hình, vật lý trị liệu, phục hồi sau tai biến và chấn thương. Bệnh viện ứng dụng kỹ thuật phục hồi tiên tiến kết hợp chăm sóc chuyên sâu nhằm giúp người khuyết tật cải thiện khả năng vận động.",
    location: "Miền Trung",
    contact: "02363.887.890 - 0965.141.818",
    address: "95 Quang Trung, P. Thạch Thang, Quận Hải Châu, TP. Đà Nẵng",
    email: "chphcndanang@gmail.com",
    review:
      "Bệnh viện quá tuyệt vời. Sạch sẽ thoáng mát. Bác sĩ điều dưỡng nhân viên tận tâm thân thiện với bệnh nhân và người nhà",
  },
  {
    id: 8,
    title: "Bệnh viện Y học cổ truyền và phục hồi chức năng tỉnh Khánh Hòa",
    hospital: "Bệnh viện Y học cổ truyền và phục hồi chức năng tỉnh Khánh Hòa",
    description:
      "Bệnh viện Y học cổ truyền và Phục hồi chức năng tỉnh Khánh Hòa cung cấp các dịch vụ hỗ trợ người khuyết tật như phục hồi vận động, vật lý trị liệu, trị liệu ngôn ngữ, châm cứu, xoa bóp – bấm huyệt và phục hồi sau tai biến. Bệnh viện kết hợp y học cổ truyền với kỹ thuật phục hồi hiện đại để giảm đau, cải thiện chức năng và giúp người khuyết tật nâng cao khả năng tự chăm sóc, hòa nhập tốt hơn.",
    location: "Miền Trung",
    contact: "(84- 258) 383.1103",
    address: "Số 7 Đường Phạm Văn Đồng, Phường Bắc Nha Trang, Tỉnh Khánh Hòa",
    email: "bvyhctvphcn.syt@khanhhoa.gov.vn",
    fax: "0258 383 1102",
    review:
      "Một trung tâm y học cổ truyền lớn với đội ngũ nhân viên xuất sắc. Họ đã giúp tôi giải quyết vấn đề đau lưng dưới dai dẳng bấy lâu nay. Họ cung cấp dịch vụ châm cứu, kéo giãn lưng và liệu pháp dòng điện xung. Giá cả hợp lý: châm cứu với dòng điện xung có giá khoảng 70.000 rúp, trong khi các phương pháp khác rẻ hơn.",
  },
  {
    id: 9,
    title: "Bệnh viện Y học cổ truyền tỉnh Quảng Nam",
    hospital: "Bệnh viện Y học cổ truyền tỉnh Quảng Nam",
    description:
      "Bệnh viện Y học cổ truyền tỉnh Quảng Nam cung cấp nhiều dịch vụ hỗ trợ người khuyết tật thông qua kết hợp giữa y học cổ truyền và phục hồi chức năng. Bệnh viện triển khai châm cứu, xoa bóp – bấm huyệt, thủy châm, điện châm, kéo giãn cột sống, vật lý trị liệu và phục hồi vận động cho các trường hợp liệt nửa người, bại não, di chứng chấn thương, thoái hóa xương khớp. Người khuyết tật được đánh giá chức năng toàn diện, xây dựng phác đồ cá nhân hóa và hướng dẫn tập luyện nhằm giảm đau, cải thiện vận động và nâng cao khả năng tự chăm sóc trong sinh hoạt hằng ngày.",
    location: "Miền Trung",
    contact: "0235.3831 009",
    address: "13 Nguyễn Chí Thanh, thành phố Tam Kỳ, tỉnh Quảng Nam",
    email: "khthyhct2016@gmail.com",
    fax: "0235.3.828 314",
    review:
      "Không gian yên bình. Trước kia đã từng thực tập ở đây 2 tháng. Y bác sĩ và nhân viên y tế tuyệt vời",
  },
  // Miền Nam
  {
    id: 10,
    title:
      "Bệnh viện chỉnh hình và phục hồi chức năng thành phố Hồ Chí Minh (Bệnh viện 1A)",
    hospital:
      "Bệnh viện chỉnh hình và phục hồi chức năng thành phố Hồ Chí Minh (Bệnh viện 1A)",
    description:
      "Bệnh viện Chỉnh hình và Phục hồi chức năng TP. Hồ Chí Minh (Bệnh viện 1A) cung cấp dịch vụ chuyên sâu cho người khuyết tật, bao gồm khám – đánh giá chức năng, phục hồi vận động, vật lý trị liệu, hoạt động trị liệu và phục hồi sau tai biến, chấn thương tủy sống, bệnh lý cơ – xương – khớp. Bệnh viện mạnh về đo, thiết kế và lắp chân tay giả; nẹp chỉnh hình; thiết bị hỗ trợ vận động, giúp cải thiện khả năng di chuyển và sinh hoạt độc lập.",
    location: "Miền Nam",
    contact: "(028) 3971 2960",
    address: "1A Lý Thường Kiệt, Phường Tân Sơn Nhất, Thành phố Hồ Chí Minh",
    email: "benhvien1a@benhvien1a.vn",
    review:
      "Suốt hơn hai tháng ròng rã, các bác sĩ, điều dưỡng đã không quản ngày đêm, kiên trì theo dõi, chăm sóc từng bữa ăn, giấc ngủ, từng liều thuốc, từng lần phun khí dung hay tập vật lý trị liệu – dù phải đối diện với những cơn ho dữ dội, những lúc mệt mỏi, nản lòng của bệnh nhân. Tất cả đều được thực hiện bằng sự kiên nhẫn, bao dung và tấm lòng 'Lương y như từ mẫu'.",
  },
  {
    id: 11,
    title: "Bệnh viện Y học cổ truyền thành phố Hồ Chí Minh",
    hospital: "Bệnh viện Y học cổ truyền thành phố Hồ Chí Minh",
    description:
      "Bệnh viện Y học Cổ truyền TP. Hồ Chí Minh cung cấp các dịch vụ hỗ trợ người khuyết tật thông qua kết hợp y học cổ truyền và phục hồi chức năng hiện đại. Bệnh viện triển khai châm cứu, thủy châm, điện châm, xoa bóp – bấm huyệt, kéo giãn cột sống, vật lý trị liệu và phục hồi vận động cho các trường hợp liệt, yếu chi, thoái hóa khớp, di chứng tai biến và rối loạn vận động. Người khuyết tật được khám – đánh giá chức năng, xây dựng phác đồ điều trị cá nhân hóa, hướng dẫn tập luyện và chăm sóc lâu dài nhằm giảm đau, cải thiện khả năng vận động.",
    location: "Miền Nam",
    contact: "0777 179 187",
    address:
      "179 -187 Nam Kỳ Khởi Nghĩa, phường Xuân Hòa, TPHCM.\nCơ sở 2: 218K Trần Hưng Đạo B, phường Chợ Lớn, TPHCM",
    email: "bv.yhct@tphcm.gov.vn",
    review:
      "Lần đầu đi khám đông y, cứ nghĩ là các bác sĩ sẽ khám theo kiểu xưa thôi, ai ngờ các bác sĩ tại đây khám đông-tây kết hợp luôn nhé mọi người. Vô bốc số đăng ký khám 55k hoặc dịch vụ 120k, sau đó gặp bác sĩ chuyên khoa họ sẽ cho làm các xét nghiệm như: công thức máu, chụp x quang, đo điện tim trên các trang thiết bị hiện đại của tây y.",
  },
  {
    id: 12,
    title: "Bệnh viện Đa khoa Đồng Nai",
    hospital: "Bệnh viện Đa khoa Đồng Nai",
    description:
      "Bệnh viện Đa khoa Đồng Nai cung cấp các dịch vụ chăm sóc và hỗ trợ người khuyết tật thông qua hệ thống phục hồi chức năng hiện đại. Bệnh viện triển khai các kỹ thuật vật lý trị liệu, phục hồi vận động, điều trị rối loạn cơ – xương – khớp, phục hồi sau tai biến, chấn thương và phẫu thuật chỉnh hình. Người khuyết tật được đánh giá chức năng toàn diện, lập kế hoạch điều trị cá nhân hóa, hướng dẫn tập luyện và hỗ trợ cải thiện khả năng vận động, giảm đau và tăng mức độ tự lập trong sinh hoạt hằng ngày.",
    location: "Miền Nam",
    contact: "0251 896 9966",
    address: "Số 02 đường Đồng Khởi, P. Tam Hiệp, tỉnh Đồng Nai",
    email: "info@benhviendongnai.com.vn",
    website: "www.benhviendongnai.com.vn",
    fax: "02518 878 666",
    review:
      "Tôi đã được các bác sĩ HÙNG (Trưởng Khoa) và bác sĩ HÒA (Phó Khoa) cùng các y bác sĩ khác.. Đã tận tâm, tận tình, bằng cả tấm lòng đã chữa bệnh cho tôi cùng nhiều bệnh nhân khác.",
  },
  {
    id: 13,
    title:
      "Trung tâm chăm sóc sức nghe hearLIFE (chi nhánh thành phố Hồ Chí Minh)",
    hospital:
      "Trung tâm chăm sóc sức nghe hearLIFE (chi nhánh thành phố Hồ Chí Minh)",
    description:
      "Bệnh viện cung cấp hệ thống dịch vụ thính học toàn diện cho người khiếm thính, bao gồm kiểm tra và đo thính lực đơn âm, đánh giá khả năng phân biệt lời nói, nhĩ lượng và kiểm tra trở kháng tai. Các kỹ thuật chuyên sâu như OAE chẩn đoán, ABR (đáp ứng thính giác thân não), đánh giá rối loạn xử lý thính giác trung ương (CAPD) và kích thích Promontory/eABR giúp xác định chính xác mức độ, vị trí và nguyên nhân suy giảm thính lực, hỗ trợ xây dựng phác đồ can thiệp phù hợp.",
    location: "Miền Nam",
    contact: "+84 938 284 546",
    address:
      "Tòa nhà MH Building, 476-478 Sư Vạn Hạnh, Phường 9, Quận 10, Hồ Chí Minh",
    email: "enquiry@hearlifevietnam.com",
    review:
      "Thiết bị luôn được nâng tầm, cập nhập tiến bộ khoa học để đáp ứng tối ưu nhu cầu của khách hàng, dịch vụ thính học và phục hồi ngôn ngữ hữu hiệu hàng đầu đã đưa khách hàng hoà nhập vào cuộc sống âm thanh",
  },
];

// Career guidance articles - Trung tâm hướng nghiệp
export const careerGuidanceArticles = [
  // Miền Bắc
  {
    id: 1,
    title:
      "Trung tâm Giáo dục nghề nghiệp & Phát triển Năng lực Người Khuyết tật (VDADC)",
    author: "Trung tâm VDADC",
    content:
      "Trung tâm VDADC được thành lập theo Quyết định 5494/QĐ-UBND của UBND Hà Nội vào ngày 31/12/2021. Là tổ chức tiên phong với sứ mệnh ươm mầm tài năng, giúp trẻ mồ côi và người khuyết tật tự tin hòa nhập và vươn lên trong cuộc sống, bằng việc dạy nghề và tạo việc làm hoàn toàn miễn phí, Trung tâm Giáo dục nghề nghiệp và Phát triển năng lực người khuyết tật Việt Nam trao cho trẻ em có hoàn cảnh khó khăn và người khuyết tật chiếc 'cần câu' vững chắc. Đây không chỉ là cơ hội để họ phát triển nghề nghiệp mà còn là nền tảng để họ tự tin vươn lên, làm chủ cuộc sống. Trung tâm tổ chức đào và phát triển những ngành nghề vừa truyền thống, vừa hiện đại như: làm tranh đá quý, sửa chữa xe mô tô, làm bánh... Không chỉ dừng lại ở đào tạo nghề, Trung tâm Giáo dục nghề nghiệp và Phát triển năng lực người khuyết tật Việt Nam mang trong mình một khát vọng lớn lao: Trở thành đơn vị tiên phong kiến tạo và nâng tầm vị thế cho nền Thể thao người khuyết tật Việt Nam.",
    date: "2024-01-15",
    location: "Miền Bắc",
    address:
      "Số 1, phố Hồng Đô, đường Lê Quang Đạo, phường Phú Đô, quận Nam Từ Liêm, Hà Nội",
    contact: "0914396682, 0986719585",
    email: "vdad.center@gmail.com",
    website: "https://vdadc.com",
    fanpage: "https://www.facebook.com/vdadc/",
  },
  {
    id: 2,
    title:
      "Trung tâm Dạy nghề nhân đạo và tạo việc làm cho trẻ em tàn tật (Linh Quang, Hà Nội)",
    author: "Trung tâm Linh Quang",
    content:
      "Đây là một trung tâm nhân đạo được xây dựng với xuất phát điểm từ một lớp học nhỏ dành cho trẻ em lang thang, cơ nhỡ, tàn tật — do thầy giáo Trần Duyên Hải khởi xướng sau năm 1975. Với mục tiêu giúp những trẻ 'lang thang, cơ nhỡ, tàn tật' có một mái ấm, một nơi để học nghề, trung tâm đã kết hợp giữa dạy nghề và hỗ trợ rất toàn diện: ăn ở, chăm sóc, dạy chữ, dạy làm việc. Qua đó không chỉ đảm bảo nơi ăn chốn ở mà còn hướng nghiệp, tạo cơ hội để các em biết sống, biết lao động, biết tự lập, có thể trở thành người có ích cho xã hội.",
    date: "2024-01-20",
    location: "Miền Bắc",
    address: "25/48 ngõ Linh Quang, phường Văn Chương, Đống Đa, Hà Nội",
    contact: "0911386568",
    email: "trungtamnhandaokt@gmail.com",
    fanpage: "https://www.facebook.com/vieclamchotrekhuyettat",
  },
  {
    id: 3,
    title: "VNAH (Vietnam Assistance for the Handicapped)",
    author: "VNAH",
    content:
      "VNAH là tổ chức phi chính phủ quốc tế, hoạt động tại Việt Nam, hỗ trợ người khuyết tật. Với mục tiêu là giúp người khuyết tật hòa nhập xã hội, phục hồi chức năng, đào tạo nghề, phát triển sinh kế, tạo cơ hội cho họ tự lập và tham gia cộng đồng. VNAH thường hợp tác với các địa phương, trung tâm dạy nghề, tổ chức xã hội để triển khai chương trình đào tạo nghề, tạo việc làm cho người khuyết tật nhằm đảm bảo họ có thu nhập và cuộc sống ổn định. Khi phối hợp với các trung tâm địa phương, VNAH góp phần tạo ra một mạng lưới hỗ trợ đồng bộ: từ phục hồi chức năng, học nghề, hòa nhập cộng đồng, đến việc làm và sinh kế bền vững cho người khuyết tật.",
    date: "2024-01-25",
    location: "Miền Bắc",
    address: "101A Nguyễn Khuyến, Đống Đa",
    email: "loinguyen@vnah-hev.org",
    website: "https://www.vnah-hev.org",
    fanpage: "https://www.facebook.com/vnahhev",
  },
  {
    id: 4,
    title: "Trung tâm 'Vì Ngày Mai' (Hà Nội)",
    author: "Trung tâm Vì Ngày Mai",
    content:
      "Trung tâm Vì Ngày Mai được thành lập ngày 8/3/2002 (tiền thân là cơ sở dạy nghề và tạo việc làm cho thanh thiếu niên khuyết tật). Trung tâm chăm sóc sức khỏe, dạy nghề và tổ chức sản xuất, tạo việc làm cho thanh thiếu niên khuyết tật; có các lớp may, thủ công, sản xuất để giới thiệu hàng hoá. Trung tâm còn quan tâm đến việc hòa nhập xã hội, rèn luyện kỹ năng sống, giúp người khuyết tật tự lập, khẳng định năng lực, giúp người khuyết tật thoát khỏi định kiến, mặc cảm, xây dựng niềm tin vào bản thân.",
    date: "2024-02-01",
    location: "Miền Bắc",
    address:
      "Thôn Đại Đồng, xã Đại Mạch, huyện Đông Anh, Thành Phố Hà Nội (nằm trong khuôn viên Trung tâm chăm sóc người cao tuổi Tuyết Thái)",
    contact: "0904 44 66 40",
    email:
      "admin@holdthefuture.org, hien@holdthefuture.org, ketoan@holdthefuture.org",
    website: "https://ttvingaymai.org",
    fanpage: "https://www.facebook.com/TrungtamViNgayMai",
  },
  {
    id: 5,
    title: "Trung tâm Dạy nghề Từ thiện Quỳnh Hoa (Hà Nội)",
    author: "Trung tâm Quỳnh Hoa",
    content:
      "Nằm sâu trong con ngõ nhỏ của thôn Thanh Oai (xã Hữu Hòa, huyện Thanh Trì, Hà Nội), trung tâm dạy nghề từ thiện Quỳnh Hoa được nhiều người biết đến như là ngôi nhà đầy tình yêu thương của người khuyết tật. Được thành lập từ năm 2007, cô Hoa cùng trung tâm của mình đã đón nhận, nuôi dưỡng, dạy nghề và giới thiệu việc làm cho hàng trăm người khuyết tật, hoàn cảnh khó khăn ở khắp mọi nơi trên cả nước. Trung tâm hoạt động với chức năng dạy nghề và tạo việc làm cho người khuyết tật. Đến với Quỳnh Hoa, người khuyết tật được hỗ trợ ăn ở, được học nghề miễn phí với các nghề: may công nghiệp, thủ công giấy cuộn.v.v… Người khuyết tật đã làm ra được sản phẩm như quần áo thời trang, túi môi trường… như tranh nghệ thuật, thiệp, 12 con giáp, hộp .v.v.. bằng giấy cuộn. Các sản phẩm đã được giới thiệu ra thị trường và được khách hàng yêu thích, giúp người khuyết tật có thu nhập và nuôi sống bản thân. Với mặt bằng 1200m2 có xưởng may, xưởng thủ công giấy cuộn, có nhà ở cho học sinh, sân chơi và vườn hoa cây cảnh… tạo nên không khí sinh động thoáng mát.",
    date: "2024-02-05",
    location: "Miền Bắc",
    address:
      "Số 19, đường Rước Cỗ, thôn Thanh Oai, xã Hữu Hòa, huyện Thanh Trì, Hà Nội",
    contact: "0982 866 903",
    email: "trungtamdaynghetuthienquynhhoa@gmail.com",
  },
  {
    id: 6,
    title:
      "Trung tâm Chăm sóc Người khuyết tật Hà Nội (Trung tâm chăm sóc - dạy nghề công lập)",
    author: "Trung tâm Chăm sóc NKT Hà Nội",
    content:
      "Trung tâm này trực thuộc Sở Lao động – Thương binh & Xã hội Hà Nội, tiền thân là 'Trung tâm Nuôi dưỡng người già và trẻ tàn tật Hà Nội'. Trung tâm tiếp nhận, nuôi dưỡng, chăm sóc, hỗ trợ toàn diện cho người khuyết tật không nơi nương tựa, không có gia đình hoặc gia cảnh khó khăn. Cung cấp dịch vụ nuôi dưỡng, chăm sóc, phục hồi chức năng, y tế; hỗ trợ học tập hòa nhập, học nghề, kỹ năng sống; tổ chức phục hồi, sinh hoạt thể chất, thể thao, giải trí. Trung tâm được ghi nhận có hiệu quả rất tốt: nhiều người khuyết tật sau khi ở trung tâm đã học được kỹ năng, có thể tự chăm sóc bản thân, thậm chí tham gia đóng góp cho cộng đồng.",
    date: "2024-02-10",
    location: "Miền Bắc",
    address: "Thôn Liên Minh, Xã Quảng Oai, thành phố Hà Nội",
    contact: "02433965087",
    email: "ttcsnkthn@gmail.com",
    website: "https://trungtamchamsocnguoikhuyettathanoi.vn",
    fanpage: "https://www.facebook.com/profile.php?id=61580442938559",
  },
  {
    id: 7,
    title: "Trung tâm Giáo dục chuyên biệt & Bảo trợ xã hội tỉnh Bắc Ninh",
    author: "Trung tâm GDCN & BTXH Bắc Ninh",
    content:
      "Trung tâm này hoạt động trong lĩnh vực giáo dục chuyên biệt, hỗ trợ hòa nhập, chăm sóc & phục hồi cho người khuyết tật, trẻ khuyết tật; có nhiều cơ sở tại các huyện, thành phố thuộc tỉnh Bắc Ninh. Áp dụng các phương pháp đã được kiểm chứng khoa học trong trị liệu, giáo dục đặc biệt bao gồm khám, sàng lọc, giáo dục trị liệu, dinh dưỡng, can thiệp chuyên sâu; hoạt động theo mô hình kết hợp y tế, giáo dục, dinh dưỡng để hỗ trợ toàn diện. Thường có lớp hướng nghiệp, dạy nghề (may, mây tre đan, xoa bóp…) và hỗ trợ giới thiệu việc làm.",
    date: "2024-02-15",
    location: "Miền Bắc",
    address: "Số 190, đường Ngô Quyền, phường Kinh Bắc, Bac Ninh, Vietnam",
    contact: "0911020021",
    email: "ttgdcbbtxhbn@gmai.com",
    fanpage: "https://www.facebook.com/profile.php?id=61576365373887",
  },
  // Miền Trung
  {
    id: 8,
    title:
      "Trung tâm dạy nghề và tạo việc làm cho người khuyết tật - TEKK Hy Vọng (Hope Center Hue)",
    author: "Trung tâm Hy Vọng Huế",
    content:
      "Trung tâm được thành lập từ năm 1999 với mục đích giúp người khuyết tật, trẻ em có hoàn cảnh khó khăn, phụ nữ, thanh niên dân tộc thiểu số có được việc làm ổn định, phát triển năng khiếu, kỹ năng để hòa nhập cộng đồng. Trung tâm hiện có khoảng 6 ngành nghề chính, gồm: may mặc (dân dụng & công nghiệp), may túi xách, hàng thủ công mỹ nghệ, dệt vải trên máy cải tiến, dệt Zèng (một nghề truyền thống của dân tộc thiểu số A Lưới), và làm gốm Raku. Ngoài dạy nghề, các học viên tại Hy Vọng được học kỹ năng mềm như làm việc nhóm, xây dựng tự tin, quản lý thời gian, marketing… nhằm giúp các bạn dễ tìm việc hoặc hòa nhập cộng đồng. Sau đào tạo, trung tâm kết nối việc làm, một số học viên được nhận vào làm tại các công ty, hoặc trung tâm bán/ký gửi sản phẩm thủ công, lưu niệm; có điểm bán hàng, hợp tác với các đơn vị thương mại để phân phối sản phẩm do người khuyết tật làm. Hy Vọng là một mô hình khá đầy đủ: từ đào tạo nghề, học kỹ năng đến hỗ trợ tìm việc phù hợp với người khuyết tật muốn học nghề, có thu nhập ổn định.",
    date: "2024-02-20",
    location: "Miền Trung",
    address: "69 Thạch Hãn, TP. Huế",
    contact: "0234 3511 511",
    email: "hopecenterhue@yahoo.com.vn",
    fanpage: "https://www.facebook.com/HopecenterhueTrungTamDayNgheHyVongHue/",
  },
  {
    id: 9,
    title: "Trung tâm Giáo dục – Dạy nghề người khuyết tật tỉnh Nghệ An",
    author: "Trung tâm GD-DN NKT Nghệ An",
    content:
      "Trung tâm đã tổ chức dạy học văn hóa theo hình thức chuyên biệt (từ lớp dự bị cho đến lớp 5) cho 180 – 220 học sinh mỗi năm, đồng thời triển khai các chương trình can thiệp sớm, chương trình hòa nhập cho học sinh khuyết tật tại cộng đồng. Trung tâm cũng mở các lớp học chữ nổi (Brail) cho hơn 100 thương bệnh binh bị mù theo chương trình của Viện khoa học giáo dục và Hội người mù Việt Nam. Đến năm 2014, Trung tâm được giao thêm nhiệm vụ vừa dạy nghề vừa dạy văn hóa cho học sinh. Mỗi năm, trung tâm tiếp nhận hàng chục trẻ khuyết tật (câm, điếc, khiếm thị, khuyết tật vận động). Học hết chương trình tiểu học, các em được chuyển sang học nghề phù hợp trước khi bước vào cuộc sống tự lập. Hằng năm trung tâm phối hợp với nhiều doanh nghiệp đã tạo việc làm cho hàng trăm trẻ em khuyết tật ở trung tâm. Các nghề chính là may, thêu, mộc dân dụng, mỹ nghệ, điện dân dụng… Người khuyết tật sau khi hoàn thành chương trình đào tạo đã có việc làm có thu nhập ổn định, đảm bảo cuộc sống. Với sự nỗ lực phấn đấu không ngừng của tập thể cán bộ, giáo viên Trung tâm đã được ghi nhận bằng những phần thưởng xứng đáng của các cấp các ngành dành cho tập thể và các cá nhân tiêu biểu.",
    date: "2024-02-25",
    location: "Miền Trung",
    address: "Xóm 8 xã Nghi Phú - Tp Vinh - Nghệ An",
    contact: "(0238) 3851599",
    website: "https://giaoducdaynghenguoikhuyettatnghean.edu.vn",
    email: null,
    fanpage: null,
  },
  {
    id: 10,
    title: "Trung tâm Nuôi dạy trẻ khuyết tật Võ Hồng Sơn",
    author: "Trung tâm Võ Hồng Sơn",
    content:
      "Ngôi trường tình thương này có 140 học sinh vừa học văn hóa, vừa học nghề. Hiện tại, trung tâm tiếp nhận trẻ khiếm thị, khiếm thính, tuổi từ 12 – 17, có hoàn cảnh khó khăn, đặc biệt ưu tiên các huyện miền núi trong tỉnh Quảng Ngãi. Hoạt động từ nguồn xã hội hóa. Ngoài việc được nuôi dạy miễn phí, mỗi năm, trung tâm nuôi dạy trẻ em khuyết tật Võ Hồng Sơn, Quảng ngãi có khoảng 150 trẻ khuyết tật được học nghề để hòa nhập cộng đồng. Từ năm 2019 này, trung tâm đã triển khai việc đào tạo nghề và tạo việc làm tại chỗ, tạo sinh kế, bước đầu giúp trẻ khuyết tật tạo dựng cuộc sống tự lập. Trung tâm có 'xưởng nghề may' dạy nghề may cho học sinh khiếm thính và khuyết tật. Ngoài học nghề may, các em vẫn học văn hoá; nhiều học sinh sau khi học nghề có thể tiếp tục học THPT hoặc tái hòa nhập cộng đồng. Trung tâm không chỉ dạy nghề mà 'nuôi dưỡng ước mơ, giúp các em vượt qua mặc cảm, hòa nhập, vươn lên trong cuộc sống'. Võ Hồng Sơn là ví dụ rõ ràng về trung tâm vừa kết hợp giáo dục phổ thông, vừa dạy nghề phù hợp với trẻ khuyết tật cần học văn hoá, nghề.",
    date: "2024-03-01",
    location: "Miền Trung",
    address:
      "Thôn Phú Vinh Tây, Thị trấn Chợ Chùa, Huyện Nghĩa Hành, Quảng Ngãi",
    contact:
      "0255.3961.616 – 0903.904.143 chị Hà GĐ – 0914.762.879 chị Hương PGĐ – 0908.879.994 chị Nhung PGĐ",
    email: "trungtam@vohongson.edu.vn",
    website: "http://vohongson.edu.vn",
    fanpage: null,
  },
  // Miền Nam
  {
    id: 11,
    title:
      "DRD Vietnam – Trung tâm Nghiên cứu & Phát triển Năng lực người khuyết tật",
    author: "DRD Vietnam",
    content:
      "DRD (Disability Resource & Development / formerly Disability Research and Capacity Development) là một tổ chức phi lợi nhuận hoạt động từ năm 2005, tập trung vào nghiên cứu, phát triển năng lực, hỗ trợ hòa nhập và thúc đẩy cơ hội việc làm cho người khuyết tật. Mục tiêu của DRD là tạo cơ hội bình đẳng cho người khuyết tật thông qua nâng cao năng lực cá nhân, tư vấn việc làm và thúc đẩy chính sách; trung tâm vận hành các chương trình đào tạo, nhạy cảm về khuyết tật, phát triển năng lực nghề nghiệp và kết nối việc làm cho người khuyết tật với doanh nghiệp. Về nội dung dạy nghề, hướng nghiệp, DRD thường triển khai các khóa nghiệp vụ về: tư vấn nghề nghiệp, đào tạo kỹ năng mềm, đào tạo các nghề nhẹ phù hợp (ví dụ kỹ năng văn phòng cơ bản, kỹ năng tiếp cận việc làm, và các khóa nghề ngắn hạn do DRD phối hợp với đối tác tổ chức), đồng thời DRD có chương trình hỗ trợ doanh nghiệp tuyển dụng và thích nghi công việc cho người khuyết tật.",
    date: "2024-03-05",
    location: "Miền Nam",
    address: "311K8 đường số 9, Cư xá Bắc Hải, Phường 15, Quận 10, TP.HCM",
    contact: "(+84) 399 988 336",
    email: "info@drdvietnam.com",
    website: "https://www.drdvietnam.org",
    fanpage: "https://www.facebook.com/drdvietnam/",
  },
  {
    id: 12,
    title:
      "Trung tâm Giáo dục nghề nghiệp cho Người khuyết tật và Trẻ mồ côi TP. HCM (Hóc Môn)",
    author: "Trung tâm GDNN NKT & TMO TP.HCM",
    content:
      "Trung tâm này (thuộc hệ thống Hội/Bảo trợ người khuyết tật & trẻ mồ côi TP. HCM) hoạt động từ khoảng 2006, chuyên hướng nghiệp, dạy nghề và giới thiệu việc làm cho người khuyết tật và trẻ mồ côi ở TP. HCM và các tỉnh lân cận. Mục tiêu là định hướng nghề nghiệp phù hợp với năng lực từng học viên, cung cấp nguyên liệu thực hành và hỗ trợ học tập trong thời gian học nghề, giúp học viên có tay nghề và cơ hội tìm việc làm sau khóa học. Về nội dung dạy nghề, trung tâm triển khai nhiều lớp nghề phục vụ thị trường và phù hợp với năng lực NKT như: massage, tranh ghép gỗ/handmade, may-thêu, làm nail, kim hoàn (căn bản) và các nghề thủ công; trung tâm còn giới thiệu sản phẩm do học viên làm ra tới cộng đồng. Đây là mô hình vừa dạy nghề vừa thực hành sản xuất, hướng tới tạo việc làm thực tế cho học viên.",
    date: "2024-03-10",
    location: "Miền Nam",
    address: "Ấp 6, Xã Xuân Thới Thượng, huyện Hóc Môn, Thành phố Hồ Chí Minh",
    contact:
      "028 3713 6273 hoặc liên hệ trực tiếp Thầy Tô Tấn Đức – Giám đốc Trung tâm, ĐT: 090.854.5138 hoặc Ngoài giờ hành chính liên hệ anh Nguyễn Văn Dương – Phụ trách trang thông tin Trung tâm SĐT 039.994.1989",
    email: "ttrungtamgdnn@gmail.com",
    website: "https://nguoikhuyettathcm.org/trung-tam-giao-duc-nghe-nghiep",
    fanpage: "https://www.facebook.com/daynghekhuyettat/",
  },
  {
    id: 13,
    title: "Trung tâm Dạy nghề người tàn tật Bình Dương",
    author: "Trung tâm Dạy nghề NTT Bình Dương",
    content:
      "Từ khi thành lập đến nay, Trung tâm dạy nghề đã đào tạo được 2 khoá học. Mỗi khoá, Trung tâm đào tạo được 60 học sinh có tay nghề, một phần ba trong số đó đã được giới thiệu đi làm. Trung tâm còn liên kết với Cơ sở mây, tre đan Thanh Trúc, Ngọc Phước; Công ty Thương mại Xuất nhập khẩu Thành Lễ... để giới thiệu việc làm cho học sinh khi ra trường. Hiện tại, Trung tâm đang tập trung đào tạo khoá 3 cho hơn 200 học viên là những người khuyết tật khó khăn trên địa bàn. Với phương châm: cung cấp những kiến thức chuyên môn và giới thiệu việc làm cho người khuyết tật, giúp họ ổn định cuộc sống và hoà nhập cộng đồng, Trung tâm đã trở thành mái nhà chung của hơn một trăm người với những số phận không may tìm thấy sự yêu thương chia sẻ với những người cùng cảnh ngộ.",
    date: "2024-03-15",
    location: "Miền Nam",
    address: "87 Đoàn Thị Liên, Phường Phú Lợi, TP. TDM, Bình Dương",
    contact: "0274 3897 205 – 0274 3856 290",
    email: null,
    website: null,
    fanpage: null,
  },
  {
    id: 14,
    title: "Trung tâm Bảo trợ Xã hội thành phố Cần Thơ",
    author: "Trung tâm BTXH Cần Thơ",
    content:
      "Trung tâm Bảo trợ xã hội TP Cần Thơ là đơn vị công lập quản lý, chăm sóc, nuôi dưỡng và thực hiện các dịch vụ bảo trợ theo quy định. Mục tiêu chung là quản lý, chăm sóc, nuôi dưỡng, phục hồi, hỗ trợ hòa nhập cho các đối tượng bảo trợ (trong đó có người khuyết tật và trẻ khuyết tật). Về phần trung tâm dạy trẻ khuyết tật TP Cần Thơ (thuộc hệ thống giáo dục chuyên biệt tỉnh/TP), các hoạt động kết hợp giáo dục phổ thông chuyên biệt với can thiệp sớm và dạy nghề nhẹ: may, thêu, làm bánh, thủ công, kỹ năng sống và phục hồi chức năng cho học sinh khuyết tật. Cơ sở cũng có xưởng thực hành và hợp tác với các tổ chức để hỗ trợ vật tư, trang thiết bị dạy nghề.",
    date: "2024-03-20",
    location: "Miền Nam",
    address: "Khu Bình Hòa A, P. Phước Thới, TP Cần Thơ",
    contact: "02923 860 333",
    email: "ttbtxh@cantho.gov.vn",
    website: "https://trungtambaotroxahoi.cantho.gov.vn",
  },
];

// Success stories
export const successStories = [
  {
    id: 1,
    userId: "story-1",
    name: "Đặng Thùy Linh",
    title: "Câu chuyện về cô gái Đặng Thùy Linh dũng cảm theo đuổi ước mơ",
    region: "Hà Nội",
    publishedAt: "2023-08-15",
    story:
      "Mình là Linh, Đặng Thùy Linh. Mình là một người phụ nữ mang trên mình khuyết tật về thể chất. Mình sinh ra và lớn lên tại Hà Nội, thủ đô của Việt Nam. Chuyện kể rằng, mình được sinh ra vào thời kỳ sau chiến tranh.\n\n[IMAGE:https://www.unicef.org/vietnam/sites/unicef.org.vietnam/files/styles/hero_extended/public/2.png.webp?itok=9q3IvHdu]\n\nTừ khi mình mới lọt lòng, rất nhiều người đã bàn tán về khiếm khuyết của mình. Một số người cho rằng có thể mình là một trong những nạn nhân của chất độc màu da cam mà quân đội Mỹ đã sử dụng trong chiến tranh tại Việt Nam, do bố mình là một quân nhân từng tham gia chiến đấu trong hai năm tại chiến trường Quảng Trị - nơi phải hứng chịu một lượng lớn bom mìn và chất độc hóa học.\n\nMột số khác thì cho rằng đó là do mẹ mình sinh ra mình khi bà đã nhiều tuổi. Có người còn nói đó là do quả báo từ kiếp trước. Mỗi khi được hỏi, mình luôn trả lời rằng: 'Con sinh ra với khuyết tật. Có vậy thôi ạ.' Mình tin rằng khiếm khuyết của cơ thể không định nghĩa bạn là người như thế nào. Mình muốn bản thân mình được nhìn nhận qua những việc mình làm. Mình là nhà hoạt động vì quyền của người khuyết tật.\n\nHồi mình còn đi học mẫu giáo, có một lần mình và các bạn học cách đếm bằng ngón tay. Các bạn đều có 10 ngón tay, còn mình chỉ có 6 ngón. Các bạn hỏi mình: 'Sao tay trái của cậu chỉ có 1 ngón?'. Mình trả lời: 'Vì chúng mình không phải ai cũng giống nhau'\n\nCha mẹ mình đã đúng khi cố gắng nuôi dạy mình trong một môi trường hòa nhập, nơi mình luôn có những người bạn không mang trên mình khuyết tật. Điều đó làm mình nghĩ rằng 'Dù mình có khác với các bạn, không có nghĩa rằng mình không thể làm những gì mà các bạn có thể làm. Mình có thể làm mọi thứ theo cách riêng của mình - và cách đó không giống như cách của các bạn.'\n\nViệc được học trong một môi trường giáo dục hòa nhập giúp mình hiểu được cả những thuận lợi lẫn khó khăn mà môi trường này mang lại cho sự phát triển của các trẻ em gái khuyết tật. Với trải nghiệm này, mình mong muốn nỗ lực để loại bỏ những trở ngại, cũng như đảm bảo những người khuyết tật đều có cơ hội để hòa nhập vào xã hội của chúng ta một cách toàn diện và bình đẳng.\n\nSau khi học xong cấp 3, mình khá băn khoăn khi phải quyết định mình sẽ học ngành gì khi lên đại học. Khi đó, mình đã rất tự tin và nói 'Con định học Luật.' Phần lớn mọi người đều không ủng hộ ý kiến của mình. 'Con nên thực tế đi. Bác nghĩ con nên chọn ngành gì đó dễ hơn, dễ tìm việc ổn định hơn. Đầy người chân tay lành lặn còn đang thất nghiệp kia kìa, con còn không được như người ta!'\n\nViệc nghi ngờ bản thân đã khiến mình quyết định đăng ký cả hai ngành - ngành mà mình muốn học và ngành mà mọi người khuyên là sẽ giúp một người khuyết tật như mình có công việc ổn định. Đến cuối cùng, khi trái tim mách bảo, mình quyết định theo đuổi ước mơ của mình.\n\nLý do cho quyết định này cũng khá đơn giản. Mặc dù mình không chắc là mình có thể kiếm được một công việc sau khi ra trường, nhưng mình tin chắc rằng mình sẽ không bao giờ cảm thấy hạnh phúc khi làm những điều mà người khác bảo mình làm - một thứ đã luôn tồn tại trong cuộc đời mình. Mình là người duy nhất chịu trách nhiệm về cuộc đời mình.\n\nQuan trọng hơn, trong khi nỗ lực loại bỏ những khó khăn khiến những trẻ em khuyết tật không thể thực hiện giấc mơ của mình, thì trải nghiệm của bản thân đã dẫn lối cho mình đến một đam mê khác. Và hôm nay, mình đang nỗ lực vận động cho sự bình đẳng và hòa nhập của các em, dù con đường không phải lúc nào cũng trải hoa hồng và có rất nhiều khúc mắc mà mình đã phải vượt qua.\n\nLà một nhà hoạt động cho người khuyết tật tại Việt Nam với tuổi đời còn rất trẻ, mình tự thấy mình là một nhân tố mang lại sự thay đổi, người mang trọng trách lớn lao là đại diện cho tiếng nói và phong trào của người khuyết tật trong hành trình vận động về việc đảm bảo quyền, cũng như trong việc đóng góp cho một xã hội hòa nhập.\n\nMình tập trung vào các nghiên cứu và hoạt động vì quyền của người khuyết tật. Việc nghiên cứu khiến mình nắm được những thực tế, thực trạng trong thời điểm hiện tại một cách cụ thể hơn, cũng như giúp mình hiểu sâu sắc hơn về những vấn đề đang có ảnh hưởng đến cộng đồng người khuyết tật.\n\nTrong vai trò là Điều phối viên cho mảng người khuyết tật tại Tổ chức Trẻ em Rồng Xanh ở Hà Nội, mình có thể áp dụng những kiến thức và thực hành mà mình đã học được để giúp đỡ những trẻ em và thanh thiếu niên khuyết tật có hoàn cảnh khó khăn nhất, trong đó có những em là nạn nhân của nạn buôn bán người và xâm hại tình dục, cũng như hỗ trợ pháp lý cho các em. Mình cũng giúp đỡ những em chưa có cơ hội được đến trường, trẻ em lang thang, sinh sống trên đường phố và trẻ em dân tộc thiểu số. Những đóng góp nhỏ bé của mình trong việc thay đổi cuộc sống của họ đã được đền đáp xứng đáng. Điều này khiến mình cảm thấy hạnh phúc khi đi làm mỗi ngày.\n\nThông qua công việc và các hoạt động vận động, mình cũng đã trở thành một phiên bản tốt hơn của chính mình. Khi làm việc với một nhóm trẻ khiếm thính và học ngôn ngữ ký hiệu, mình nhận ra rằng khiếm khuyết của một cơ thể với chỉ một bên tay có đủ ngón tay không thể ngăn cản mình giao tiếp với các em. Những rào cản và hạn chế sẽ không thể ngăn cản chúng ta khi chúng ta thay đổi góc nhìn của chính mình.",
    image:
      "https://www.unicef.org/vietnam/sites/unicef.org.vietnam/files/styles/hero_extended/public/2.png.webp?itok=9q3IvHdu",
    videoUrl: "https://www.youtube.com/embed/LltfdSkNUhc",
    source: "Unicef",
    sourceUrl:
      "https://www.unicef.org/vietnam/vi/nh%E1%BB%AFng-c%C3%A2u-chuy%E1%BB%87n/c%C3%A2u-chuy%E1%BB%87n-c%E1%BB%A7a-%C4%91%E1%BA%B7ng-th%C3%B9y-linh",
  },
  {
    id: 2,
    userId: "story-2",
    name: "Trần Trà My",
    title: "Nhà văn của nghị lực",
    region: "TP. Hồ Chí Minh",
    publishedAt: "2021-02-01",
    story:
      "Sinh ra tại vùng đất Đông Hà (Quảng Trị) nhiều nắng gió, chị Trần Trà My (34 tuổi) không may mắn như những người bạn đồng trang lứa. 3 tháng tuổi trên người chị nổi những chấm li ti. Sau những ca phẫu thuật, điều trị tại bệnh viện, đôi chân của chị không thể đi lại được, đôi tay cũng yếu dần, chỉ duy nhất một ngón tay có thể gõ phím.\n\nChưa một lần được đến trường, cuộc sống vỏn vẹn gói trọn trong bốn bức tường thế nhưng không vì thế mà cô gái quê Đông Hà ngừng từ bỏ ước mơ, khát vọng của mình. Chị bắt đầu tập viết, tập đi và làm quen dần với máy tính. Khi những con chữ ra đời, chị bắt đầu viết nên những cảm xúc, suy nghĩ, những câu chuyện qua tản văn, truyện ngắn.\n\nNhà văn Trần Trà My không ngừng nỗ lực vươn lên, thực hiện đam mê viết lách và sáng tác nhiều tập truyện ngắn.\n\nVượt qua những mặc cảm, khiếm khuyết của bản thân, chị rời quê Quảng Trị vào Sài Gòn lập nghiệp và thực hiện ước mơ. Công việc chính của chị là viết văn, viết báo và làm truyền thông. Chị tâm sự, được làm việc thỏa mãn niềm đam mê của bản thân, dù khó khăn mấy chị cũng sẽ cố gắng vượt qua. Hằng ngày chị vẫn miệt mài gõ phím bằng một ngón tay với một trái tim luôn dạt dào cảm xúc.\n\nChị My chia sẻ, mỗi cuốn sách của chị đều viết bằng cả trái tim, bằng những câu chuyện thực tế. Chị đi đến đâu, gặp gỡ và ghi chép lại các tư liệu, thâm nhập vào đời sống xã hội. Đến nay, chị đã cho ra đời 4 tập sách ấn tượng: Giấc mơ đôi chân thiên thần (2009), Chúng ta chính là mùa xuân (2010), Yêu trên từng ngón tay (2013) và Tin vào điều tử tế (2019).\n\nNhững ngày cuối năm Canh Tý, chị My lại tất bật, bận rộn hơn với những công việc dự án của mình. Năm vừa qua, với chị là một năm đầy đáng nhớ và khó quên.\n\nNói về tập truyện ngắn thứ tư 'Tin vào điều tử tế', chị My cho hay đã ấp ủ và thực hiện trong vòng 4 năm. Để chuẩn bị cho nội dung cuốn sách, chị bắt đầu hành trình từ Bắc vào Nam, tìm gặp gần 20 người ảnh hưởng đến cuộc đời mình. Bất kể khoảng cách địa lý, sức khỏe ốm hay đau, chị vẫn rong ruổi hành trình để hoàn thiện cuốn sách.\n\nLà người đầu tiên thực hiện dự án 'Lan tỏa điều tử tế', sau 5 lần tái bản, số lượng cuốn sách 'Tin Vào Điều Tử Tế' được phát hành lên đến 11.000 bản. Chị đã đem sách đến các trại giam, với mong muốn gieo mầm hy vọng cho những người từng lầm lỡ. Thế rồi những thùng sách đã được gửi đến ở các trại giam khắp đất nước như Quảng Trị, Vinh, Đà Nẵng, Thanh Hóa, Vĩnh Phúc,…\n\n'Bây giờ thế hệ trẻ phạm tội rất nhiều, nhìn thấy họ tôi rất xót xa. Nhiều người chỉ nhìn họ và thấy những việc họ làm, phê phán họ mà không lắng nghe tại sao họ lại làm thế. Tôi có một ước muốn được đến trại giam và giao lưu với phạm nhân', chị My tâm sự.\n\nKhông chỉ đam mê văn chương, chị My còn tích cực tham gia các hoạt động xã hội. Trong đợt dịch COVID-19 vừa qua, chị đã lên biên giới biên phòng nơi giáp ranh với Campuchia vừa tặng quà cho bà con dân tộc nghèo, vừa thăm hỏi động viên tinh thần cho các bạn chiến sĩ ở trong các chốt sâu trong rừng. Nơi đây có rất nhiều chiến sĩ nửa năm không được về nhà bởi phải làm nhiệm vụ canh gác biên giới.\n\n[IMAGE:https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/2/1/876399/Tran-Tra-My-3.jpg]\n\nTrần Trà My tặng quà trong chuyến hoạt động tình nguyện tại biên giới biên phòng nơi giáp ranh với Campuchia. Ảnh: NVCC\n\nNhà văn Trà My từng tâm sự: 'Nếu cuộc đời bằng phẳng quá thì e rằng không có Trà My ngày hôm nay. Tuyệt vọng, bất lực, chán nản - có chứ, nhưng nó chỉ là một trạng thái cảm xúc và nó chỉ được phép tồn tại ngay chính tại khoảnh khắc đó mà thôi'.\n\nNgoài là nhà văn, chị Trà My còn là thành viên sáng lập Quỹ giấc mơ đôi chân thiên thần, là đại sứ niềm tin của Hành trình xuyên Việt 2011 từ Làng Sen đến Bến Nhà Rồng do hành trình xanh phát động, là Đại sứ thiện chí của Hành trình trên đất phù sa 2012 do Tương Lai Xanh và Nhà văn hóa thanh niên tổ chức.\n\nChị Trà My chính là tấm gương sáng về nghị lực phi thường, không chịu đầu hàng trước số phận, sống đẹp như những đóa hoa tỏa ngát hương thơm cho đời.",
    image:
      "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/2/1/876399/Tran-Tra-My-1.jpg",
    source: "Báo Lao Động",
    sourceUrl:
      "https://laodong.vn/nguoi-viet-tu-te/nu-nha-van-khuyet-tat-voi-nghi-luc-phi-thuong-va-niem-tin-vao-dieu-tu-te-876399.ldo",
  },
  {
    id: 3,
    userId: "story-3",
    name: "Nguyễn Công Hùng",
    title: "Hiệp sĩ công nghệ thông tin – Nguyễn Công Hùng",
    region: "Nghệ An",
    publishedAt: "2012-12-31",
    story:
      "Sinh năm 1982 ở miền quê nghèo Nghi Lộc (Nghệ An), từ nhỏ, Nguyễn Công Hùng bình thường như nhiều đứa trẻ khác. Đến năm 2 tuổi, cơ thể Hùng dần teo tóp với chứng bệnh nhão cơ. Dù gia đình đã nỗ lực đưa đi khắp các bệnh viện để điều trị nhưng không có kết quả, Hùng phải ngồi trên chiếc xe lăn suốt đời.\n\nMặc dù bệnh tật nhưng Nguyễn Công Hùng lại học rất giỏi, nhất là các môn về toán học và mỹ thuật. Đến năm 15 tuổi, khi sức khỏe Hùng rất kém, chỉ có duy nhất một ngón tay có thể cử động được, cô em gái thứ 2 cũng mắc bệnh giống anh nên Hùng phải nghỉ học.\n\n[IMAGE:https://i1-vnexpress.vnecdn.net/2013/01/02/nguyen-cong-hung-536286-1369376060.jpg?w=500&h=0&q=100&dpr=1&fit=crop&s=8zdb9UhCkOdRxH5ZBxfNvA]\n\nBức ảnh Nguyễn Công Hùng đưa lên Facebook cá nhân đầu tháng 12.\n\nThời gian này, Công Hùng làm quen với chiếc máy tính và mạng internet. Sự thông minh và ý chí, nghị lực phi thường đã giúp Hùng trở thành một chuyên gia về công nghệ dù chỉ với một ngón tay có thể cử động được. Từ đây, ý tưởng về việc giúp đỡ những người khuyết tật vươn lên bằng công nghệ thông tin ra đời. Năm 2003, Công Hùng thành lập nhóm Nối vòng tay lớn, nơi gặp gỡ, giao lưu của những người cùng cảnh ngộ.\n\nNăm 2004, Công Hùng mở trung tâm đào tạo tin học cho người khuyết tật tại nhà riêng xã Nghi Diên huyện Nghi Lộc. Với những hoạt động thiện nguyện có hiệu quả của mình, năm 2005, Công Hùng được phong là hiệp sĩ Công nghệ thông tin. Năm 2006, Công Hùng được Trung ương Đoàn bầu chọn 1 trong 10 gương mặt trẻ tiêu biểu toàn quốc,...\n\nTrước khi qua đời, hiệp sĩ Nguyễn Công Hùng đang là giám đốc của Trung tâm Nghị lực sống. Đây là mái nhà chung của những người khuyết tật, nơi giúp đỡ những người khuyết tật hòa nhập toàn diện với cuộc sống bằng những khóa học về công nghệ thông tin, ngoại ngữ, kỹ năng mềm, kỹ năng sống độc lập, kỹ năng làm việc trong doanh nghiệp và tìm kiếm việc làm cho họ. Bên cạnh đó, Công Hùng và những người bạn còn tổ chức rất nhiều các chương trình tình nguyện, các dự án nhân đạo giúp đỡ trẻ em nghèo và những người có cùng cảnh ngộ trên khắp cả nước.",
    image:
      "https://i2-vnexpress.vnecdn.net/2013/01/02/cong-hung-01-228095-1369376060.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=pqRaLC8v3xUF40Z8mqTHAA",
    source: "Báo Vn.express",
    sourceUrl:
      "https://vnexpress.net/hiep-si-nguyen-cong-hung-qua-doi-2408590-p3.html",
  },
  {
    id: 4,
    userId: "story-4",
    name: "Nguyễn Sơn Lâm",
    title: "Nguyễn Sơn Lâm – chinh phục Phanxipang bằng nạng gỗ",
    region: "Miền Bắc",
    publishedAt: "2017-07-15",
    story:
      "Anh Nguyễn Sơn Lâm năm nay 35 tuổi. Anh bị chứng loãng xương khi mới 1 tuổi nên bị teo và mất dần đôi chân. Từ đó tới nay, anh lớn lên cùng với 'người bạn thân' là đôi nạng.\n\n[IMAGE:/feedbackImage/son2.webp]\n\nNguyễn Sơn Lâm - chàng trai cao 90cm từng chinh phục Fansipan bằng đôi nạng gỗ.\n\nKhi đủ tuổi đi học, anh Lâm thường xuyên bị bạn bè trêu cợt bởi thân hình còi cọc. Thậm chí có những đứa trẻ ác ý còn gọi anh là thằng què, thằng lùn... Mặc dù buồn nhưng anh chưa bao giờ từ bỏ hi vọng với cuộc sống, ngược trở lại anh luôn khát khao thực hiện ước mơ của mình.\n\nAnh Sơn Lâm miệt mài đọc sách, nghe nhiều buổi diễn thuyết của các diễn giả nổi tiếng trong và ngoài nước. Anh muốn bằng những câu chuyện thật từ chính cuộc đời mình, người trẻ nhìn nhận và thức tỉnh để sống có ý nghĩa, nhân ái, mạnh mẽ hơn, nói cách khác anh muốn trở thành một diễn giả truyền cảm hứng cho các bạn trẻ.\n\nƯớc mơ đó đã trở thành hiện thực. Anh Sơn Lâm đã có nhiều buổi diễn thuyết miễn phí, kể về nỗ lực của anh và những điều anh chiêm nghiệm trong cuộc sống với các bạn trẻ trên khắp cả nước, từ Hà Nội tới Sài Gòn, Thái Nguyên, Thanh Hóa, Hải Dương, Nghệ An...\n\nTrước đó, anh Lâm từng làm nhiều công việc để có thu nhập, kiến thức và trải nghiệm. Anh từng là biên tập viên bóng đá, làm hình ảnh đại diện cho một số công ty, đại sứ thương hiệu và chuyên gia đào tạo của một số doanh nghiệp...\n\n[IMAGE:/feedbackImage/son1.webp]\n\nDiễn giả cao 90cm trong chương trình 'Đánh thức khát vọng' được tổ chức tại Trung tâm Văn hóa thị xã Giá Rai và Trường ĐH Bạc Liêu, với sự tham dự của hơn gần 3.000 bạn trẻ là học sinh, sinh viên đến từ các trường ĐH và THPT trên địa bàn tỉnh Bạc Liêu (tháng 4/2017) Ảnh: Huỳnh Hải\n\nVới chiều cao 90cm, cơ thể bé như trẻ nhỏ, đôi chân siêu vẹo bên nạng gỗ, anh Nguyễn Sơn Lâm vẫn tự tin diễn thuyết trước đám đông. Anh cũng từng tham gia cuộc thi Vietnam Idol vì muốn cổ vũ một người bạn của anh cũng muốn tham gia sân chơi này. Nguyễn Sơn Lâm nói với bạn mình rằng: 'Hãy nhìn tớ! Tớ sẽ thi cho bạn xem'.\n\nAnh cho rằng: 'Mỗi người sinh ra trên đời này đều có một niềm hạnh phúc. Bản thân mình được sinh ra đã là niềm hạnh phúc lớn lao'.\n\nThử thách vận động khó khăn nhất mà anh Lâm từng phải đối mặt là chinh phục đỉnh núi Fansipan. Bằng đôi nạng của mình, anh đã hoàn thành chặng đường gian khó nhất với một người khuyết tật đôi chân.\n\nAnh Sơn Lâm chia sẻ: 'Tôi cũng cho rằng mình thật liều lĩnh, hồi hộp và khủng khiếp, nhưng chưa bao giờ hối hận. Cung đường ấy quá vất vả, có lúc phải ngồi bóp chân tay vì đau ê ẩm, thậm chí còn hét lên trong rừng. Đó là trải nghiệm thú vị bởi dù lên đến nơi hay không, không quan trọng mà điều đặc biệt ở lúc mình ra quyết định'.\n\nAnh Lâm học được cách yêu quý bản thân từ chính sự kì thị của một số người trong xã hội dành cho người khuyết tật. Anh cho rằng ai cũng có điểm mạnh và điểm yếu, quan trọng là phải phát huy được lợi thế của bản thân và sống lạc quan.",
    image: "/feedbackImage/son1.webp",
    source: "Báo Dân trí",
    sourceUrl:
      "https://dantri.com.vn/nhip-song-tre/chang-trai-cao-90cm-tung-chinh-phuc-fansipan-bang-doi-nang-go-20170715084440137.htm",
  },
  {
    id: 5,
    userId: "story-5",
    name: "Nguyễn Phương Anh",
    title: "Cô gái 'xương thủy tinh' Nguyễn Phương Anh",
    region: "Hà Nội",
    publishedAt: "2013-07-25",
    story:
      "Trong suốt nhiều năm qua, cô bé Nguyễn Phương Anh phải gắn chặt cuộc sống của mình với chiếc xe lăn bởi em mắc phải một căn bệnh không thể chữa khỏi khiến hệ xương của em trở nên giòn và dễ vỡ. Căn bệnh này y học vẫn gọi là bệnh xương thủy tinh. Cuộc sống của những em bé mắc căn bệnh giống Phương Anh không hề đơn giản.\n\nThế nhưng em Phương Anh đã không chán nản, tuyệt vọng. Thay vào đó, em đã sử dụng một món quà quý giá được cuộc sống ban tặng, đó chính là giọng hát đầy nội lực của mình để truyền cảm hứng cho biết bao người sống quanh em và sau đó là biết bao người dân Việt Nam khác.\n\nPhương Anh hiện là một học sinh trung học, em sống ở thủ đô Hà Nội. Ngay từ khi sinh ra, bộ gen của em đã bị khiếm khuyết khiến cấu trúc xương trở nên mỏng manh, dễ vỡ tựa như thủy tinh. Căn bệnh quái ác này đã cướp đi cuộc sống bình thường của khoảng 20.000 người trên thế giới. Bất cứ một va chạm mạnh nào cũng có thể khiến người bệnh bị gãy xương.\n\nBản thân Phương Anh cũng đã bị gãy xương hơn 30 lần. Căn bệnh làm ức chế khả năng phát triển của cơ thể khiến em buộc phải phụ thuộc vào chiếc xe lăn để đi lại kể từ năm lên 8. Vậy là cô bé 16 tuổi đã phải di chuyển bằng xe lăn trong suốt 8 năm.\n\n[IMAGE:/feedbackImage/phuonganh2.webp]\n\nChia sẻ với tờ Asahi Shimbun (tờ Tin tức Sáng Chủ Nhật), Phương Anh nói rằng: 'Đã có lúc em rất buồn bởi em thấy mình tệ quá, tại sao mình lại khác với mọi người xung quanh đến vậy'.\n\nTuy vậy, thật may mắn, cuộc sống đã tặng em món quà ý nghĩa nhất, đó chính là người cha người mẹ tuyệt vời, luôn ở bên yêu thương, ủng hộ em trong mọi dự định và ước mơ. Chính nhờ vào tình yêu thương và sự hỗ trợ hết sức tận tụy của cha mẹ mà em đã có đủ can đảm để vượt lên hoàn cảnh, nhìn nhận khiếm khuyết cơ thể mình dưới một góc nhìn mới, lạc quan hơn.\n\nPhương Anh cho biết bố mẹ em luôn sẵn sàng cùng em đi tới bất cứ đâu em muốn. Họ không bao giờ nề hà việc gì bởi họ hiểu rằng việc đi lại của Phương Anh luôn cần có người hỗ trợ. Dần dần, em vui vẻ nhận ra rằng 'cơ thể yếu cũng không sao, mình cần phải khám phá ra những giá trị tiềm tàng khác của bản thân'.\n\n[IMAGE:/feedbackImage/phuonganh3.webp]\n\nNguyễn Phương Anh trong tà áo dài nữ sinh trung học\n\nKể từ đó em không còn buồn bã và ám ảnh với số lần bị gãy xương nữa. Thay vào đó, Phương Anh bắt đầu tìm tới với âm nhạc như một cách để giải tỏa bản thân, em bắt đầu ca hát. Bước ngoặt thay đổi cuộc sống của Phương Anh xảy ra hồi tháng 2 năm 2012.\n\nĐược các bạn bè cổ vũ, em đã quyết định tới tham dự chương trình truyền hình thực tế 'Vietnam's Got Talent' (cuộc thi Tìm kiếm tài năng Việt Nam), một sân chơi mà người ta mới chỉ thấy những người bình thường, lành lặn và khỏe mạnh tới thể hiện khả năng ca hát, nhảy múa của mình.\n\nBài hát mà khi đó Phương Anh chọn là 'Let's Dance' (Hãy cùng nhảy múa) - một bản hit gắn liền với tên tuổi nữ ca sĩ trẻ người Mỹ Miley Cyrus.\n\nNgay khi em bắt đầu cất tiếng hát, toàn bộ khán giả có mặt tại khán phòng đã nồng nhiệt cổ vũ cho cô bé dũng cảm. Họ đã cùng đứng lên để hoan hô em. Ban giám khảo cũng vô cùng ấn tượng với màn trình diễn của Nguyễn Phương Anh.\n\nMột thành viên trong ban giám khảo đã đưa ra nhận xét rằng: 'Em được sinh ra để mang lại niềm vui và hạnh phúc cho mọi người'.\n\nNgay lập tức đoạn video ghi lại phần thi của em gây sốt đối với cư dân mạng Việt Nam, những người chưa có dịp xem trên truyền hình đều vào mạng để xem lại phần trình diễn nhiều cảm xúc của Nguyễn Phương Anh. Em đã trở thành một điều kỳ diệu, một hiện tượng bất ngờ của mùa thi 'Vietnam's Got Talent' năm 2012.\n\nKể từ đây, Phương Anh bắt đầu tham gia vào nhiều chương trình mang ý nghĩa lớn như biểu diễn và phát biểu tại chương trình hội thảo của Quỹ Nhi đồng Liên hợp quốc - UNICEF Việt Nam. Đồng thời, em cũng tham gia vào nhiều sự kiện khác để chia sẻ về cuộc sống của mình nhằm truyền cảm hứng cho khán giả trên khắp đất nước Việt Nam.\n\n[IMAGE:/feedbackImage/phuonganh4.webp]\n\nNguyễn Phương Anh, 16 tuổi, phát biểu tại một sự kiện của UNICEF được tổ chức tại thành phố Đà Nẵng ngày 30/5/2013.\n\nTrong quá trình liên lạc phỏng vấn, phóng viên của Asahi Shimbun chủ yếu dùng thư điện tử, họ đã hỏi tại sao địa chỉ email của Phương Anh lại có từ 'crystal' (pha lê) trong đó, cô bé đã nói rằng pha lê chính là biểu tượng cho hình ảnh của em. 'Em trông có thể yếu đuối về thể chất nhưng em rất khó để có thể bị quật ngã về tinh thần'.",
    image: "/feedbackImage/phuonganh1.webp",
    source: "Báo Dân trí",
    sourceUrl:
      "https://dantri.com.vn/van-hoa/bao-nhat-viet-ve-co-be-xuong-thuy-tinh-nguyen-phuong-anh-1375198778.htm",
  },
  {
    id: 6,
    userId: "story-6",
    name: "Trần Quốc Hoàn",
    title: "Thầy giáo dạy học ngồi xe lăn",
    region: "Quảng Trị",
    publishedAt: "2013-05-20",
    story:
      "Anh là một người rất đặc biệt, bị liệt hoàn toàn nửa người phía dưới, suốt đời phải ngồi xe lăn nhưng bằng nghị lực phi thường, anh đã vươn lên thành người có ích cho xã hội.\n\nMột lớp học cũng rất đặc biệt do anh tổ chức cho những trẻ em nghèo xóm chợ, từ lâu đã trở thành một hình ảnh quen thuộc của những người dân phường 1, thành phố Đông Hà (Quảng Trị).\n\n[IMAGE:https://nguoiduatin.mediacdn.vn/public/data/images/tran-thi-thuy/thang5/tuan3/nguoiduatin-ANHCHINHnh2.jpg]\n\nAnh Trần Quốc Hoàn bên cạnh các con của mình.\n\nLá rách ít, đùm lá rách hơn\n\nAnh Trần Quốc Hoàn (sinh năm 1975) sinh ra trong một gia đình giàu truyền thống cách mạng ở Cam Chính, huyện Cam Lộ (Quảng Trị). Bố anh từng chiến đấu tại chiến trường Nam Bình - Trị Thiên khói lửa. Trong cuộc kháng chiến chống Mỹ cứu nước, không may bố anh bị nhiễm chất độc hóa học.\n\nLúc sinh ra, anh cũng bình thường như bao người khác, thế nhưng sau một trận sốt thì hai chân từ mất cảm giác đến teo hẳn, không còn khả năng đi lại. Thương con hiếu học, bố mẹ anh và bạn bè tình nguyện lấy lưng thay chân nâng bước anh đến trường.\n\nNhững năm tháng ấy vất vả trăm bề, nhưng anh không nản, quyết tâm học hành tử tế bù đắp công lao bố mẹ, bạn bè, hơn hết là anh muốn vượt lên số phận. Sau khi tốt nghiệp cấp 3, Hoàn quyết định không thi đại học, mà ở nhà mở một lớp học bồi dưỡng kiến thức cho những trẻ em nghèo ở xóm Chợ và xóm Vạn nơi gia đình sinh sống.\n\nMùa hè năm 2004, một lớp học nhỏ được dựng lên. Ban đầu anh chỉ nghĩ mở lớp cho một số em nâng cao kiến thức, nào ngờ chỉ một thời gian ngắn số lượng học sinh tìm đến ngày càng đông.\n\nNhững học sinh tìm về với anh có cả những đứa trẻ nghèo mà một chữ bẻ đôi chưa biết và cả những em học giỏi nhưng không có điều kiện để được học thêm. Chúng là con của những gia đình vạn chài lênh đênh trên sông nước, trong số đó không ít trẻ đánh giày, ăn xin và mưu sinh trên đường phố. Có em bán vé số, em lượm ve chai, bán nước dạo, gia cảnh khó khăn nhưng ham học đều tìm đến thầy.\n\nThấy đứa trẻ nào bán vé số, đánh giày trên đường, Hoàn đều động viên chúng đến với mình. Như cá gặp nước, chúng hân hoan kéo nhau đến chật nhà anh xin được học chữ. Không phân biệt hay nề hà, anh nhận tất cả vào lớp với niềm phấn chấn lạ thường.\n\nCó thời điểm, căn nhà nhỏ bé của anh đón nhận 50 em. Việc làm của anh hoàn toàn tự nguyện, anh dạy miễn phí cho các em, không chờ đền đáp, bởi ở xóm nghèo này cái mà những phụ huynh giàu có nhất đó là tấm lòng.\n\nNgười thì chài lưới quanh năm bầu bạn với mom sông, người bán xôi sáng, cháo lòng, thậm chí có đứa trẻ bố đi làm thuê, mẹ bệnh tật nằm liệt giường, đôi khi anh còn móc ví đưa cho nó dăm ngàn tiền lẻ để ăn sáng hay mua rau giúp mẹ.\n\nLớp học của anh Trần Quốc Hoàn luôn dao động từ khoảng 15 đến 35 em từ lớp 1 đến lớp 4, hầu hết các em đều là trẻ em phải lao động sớm, không được học hành đến nơi đến chốn. Tính đến nay, anh đã dạy hơn 250 em học sinh...\n\nTranh thủ những thời gian không đứng lớp, anh giúp vợ phân loại ve chai, tháo nắp lon và chặt lon sắt trước khi đem bán. Anh Trần Quốc Hoàn tâm sự, gần chục năm qua, anh không nhớ mình đã nhận dạy chữ cho bao nhiêu em, chỉ biết rằng trong số các em đã được anh thụ giáo, có không ít người đã trưởng thành, đó là điều khiến anh hạnh phúc nhất.\n\nNơi chắp cánh ước mơ\n\nRời bước khỏi lớp học của anh Trần Quốc Hoàn, trong cái nắng oi nồng của một ngày đầu hạ, những tiếng trẻ bi bô học bài cứ níu bước chân người đi. Hình ảnh những học trò áo quần đen nhẻm, vá chằng chịt, tóc xơ xác bởi những bào mòn của bụi bặm đường phố, bởi những lo toan của một tuổi thơ vất vả và hình ảnh một ông thầy tật nguyền trên chiếc xe lăn cứ theo tôi suốt dọc đường về. Đơn sơ, giản dị thế thôi nhưng chính từ lớp học chật chội, không bảng, không phấn, chỉ hai dãy bàn ghế gỗ ấy, mà hơn 10 năm qua đã có biết bao đứa trẻ bất hạnh được chắp cánh ước mơ trên con đường học vấn.\n\nNỗ lực vượt lên chính mình\n\nNhững em học sinh đầu tiên của anh nay đã bước vào giảng đường đại học, như trường hợp của em Hoàng Thu Trang. Nhờ lớp học tình thương của thầy Hoàn, Trang đã vượt qua được những khó khăn của gia đình và mặc cảm nghèo khó, để vươn lên thực hiện ước mơ đèn sách của mình.\n\nNăm nay, Trang đang là sinh viên năm thứ 3 trường Đại học KHXH&NV TP.HCM. Hiện có rất nhiều học sinh bước ra từ cái nôi này đang theo học các trường đại học hàng đầu của nước ta, như Đại học Kinh tế Quốc dân Hà Nội, Đại học Ngoại giao, Đại học Giao thông - Vận tải.\n\nNgoài việc làm dạy học nhân văn ấy, anh Trần Quốc Hoàn còn được biết đến là vận động viên khuyết tật nổi tiếng của tỉnh Quảng Trị. Năm 2006, anh mạnh dạn đăng ký tham gia cuộc thi dành cho người khuyết tật tỉnh Quảng Trị và thật bất ngờ là ngay lần đầu tiên tham gia, anh đã đạt thứ hạng cao ở nội dung xe lăn.\n\nSau khi vào đội tuyển thể dục thể thao dành cho người khuyết tật của thành phố Đông Hà, anh bắt đầu tham dự các hội thao của người khuyết tật trong toàn quốc. Năm 2007, lần đầu tiên tham gia hội thao toàn quốc nhưng anh đã tự tin ẵm về huy chương đồng cho đoàn Quảng Trị.\n\nSau đó, Trần Quốc Hoàn tiếp tục tham dự nhiều giải đấu trong nước và khu vực, tiếp tục giành những giải thưởng đáng nể. Hiện tại, anh đang sở hữu 12 huy chương vàng, 19 huy chương bạc và 8 huy chương đồng.\n\nCuộc sống hai vợ chồng anh Hoàn tính đến nay vẫn còn nhiều khó khăn, nhưng dù vất vả đến đâu, vợ chồng anh vẫn quyết duy trì lớp học tình thương này. Anh lấy việc cưu mang, dạy dỗ các em làm niềm đam mê trong cuộc sống.",
    image:
      "https://nguoiduatin.mediacdn.vn/zoom/600_315/public/data/images/tran-thi-thuy/thang5/tuan3/nguoiduatin-ANHCHINHnh2.jpg",
    source: "Báo Người đưa tin",
    sourceUrl:
      "https://www.nguoiduatin.vn/cam-dong-cau-chuyen-thay-giao-khuyet-tat-di-uom-mam-20442009.htm",
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
