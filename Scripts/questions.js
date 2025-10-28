// Đây là file chứa dữ liệu câu hỏi cho game
// Cấu trúc: 1 mảng (Array) chứa các đối tượng (Object) câu hỏi
// 4 câu đầu (index 0-3) cho Màn 1 (id: 0)
// 4 câu tiếp (index 4-7) cho Màn 2 (id: 1)
// 4 câu cuối (index 8-11) cho Màn 3 (id: 2)

const gameQuestions = [
    // --- LEVEL 1 (Màn 0) ---
    {
        question: "Bạn nhận được tin nhắn với đường link “http://gift-bank.vip” thông báo trúng thưởng 5 triệu đồng. Hành động nào là an toàn nhất?",
        options: [
            "Bấm vào link để nhận quà",
            "Gửi link cho bạn bè để hỏi thử",
            "Bỏ qua, không nhấp vào và báo cáo tin nhắn lừa đảo",
            "Lưu lại để hôm sau kiểm tra"
        ],
        correct: 2, // Đáp án C (index 2)
        explanation: "Các đường link trúng thưởng là chiêu dụ đánh cắp thông tin. Không nhấp vào, hãy báo cáo lừa đảo."
    },
    {
        question: "Dấu hiệu nào cho thấy một website có khả năng giả mạo?",
        options: [
            "Có biểu tượng ổ khóa trên thanh địa chỉ",
            "Tên miền lạ, lỗi chính tả, không có chứng chỉ bảo mật",
            "Giao diện hiện đại và nhiều quảng cáo",
            "Có liên kết tới trang báo uy tín"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "Trang lừa đảo thường “nhái” tên miền thật, thêm ký tự lạ hoặc không có “https://” (chứng chỉ bảo mật)."
    },
    {
        question: "Bạn nhận được email nói rằng “Tài khoản của bạn có giao dịch bất thường, hãy nhập OTP để xác nhận”. Bạn nên làm gì?",
        options: [
            "Nhập ngay OTP để tránh bị khóa tài khoản",
            "Gọi tổng đài ngân hàng hoặc mở ứng dụng chính thức để kiểm tra",
            "Chụp màn hình gửi bạn bè xem giúp",
            "Trả lời lại email để hỏi thêm thông tin"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "Ngân hàng thật không bao giờ yêu cầu cung cấp OTP qua email hoặc đường link. Hãy xác minh qua kênh chính thức."
    },
    {
        question: "Một tin nhắn SMS yêu cầu bạn 'cập nhật thông tin' qua một đường link lạ. Đây có thể là gì?",
        options: [
            "Một thông báo bảo trì hệ thống bình thường",
            "Một hình thức 'Smishing' (lừa đảo qua SMS) để đánh cắp tài khoản",
            "Một khảo sát bắt buộc từ nhà mạng",
            "Một lỗi gửi tin nhắn của hệ thống"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "Smishing là hình thức lừa đảo qua SMS, dụ dỗ bạn nhấp vào link độc hại hoặc cung cấp thông tin nhạy cảm."
    },

    // --- LEVEL 2 (Màn 1) ---
    {
        question: "Một dự án hứa lợi nhuận 60%/tháng, yêu cầu chuyển tiền trong 1 giờ. Dấu hiệu nào cho thấy đây là lừa đảo?",
        options: [
            "Có giấy mời đầu tư và chữ ký điện tử",
            "Cam kết lãi suất quá cao, yêu cầu nộp tiền gấp",
            "Dự án có logo công ty rõ ràng",
            "Có người nổi tiếng quảng bá"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "Các dự án đầu tư ảo thường hứa lãi cao phi lý và ép chuyển tiền nhanh để chiếm đoạt."
    },
    {
        question: "Khi nhận cuộc gọi tự xưng “Công an điều tra” và yêu cầu chuyển tiền để chứng minh vô tội, bạn nên:",
        options: [
            "Làm theo vì sợ liên lụy pháp lý",
            "Giữ bình tĩnh, kiểm tra lại thông tin qua cơ quan công an thật",
            "Hỏi họ số tài khoản để tra cứu",
            "Tắt máy ngay và bỏ qua"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "Cơ quan công an không bao giờ yêu cầu chuyển tiền qua điện thoại. Cần xác minh thông tin chính thức."
    },
    {
        question: "Khi cần trình báo vụ việc lừa đảo trực tuyến, bạn có thể liên hệ:",
        options: [
            "Bộ Giáo dục và Đào tạo",
            "Cục An ninh mạng và phòng, chống tội phạm (A05) – Bộ Công an",
            "Cục Thuế Việt Nam",
            "Sở Văn hóa – Thể thao – Du lịch"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "A05 – Bộ Công an và Cục An toàn thông tin là hai đơn vị tiếp nhận, xử lý các vụ việc lừa đảo online."
    },
    {
        question: "Một quảng cáo 'việc nhẹ lương cao', chỉ cần 'like dạo' hoặc 'chuyển khoản đặt cọc' là có hoa hồng. Đây là dấu hiệu của:",
        options: [
            "Cơ hội việc làm tốt hiếm có",
            "Công việc bán thời gian hợp pháp",
            "Lừa đảo tuyển dụng, yêu cầu nộp phí hoặc thực hiện nhiệm vụ ảo",
            "Một chương trình thử nghiệm của công ty lớn"
        ],
        correct: 2, // Đáp án C (index 2)
        explanation: "Đây là chiêu trò lừa đảo phổ biến, ban đầu cho hưởng lợi nhỏ, sau đó yêu cầu nộp số tiền lớn hơn và chiếm đoạt."
    },

    // --- LEVEL 3 (Màn 2) ---
    {
        question: "Kẻ xấu gửi tin nhắn: “Chuyển 100 triệu nếu không sẽ phát tán ảnh riêng tư của bạn”. Cách xử lý đúng là:",
        options: [
            "Chuyển tiền ngay để bảo vệ hình ảnh",
            "Báo công an và giữ lại toàn bộ tin nhắn làm bằng chứng",
            "Chặn tin nhắn và im lặng",
            "Đăng tin lên mạng để nhờ người giúp"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "Đây là hành vi tống tiền. Cần giữ bằng chứng (tin nhắn, tài khoản...) và trình báo ngay."
    },
    {
        question: "Khi phát hiện bị lừa đảo chuyển tiền, bước đầu tiên cần làm là:",
        options: [
            "Xóa lịch sử giao dịch để tránh bị phát hiện",
            "Báo ngay cho ngân hàng để khóa tài khoản và liên hệ công an",
            "Đợi vài giờ xem tiền có được hoàn lại không",
            "Đăng bài lên mạng xã hội nhờ hỗ trợ"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "Báo ngân hàng sớm giúp phong tỏa giao dịch, tăng khả năng thu hồi tiền."
    },
    {
        question: "Sau khi nghi ngờ thiết bị bị nhiễm mã độc, bạn nên:",
        options: [
            "Quét virus, đổi mật khẩu và bật xác thực hai lớp (2FA)",
            "Đăng nhập lại tài khoản cũ để kiểm tra dữ liệu",
            "Mở USB khả nghi để xem nội dung",
            "Chia sẻ thiết bị cho người khác kiểm tra giúp"
        ],
        correct: 0, // Đáp án A (index 0)
        explanation: "Quét virus và kích hoạt bảo mật 2FA là bước khôi phục thiết bị an toàn nhất."
    },
    {
        question: "Bạn thấy video người thân cầu cứu, nhưng mắt không khớp khẩu hình, giọng nói méo. Đây là dấu hiệu của:",
        options: [
            "Kết nối mạng yếu",
            "Video deepfake giả mạo",
            "Camera quay ngược sáng",
            "Lỗi phần mềm phát video"
        ],
        correct: 1, // Đáp án B (index 1)
        explanation: "Deepfake là công nghệ dùng AI để giả giọng nói và khuôn mặt nhằm lừa đảo người xem."
    }
    // Bạn có thể thêm các câu 11, 12... vào đây nếu muốn dùng cho các màn chơi sau
];

