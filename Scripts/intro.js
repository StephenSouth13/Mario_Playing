/*
 * =========================================
 * SCRIPTS/INTRO.JS
 * Xử lý tải và hiển thị màn hình cốt truyện
 * =========================================
 */

// URL Tài liệu tham khảo (Cần mở trong tab mới)
const REFERENCE_URL = "https://drive.google.com/file/d/1Qd_GPf77fIQ7gXKZMnJwdO1VKWm-P__D/view?fbclid=IwY2xjawNQk-FleHRuA2FlbQIxMABicmlkETF3emVBYmlCQVhscDNsYTliAR5yc17bB_-gMhSIrMhtoCHT6--sTnxsbc2aiqsh1KTbYulXZRp-x2obZNAhFw_aem_zVGWzAfytpp-aE5fUZxNsw";

// HTML của màn hình giới thiệu (Intro Screen)
// Nội dung này sẽ được chèn vào <div id="story-intro-container">
const INTRO_SCREEN_HTML = `
    <div id="story-intro-screen" class="hidden">
        <div id="story-box" class="story-fade-in">
            <h2 class="title-glow">GIẢI CỨU LINH: 10 PHÚT SINH TỬ</h2>
            <div id="story-content">
                
                <div class="story-section">
                    <h3>[ Cốt Truyện & Nhiệm Vụ ]</h3>
                    <p>
                        Sinh viên Linh đang bị mắc kẹt trong bẫy lừa đảo trực tuyến (Cyber Scam). Bạn là chuyên gia bảo mật, có <strong>10:00 (600s)</strong> để giải cứu cô ấy.
                    </p>
                    <div class="mission-stats">
                        <span class="stat-item"><i class="fas fa-clock"></i> Thời Gian Tổng: <strong>10:00</strong></span>
                        <span class="stat-item"><i class="fas fa-layer-group"></i> Levels: <strong>3</strong></span>
                        <span class="stat-item"><i class="fas fa-question-circle"></i> Câu Hỏi: <strong>12</strong></span>
                    </div>
                </div>

                <hr class="divider-dashed">
                
                <div class="story-penalty">
                    <h3><i class="fas fa-exclamation-triangle"></i> CẢNH BÁO PHẠT</h3>
                    <ul class="penalty-list">
                        <li>
                            <span class="penalty-icon">&#9679;</span> Trả lời SAI: Bị phạt -2:00 (120 giây).
                        </li>
                        <li>
                            <span class="penalty-icon">&#9679;</span> Hết giờ (00:00): Nhiệm vụ thất bại!
                        </li>
                    </ul>
                </div>

                <div class="reference-box">
                    <p>
                        <i class="fas fa-search"></i> Tham khảo trước:
                    </p>
                    <a href="${REFERENCE_URL}" target="_blank" class="btn-reference">
                        <i class="fas fa-book"></i> CẨM NANG PHÒNG CHỐNG LỪA ĐẢO ONLINE
                    </a>
                </div>
                
            </div>
            <button id="start-game-button" class="btn-primary-glow">
                <i class="fas fa-terminal"></i> BẮT ĐẦU GIẢI CỨU (START)
            </button>
        </div>
    </div>
`;

/**
 * Tải HTML của Intro Screen và thiết lập sự kiện.
 */
window.loadIntroScreen = function() {
    const container = document.getElementById('story-intro-container');
    if (!container) {
        console.error("Intro Container #story-intro-container not found!");
        return;
    }

    container.innerHTML = INTRO_SCREEN_HTML;

    const introScreen = document.getElementById('story-intro-screen');
    const storyBox = document.getElementById('story-box');
    const startGameButton = document.getElementById('start-game-button');

    // 1. Hiển thị màn hình Intro (Fade-in)
    introScreen.classList.remove('hidden');
    setTimeout(() => {
        introScreen.style.opacity = '1'; 
        storyBox.classList.add('active'); // Kích hoạt animation pop-up cho box
    }, 50); 
    
    // 2. Thiết lập sự kiện cho nút Bắt Đầu
    if (startGameButton) {
        startGameButton.addEventListener('click', function() {
            // Hiệu ứng Fade out
            introScreen.style.opacity = '0';
            storyBox.classList.remove('active'); 
            storyBox.classList.add('story-fade-out'); // Kích hoạt hiệu ứng pop-down/fade-out

            // Chuyển sang Game sau khi fade out (500ms)
            setTimeout(() => {
                introScreen.classList.add('hidden');
                if (typeof window.startGameSession === 'function') {
                    window.startGameSession();
                } else {
                    console.error("startGameSession function not found! Check index.html.");
                }
            }, 500); 
        });
    } else {
        console.error("Start Game Button not found.");
    }
}