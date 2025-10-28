// Dữ liệu câu hỏi cho game Escape The Scam
// Mỗi màn chơi sẽ lấy 1 câu hỏi từ mảng này theo thứ tự

const gameQuestions = [
    // --- Level 1 Quiz ---
    {
        question: "Bạn nhận được tin nhắn với link “http://gift-bank.vip” báo trúng thưởng 5 triệu. Hành động nào an toàn nhất?",
        options: [
            "Bấm vào link để nhận quà",
            "Gửi link cho bạn bè để hỏi thử",
            "Bỏ qua, không nhấp vào và báo cáo lừa đảo",
            "Lưu lại để hôm sau kiểm tra"
        ],
        correct: 2, // Index của đáp án C
        explanation: "Các link trúng thưởng là chiêu dụ đánh cắp thông tin hoặc cài mã độc. Không nhấp vào, hãy báo cáo."
    },
    {
        question: "Dấu hiệu nào cho thấy một website có khả năng giả mạo?",
        options: [
            "Có biểu tượng ổ khóa trên thanh địa chỉ",
            "Tên miền lạ, lỗi chính tả, không có chứng chỉ bảo mật (https)",
            "Giao diện hiện đại và nhiều quảng cáo",
            "Có liên kết tới trang báo uy tín"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Trang lừa đảo thường “nhái” tên miền thật, thêm ký tự lạ hoặc không có “https://”."
    },
    {
        question: "Email nói “Tài khoản có giao dịch bất thường, nhập OTP để xác nhận”. Bạn nên làm gì?",
        options: [
            "Nhập ngay OTP để tránh bị khóa tài khoản",
            "Gọi tổng đài ngân hàng hoặc mở App chính thức để kiểm tra",
            "Chụp màn hình gửi bạn bè xem giúp",
            "Trả lời lại email để hỏi thêm thông tin"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Ngân hàng thật KHÔNG bao giờ yêu cầu OTP qua email/link. Hãy xác minh qua kênh chính thức."
    },
    // --- Level 2 Quiz ---
    {
        question: "Dự án gửi “Hợp đồng đầu tư online” hứa lãi 60%/tháng, yêu cầu chuyển tiền gấp. Dấu hiệu lừa đảo?",
        options: [
            "Có giấy mời đầu tư và chữ ký điện tử",
            "Cam kết lãi suất quá cao, yêu cầu nộp tiền gấp",
            "Dự án có logo công ty rõ ràng",
            "Có người nổi tiếng quảng bá"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Các dự án ảo thường hứa lãi cao phi lý và ép chuyển tiền nhanh để chiếm đoạt."
    },
    {
        question: "Cuộc gọi tự xưng “Công an điều tra rửa tiền” yêu cầu chuyển tiền để chứng minh vô tội. Bạn nên:",
        options: [
            "Làm theo vì sợ liên lụy pháp lý",
            "Giữ bình tĩnh, kiểm tra lại qua cơ quan công an thật",
            "Hỏi họ số tài khoản để tra cứu",
            "Tắt máy ngay và bỏ qua"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Cơ quan công an KHÔNG bao giờ yêu cầu chuyển tiền qua điện thoại. Cần xác minh chính thức."
    },
    {
        question: "Khi cần trình báo lừa đảo trực tuyến, bạn liên hệ:",
        options: [
            "Bộ Giáo dục và Đào tạo",
            "Cục An ninh mạng (A05) – Bộ Công an",
            "Cục Thuế Việt Nam",
            "Sở Văn hóa – Thể thao – Du lịch"
        ],
        correct: 1, // Index của đáp án B
        explanation: "A05 – Bộ Công an và Cục An toàn thông tin tiếp nhận, xử lý các vụ lừa đảo online."
    },
    // --- Level 3 Quiz ---
     {
        question: "Tin nhắn: “Chuyển 100 triệu nếu không sẽ phát tán ảnh riêng tư”. Cách xử lý đúng?",
        options: [
            "Chuyển tiền ngay để bảo vệ hình ảnh",
            "Báo công an và giữ lại toàn bộ tin nhắn làm bằng chứng",
            "Chặn tin nhắn và im lặng",
            "Đăng tin lên mạng để nhờ người giúp"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Đây là tống tiền. Cần giữ bằng chứng (tin nhắn, tài khoản...) và trình báo ngay."
    },
    {
        question: "Khi phát hiện bị lừa đảo chuyển tiền, bước đầu tiên cần làm là:",
        options: [
            "Xóa lịch sử giao dịch",
            "Báo ngay cho ngân hàng để khóa TK và liên hệ công an",
            "Đợi vài giờ xem tiền có được hoàn lại không",
            "Đăng bài lên mạng xã hội nhờ hỗ trợ"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Báo ngân hàng sớm giúp phong tỏa giao dịch, tăng khả năng thu hồi tiền."
    },
    {
        question: "Sau khi nghi ngờ thiết bị bị nhiễm mã độc, bạn nên:",
        options: [
            "Quét virus, đổi mật khẩu và bật xác thực hai lớp (2FA)",
            "Đăng nhập lại tài khoản cũ để kiểm tra",
            "Mở USB khả nghi để xem nội dung",
            "Chia sẻ thiết bị cho người khác kiểm tra giúp"
        ],
        correct: 0, // Index của đáp án A
        explanation: "Quét virus và kích hoạt bảo mật 2FA là bước khôi phục thiết bị an toàn nhất."
    },
    // --- Level 4 Quiz ---
    {
        question: "Video người thân cầu cứu, nhưng mắt không khớp khẩu hình, giọng nói méo. Đây là dấu hiệu của:",
        options: [
            "Kết nối mạng yếu",
            "Video deepfake giả mạo",
            "Camera quay ngược sáng",
            "Lỗi phần mềm phát video"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Deepfake dùng AI để giả giọng nói và khuôn mặt nhằm lừa đảo người xem."
    },
    {
        question: "Cuộc gọi video thấy hình ảnh người thân bị trói, kêu cứu. Bạn nên làm gì đầu tiên?",
        options: [
            "Chuyển tiền ngay",
            "Giữ bình tĩnh, gọi ngay cho người thân bằng số khác để kiểm tra",
            "Gọi lại cho số đó để hỏi rõ địa điểm",
            "Chia sẻ đoạn video lên mạng"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Đây có thể là deepfake giả bắt cóc. Luôn xác minh bằng kênh khác trước."
    },
    {
        question: "Nếu nghi ngờ gặp trường hợp bắt cóc online, bạn nên làm gì?",
        options: [
            "Chuyển tiền trước rồi báo sau",
            "Giữ bằng chứng, gọi ngay 113 hoặc Cục A05 – Bộ Công an",
            "Xóa tin nhắn để không bị phát hiện",
            "Gửi video cho người khác để bình luận"
        ],
        correct: 1, // Index của đáp án B
        explanation: "Cần lưu giữ bằng chứng (số điện thoại, tài khoản, video) và trình báo ngay cho công an."
    },
];

// Biến để theo dõi câu hỏi hiện tại cho mỗi màn chơi
// Key là level.id, value là index câu hỏi trong gameQuestions
var levelQuestionIndex = {};
