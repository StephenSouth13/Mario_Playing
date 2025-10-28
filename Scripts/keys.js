/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */

var keys = {
    // Gắn các hàm lắng nghe sự kiện
    bind : function() {
        // 'keydown' - khi phím được nhấn xuống
        $(document).on('keydown', function(event) { 
            return keys.handler(event, true); // true = đang nhấn
        });
        // 'keyup' - khi phím được nhả ra
        $(document).on('keyup', function(event) {   
            return keys.handler(event, false); // false = đã nhả
        });
    },
    // Đặt lại tất cả trạng thái phím về 'false' (thường dùng khi tạm dừng game, chết...)
    reset : function() {
        keys.left = false;
        keys.right = false;
        keys.accelerate = false;
        keys.up = false;
        keys.down = false;
    },
    // Gỡ bỏ các hàm lắng nghe sự kiện
    unbind : function() {
        $(document).off('keydown');
        $(document).off('keyup');
    },
    // Hàm xử lý chính khi có sự kiện phím
    handler : function(event, status) {
        // Dùng switch case để kiểm tra mã phím (keyCode)
        switch(event.keyCode) {
            case 57392://CTRL on MAC
            case 17://CTRL
            case 65://A (Dùng để chạy nhanh hoặc bắn)
                keys.accelerate = status;
                break;
            case 40://Mũi tên xuống (Ngồi)
                keys.down = status;
                break;
            case 39://Mũi tên phải (Đi phải)
                keys.right = status;
                break;
            case 37://Mũi tên trái (Đi trái)
                keys.left = status;         
                break;
            case 38://Mũi tên lên (Nhảy)
                keys.up = status;
                break;
            default:
                return true; // Nếu là phím khác (F5, F12...), cho phép trình duyệt xử lý
        }
            
        // Ngăn hành động mặc định của trình duyệt (như cuộn trang khi nhấn mũi tên)
        event.preventDefault();
        return false;
    },
    // Các biến trạng thái, được đọc bởi main.js trong mỗi tick
    accelerate : false,
    left : false,
    up : false,
    right : false,
    down : false,
};

