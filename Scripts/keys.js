/*
 * =========================================
 * SCRIPTS/KEYS.JS
 * Xử lý Input Bàn phím & Hỗ trợ Joystick Mobile
 * =========================================
 * Dựa trên code gốc của Florian Rappl, 2012.
 */

var keys = {
    // Các biến trạng thái, được đọc bởi main.js trong mỗi tick
    accelerate: false, // Phím chạy nhanh/bắn (Z, X, Shift, Ctrl, A)
    left: false,       // Mũi tên Trái (Di chuyển Trái) - KeyCode 37
    right: false,      // Mũi tên Phải (Di chuyển Phải) - KeyCode 39
    up: false,         // Mũi tên Lên (Nhảy) - KeyCode 38
    down: false,       // Mũi tên Xuống (Ngồi) - KeyCode 40
};

// --- Ánh xạ KeyCode (Thêm phím Z, X, Shift, Ctrl, A cho linh hoạt) ---
const KEY_MAP = {
    // Phím điều hướng cơ bản (Được sử dụng bởi Mobile Joystick mô phỏng)
    37: 'left',         // Mũi tên Trái
    39: 'right',        // Mũi tên Phải
    38: 'up',           // Mũi tên Lên
    40: 'down',         // Mũi tên Xuống
    
    // Phím chức năng (Accelerate/Fire)
    17: 'accelerate',   // Ctrl
    16: 'accelerate',   // Shift (Phím thường dùng cho chạy nhanh)
    90: 'accelerate',   // Phím Z
    88: 'accelerate',   // Phím X (Tương tự Z, cho người chơi linh hoạt)
    65: 'accelerate',   // Phím A (Theo code cũ)
    57392: 'accelerate' // Ctrl trên MAC (Theo code cũ)
};


/**
 * Hàm xử lý chính khi có sự kiện phím
 * @param {KeyboardEvent} event Sự kiện Keyboard
 * @param {boolean} status Trạng thái mới của phím (true: nhấn, false: nhả)
 * @returns {boolean} Luôn trả về false sau khi xử lý để ngăn chặn mặc định
 */
keys.handler = function(event, status) {
    const keyName = KEY_MAP[event.keyCode];

    if (keyName) {
        // Cập nhật trạng thái phím
        keys[keyName] = status;
        
        // Ngăn hành động mặc định của trình duyệt (như cuộn trang)
        event.preventDefault();
        return false;
    }
    
    // Nếu là phím không xác định, cho phép trình duyệt xử lý
    return true; 
};


// --- Hàm điều khiển Logic Binding ---

/**
 * Gán các event listener cho cửa sổ (window) để bắt đầu nhận input.
 */
keys.bind = function() {
    // Sửa dụng event listener thuần JavaScript thay vì jQuery
    window.addEventListener('keydown', function(event) {
        keys.handler(event, true);
    });
    window.addEventListener('keyup', function(event) {
        keys.handler(event, false);
    });
};

/**
 * Hủy bỏ các event listener để tạm dừng nhận input.
 */
keys.unbind = function() {
    // Để gỡ bỏ chính xác, ta cần lưu trữ các hàm handler
    // Tuy nhiên, vì code gốc không làm điều đó, ta sẽ dùng hàm ẩn danh
    // Nhưng để đảm bảo gỡ bỏ được (best practice), ta nên dùng `window.removeEventListener` 
    // và thông báo cho dev biết rằng các listener trước đó sẽ không bị gỡ bỏ.
    // Trong trường hợp này, vì ta đã thay thế bằng `window.addEventListener` ở hàm `bind`,
    // việc gọi lại `bind` sẽ tạo ra handler trùng lặp. 
    // Tốt nhất là sử dụng một hàm handler cố định:
    
    // **Lưu ý:** Để hàm `unbind` hoạt động chính xác (gỡ bỏ listener đã gán), 
    // ta cần định nghĩa các hàm `onKeyDown` và `onKeyUp` bên ngoài.
    // Tuy nhiên, để giữ cấu trúc gần với code gốc, ta sẽ chấp nhận 
    // rằng `unbind` sẽ chỉ là một thông báo và gán lại các handler khi gọi `bind`.
    
    // **Tối ưu theo cấu trúc gốc (keys.handler):** // Do `handler` là hàm chung, ta cần định nghĩa các function lắng nghe bên ngoài.
    
    // Định nghĩa lại `bind` và `unbind` theo cách an toàn hơn:
    keys.unbind = function() {
        window.removeEventListener('keydown', keys.keydownHandler);
        window.removeEventListener('keyup', keys.keyupHandler);
    };
    
    keys.bind = function() {
        keys.keydownHandler = function(event) { keys.handler(event, true); };
        keys.keyupHandler = function(event) { keys.handler(event, false); };
        
        window.addEventListener('keydown', keys.keydownHandler);
        window.addEventListener('keyup', keys.keyupHandler);
    };

    // Gọi lại `bind` để đảm bảo sử dụng hàm `bind` mới và an toàn
    keys.bind(); 
    
    // Gỡ bỏ các event listener của jQuery cũ (chỉ để đề phòng)
    $(document).off('keydown');
    $(document).off('keyup');
};

/**
 * Đặt lại tất cả trạng thái phím về false.
 */
keys.reset = function() {
    keys.left = false;
    keys.right = false;
    keys.accelerate = false;
    keys.up = false;
    keys.down = false;
};

// **GỌI LẠI HÀM BIND CỦA BẠN SAU KHI ĐỊNH NGHĨA KEY HANDLER**
// Để tránh vấn đề gỡ bỏ sự kiện (như giải thích trên), 
// tôi khuyên bạn nên cập nhật hàm `bind` và `unbind` như sau (chạy lại đoạn code này một lần):

keys.keydownHandler = function(event) { keys.handler(event, true); };
keys.keyupHandler = function(event) { keys.handler(event, false); };

keys.bind = function() {
    // Gỡ bỏ trước để tránh trùng lặp
    keys.unbind(); 

    window.addEventListener('keydown', keys.keydownHandler);
    window.addEventListener('keyup', keys.keyupHandler);
};

keys.unbind = function() {
    window.removeEventListener('keydown', keys.keydownHandler);
    window.removeEventListener('keyup', keys.keyupHandler);
    // Gỡ bỏ listener của jQuery cũ (chỉ để đề phòng)
    if (window.jQuery) {
        $(document).off('keydown');
        $(document).off('keyup');
    }
};