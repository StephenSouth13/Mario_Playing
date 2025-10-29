/*
 * ESCAPE THE SCAM - QUESTIONS DATABASE
 * 12 câu hỏi về An toàn Thông tin
 * Chia đều: 4 câu/Level (Level 0, 1, 2)
 */

const gameQuestions = [
    // ========================================
    // LEVEL 1 (Level ID = 0): Index 0-3
    // Nhận diện tin nhắn & đường link lừa đảo, email giả mạo
    // ========================================
    {
        question: "Bạn nhận được tin nhắn: 'Tài khoản của bạn đã bị khóa. Click link sau để xác minh: bit.ly/xyz123'. Bạn nên làm gì?",
        options: [
            "Click vào link để kiểm tra ngay",
            "Bỏ qua tin nhắn và đăng nhập trực tiếp vào trang chính thức để kiểm tra",
            "Trả lời tin nhắn để hỏi thêm thông tin",
            "Gửi thông tin cá nhân qua tin nhắn để xác minh"
        ],
        correct: 1,
        explanation: "Đúng rồi! Không bao giờ click vào link lạ trong tin nhắn đáng ngờ. Luôn đăng nhập trực tiếp vào trang web chính thức để kiểm tra tài khoản."
    },
    {
        question: "Dấu hiệu nào cho thấy một email có thể là email lừa đảo (phishing)?",
        options: [
            "Email có logo rõ ràng của công ty",
            "Email có nhiều lỗi chính tả và ngữ pháp kém",
            "Email được gửi vào giờ hành chính",
            "Email có chữ ký điện tử"
        ],
        correct: 1,
        explanation: "Chính xác! Email lừa đảo thường có lỗi chính tả, ngữ pháp kém và thiết kế không chuyên nghiệp. Đây là dấu hiệu cảnh báo quan trọng."
    },
    {
        question: "Bạn nhận được email từ 'admin@bankk-vn.com' yêu cầu cập nhật thông tin tài khoản. Điều gì đáng ngờ?",
        options: [
            "Email có logo ngân hàng đẹp",
            "Tên miền có chữ 'k' thừa (bankk thay vì bank)",
            "Email yêu cầu cập nhật thông tin",
            "Email được gửi vào buổi sáng"
        ],
        correct: 1,
        explanation: "Chính xác! Kẻ lừa đảo thường dùng tên miền giả mạo rất giống tên miền thật (typosquatting). Luôn kiểm tra kỹ địa chỉ email người gửi."
    },
    {
        question: "Đâu là cách AN TOÀN nhất để kiểm tra thông tin từ một email đáng ngờ của ngân hàng?",
        options: [
            "Reply email đó để hỏi",
            "Gọi điện trực tiếp đến số hotline chính thức của ngân hàng",
            "Click vào link trong email",
            "Gửi thông tin tài khoản qua email để xác minh"
        ],
        correct: 1,
        explanation: "Đúng vậy! Cách an toàn nhất là liên hệ trực tiếp với ngân hàng qua số hotline chính thức (không dùng số trong email đáng ngờ) để xác minh."
    },

    // ========================================
    // LEVEL 2 (Level ID = 1): Index 4-7
    // Lừa đảo tài chính & đầu tư ảo, giả danh công an
    // ========================================
    {
        question: "Một người lạ nhắn tin mời bạn tham gia đầu tư 'lời 30%/tháng, không rủi ro'. Đây là dấu hiệu gì?",
        options: [
            "Cơ hội đầu tư tốt, nên tham gia ngay",
            "Dấu hiệu của lừa đảo đa cấp/đầu tư ảo",
            "Chương trình khuyến mại hợp pháp",
            "Cơ hội kiếm tiền nhanh"
        ],
        correct: 1,
        explanation: "Chính xác! Không có khoản đầu tư nào 'lời cao, không rủi ro'. Đây là chiêu trò phổ biến của lừa đảo đa cấp và đầu tư ảo."
    },
    {
        question: "Có người tự xưng 'Công an' gọi điện yêu cầu bạn chuyển tiền vào 'tài khoản bảo mật' để điều tra. Bạn nên?",
        options: [
            "Chuyển tiền ngay để chứng minh mình vô tội",
            "Từ chối và báo ngay cho công an thật qua đường dây nóng 113",
            "Đưa thông tin cá nhân để họ điều tra",
            "Hỏi thêm thông tin cá nhân của họ"
        ],
        correct: 1,
        explanation: "Đúng rồi! Công an KHÔNG BAO GIỜ yêu cầu chuyển tiền qua điện thoại. Hãy gác máy và báo ngay cho cơ quan công an thật (113)."
    },
    {
        question: "Dấu hiệu nào cho thấy một trang web đầu tư có thể là lừa đảo?",
        options: [
            "Có giao diện đẹp và chuyên nghiệp",
            "Hứa hẹn lợi nhuận cực cao trong thời gian ngắn, không có giấy phép kinh doanh rõ ràng",
            "Có nhiều người bình luận tích cực",
            "Có logo và slogan hấp dẫn"
        ],
        correct: 1,
        explanation: "Chính xác! Hứa hẹn lợi nhuận phi thực tế + thiếu giấy phép/chứng nhận là dấu hiệu của lừa đảo. Luôn kiểm tra giấy phép kinh doanh trước khi đầu tư."
    },
    {
        question: "Bạn thấy quảng cáo 'Kiếm 50 triệu/tháng chỉ với điện thoại, làm việc tại nhà'. Đây có thể là?",
        options: [
            "Công việc hợp pháp tuyệt vời",
            "Lừa đảo tuyển dụng hoặc đa cấp",
            "Chương trình đào tạo miễn phí",
            "Cơ hội nghề nghiệp tốt"
        ],
        correct: 1,
        explanation: "Đúng! Quảng cáo 'kiếm tiền dễ dàng, lương cao' thường là bẫy lừa đảo tuyển dụng, yêu cầu đóng phí hoặc kéo bạn vào đa cấp."
    },

    // ========================================
    // LEVEL 3 (Level ID = 2): Index 8-11
    // Bảo mật cá nhân, tống tiền, ứng phó Deepfake
    // ========================================
    {
        question: "Thông tin nào KHÔNG NÊN chia sẻ công khai trên mạng xã hội?",
        options: [
            "Ảnh phong cảnh du lịch",
            "Số điện thoại, địa chỉ nhà, ảnh CMND/CCCD",
            "Sở thích và món ăn yêu thích",
            "Trích dẫn sách hay"
        ],
        correct: 1,
        explanation: "Chính xác! Số điện thoại, địa chỉ, ảnh giấy tờ là thông tin nhạy cảm. Kẻ xấu có thể dùng để giả mạo danh tính hoặc lừa đảo."
    },
    {
        question: "Bạn nhận được video call từ 'người thân' nhưng họ yêu cầu chuyển tiền gấp do 'gặp nạn'. Giọng nói và hình ảnh rất giống. Bạn nên?",
        options: [
            "Chuyển tiền ngay vì đó là người thân",
            "Gác máy và gọi lại số điện thoại quen thuộc của người thân đó để xác minh",
            "Hỏi thêm thông tin rồi chuyển tiền",
            "Nhờ bạn bè chuyển hộ"
        ],
        correct: 1,
        explanation: "Đúng rồi! Đây có thể là Deepfake (công nghệ giả mạo âm thanh/hình ảnh). Luôn XÁC MINH qua kênh khác trước khi chuyển tiền."
    },
    {
        question: "Có người gửi email đính kèm file 'hoa_don.pdf.exe' và yêu cầu bạn mở. Bạn nên làm gì?",
        options: [
            "Mở file để xem hóa đơn",
            "XÓA NGAY email đó, đây là virus/malware (file .exe giả dạng PDF)",
            "Tải file về máy trước rồi suy nghĩ",
            "Gửi lại cho người khác để hỏi ý kiến"
        ],
        correct: 1,
        explanation: "Chính xác! File có đuôi kép (vd: .pdf.exe) là dấu hiệu của virus/malware. KHÔNG BAO GIỜ mở file đính kèm lạ. Xóa ngay!"
    },
    {
        question: "Cách tạo mật khẩu AN TOÀN nhất là gì?",
        options: [
            "Dùng tên + ngày sinh (vd: Nam2000)",
            "Dùng chuỗi dài, kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt, KHÁC NHAU cho mỗi tài khoản",
            "Dùng mật khẩu dễ nhớ như '123456'",
            "Dùng cùng 1 mật khẩu cho mọi tài khoản"
        ],
        correct: 1,
        explanation: "Hoàn toàn đúng! Mật khẩu mạnh phải dài, phức tạp và KHÁC NHAU cho mỗi tài khoản. Nên dùng công cụ quản lý mật khẩu (Password Manager)."
    }
];
