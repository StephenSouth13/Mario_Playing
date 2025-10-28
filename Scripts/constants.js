/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */
 
// --- SỬA ĐƯỜNG DẪN ---
// Đảm bảo các file âm thanh của bạn nằm trong "Content/audio/"
const AUDIOPATH = 'Content/audio/'; 
// Đảm bảo các file ảnh của bạn nằm trong "Content/"
const BASEPATH  = 'Content/'; 
const DIV       = '<div />';
const CLS_FIGURE = 'figure';
const CLS_MATTER = 'matter';

// --- Hằng số (Enums) ---
const directions = {
    none  : 0,
    left  : 1,
    up    : 2,
    right : 3,
    down  : 4,
};
const mario_states = {
    normal : 0,
    fire  : 1,
};
const size_states = {
    small : 1,
    big   : 2,
};
const ground_blocking = {
    none   : 0,
    left   : 1,
    top    : 2,
    right  : 4,
    bottom : 8,
    all    : 15,
};
const collision_type = {
    none       : 0,
    horizontal : 1,
    vertical   : 2,
};
const death_modes = {
    normal : 0,
    shell  : 1,
};

// --- SỬA ĐƯỜNG DẪN ẢNH (QUAN TRỌNG) ---
// Các file ảnh này phải nằm trong thư mục 'Content/'
const images = {
    enemies : BASEPATH + 'mario-enemies.png',
    sprites : BASEPATH + 'mario-sprites.png',
    objects : BASEPATH + 'mario-objects.png',
    peach   : BASEPATH + 'mario-peach.png',
};

// --- Hằng số vật lý & gameplay ---
const constants = {
    interval        : 20,    // 1000ms / 20ms = 50 FPS
    bounce          : 15,
    cooldown        : 20,
    gravity         : 2,
    start_lives     : 3,
    max_width       : 400,
    max_height      : 15,
    jumping_v       : 27,
    walking_v       : 5,
    mushroom_v      : 3,
    ballmonster_v   : 2,
    spiked_turtle_v : 1.5,
    small_turtle_v  : 3,
    big_turtle_v    : 2,
    shell_v         : 10,
    shell_wait      : 25,
    star_vx         : 4,
    star_vy         : 16,
    bullet_v        : 12,
    max_coins       : 100,
    pipeplant_count : 150,
    pipeplant_v     : 1,
    invincible      : 11000, // 11 giây
    invulnerable    : 1000,  // 1 giây
    blinkfactor     : 5,
};
const mushroom_mode = {
    mushroom : 0,
    plant    : 1,
};

// --- Hàm tiện ích ---

// Chuyển chuỗi thành định dạng url() cho CSS
var c2u = function(s) {
    // Thêm dấu ngoặc kép quanh URL để xử lý các ký tự đặc biệt
    return 'url("' + s + '")';
};

// Hàm kiểm tra va chạm (AABB - Axis-Aligned Bounding Box)
var q2q = function(figure, opponent) {
    if (!figure || !opponent) return false;

    // Lấy kích thước thực tế (chiều cao) dựa trên state (lớn/nhỏ)
    var state_height_fig = (figure.state === size_states.big) ? 64 : 32;
    var state_height_opp = (opponent.state === size_states.big) ? 64 : 32;

    // Lấy chiều rộng (giả sử 32px)
    var state_width_fig = 32;
    var state_width_opp = 32;

    // Kiểm tra va chạm AABB
    if (figure.x < opponent.x + state_width_opp &&
        figure.x + state_width_fig > opponent.x &&
        figure.y < opponent.y + state_height_opp &&
        figure.y + state_height_fig > opponent.y) {
        return true; // Đã va chạm
    }
    return false; // Không va chạm
};

// Polyfill cho Math.sign (trả về 1, -1, hoặc 0)
// Cần thiết vì code Mario cũ có thể đã tự định nghĩa nó
if (!Math.sign) {
    Math.sign = function(x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return Number(x);
        }
        return x > 0 ? 1 : -1;
    };
}

