/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * MODIFIED FOR "ESCAPE THE SCAM" - UEH
 * *****
 */
 
// --- SỬA ĐƯỜNG DẪN CƠ BẢN ---
const AUDIOPATH = 'Content/audio/'; 
const BASEPATH  = 'Content/'; 
const DIV       = '<div />';
const CLS_FIGURE = 'figure';
const CLS_MATTER = 'matter';

// --- Hằng số (Enums) ---
const directions = {
    none    : 0,
    left    : 1,
    up      : 2,
    right   : 3,
    down    : 4,
};
const mario_states = {
    normal : 0,
    fire   : 1,
};
const size_states = {
    small : 1,
    big   : 2,
};
const ground_blocking = {
    none    : 0,
    left    : 1,
    top     : 2,
    right   : 4,
    bottom  : 8,
    all     : 15,
};
const collision_type = {
    none        : 0,
    horizontal  : 1,
    vertical    : 2,
};
const death_modes = {
    normal : 0,
    shell  : 1,
};
const mushroom_mode = {
    mushroom : 0,
    plant    : 1,
};

// --- SỬA ĐƯỜNG DẪN ẢNH (QUAN TRỌNG) ---
const images = {
    enemies : BASEPATH + 'mario-enemies.png',
    sprites : BASEPATH + 'mario-sprites.png',
    objects : BASEPATH + 'mario-objects.png',
    peach   : BASEPATH + 'mario-peach.png',
};

// --- Hằng số vật lý & gameplay ---
const constants = {
    // Game Engine Core
    interval        : 20,     // 1000ms / 20ms = 50 FPS
    start_lives     : 3,      // Mạng bắt đầu
    max_coins       : 100,    // Giới hạn xu trước khi nhận thêm mạng
    
    // Timer & Penalty (MỚI)
    GAME_TIME_LIMIT : 600,    // 600 giây = 10 phút (Thời gian ban đầu)
    PENALTY_TIME    : 120,    // 120 giây = 2 phút (Phạt khi trả lời sai)

    // Vật lý chung
    gravity         : 2,
    bounce          : 15,
    
    // Tốc độ di chuyển
    jumping_v       : 27,
    walking_v       : 5,
    shell_v         : 10,
    bullet_v        : 12,

    // Tốc độ kẻ thù
    mushroom_v      : 3,
    ballmonster_v   : 2,
    spiked_turtle_v : 1.5,
    small_turtle_v  : 3,
    big_turtle_v    : 2,
    
    // Thông số hoạt ảnh
    cooldown        : 20,
    pipeplant_count : 150,
    pipeplant_v     : 1,
    star_vx         : 4,
    star_vy         : 16,
    shell_wait      : 25,
    
    // Trạng thái Mario
    invincible      : 11000,  // 11 giây (Bất khả chiến bại từ Star)
    invulnerable    : 1000,   // 1 giây (Bất tử sau khi bị thu nhỏ/hồi sinh)
    blinkfactor     : 5,
};

// --- Tên file ÂM THANH (Cần được load bằng thư viện SoundManager) ---
// (Bạn có thể bỏ qua phần này nếu đang dùng thư viện âm thanh khác)
const sounds = {
    // Sẽ được thêm vào file SoundManager.js nếu có
    jump            : AUDIOPATH + 'jump.wav',
    grow            : AUDIOPATH + 'grow.wav',
    coin            : AUDIOPATH + 'coin.wav',
    shoot           : AUDIOPATH + 'fireball.wav',
    hurt            : AUDIOPATH + 'pipe.wav',
    die             : AUDIOPATH + 'die.mp3',
    shell           : AUDIOPATH + 'kick.wav',
    enemy_die       : AUDIOPATH + 'stomp.wav',
    liveupgrade     : AUDIOPATH + '1-up.wav',
    // ... thêm các âm thanh khác nếu cần
};

// --- Hàm tiện ích (Giữ nguyên) ---

// Chuyển chuỗi thành định dạng url() cho CSS
var c2u = function(s) {
    return 'url("' + s + '")';
};

// Hàm kiểm tra va chạm (AABB - Axis-Aligned Bounding Box)
var q2q = function(figure, opponent) {
    if (!figure || !opponent) return false;

    var state_height_fig = (figure.state === size_states.big) ? 64 : 32;
    var state_height_opp = (opponent.state === size_states.big) ? 64 : 32;

    var state_width_fig = 32;
    var state_width_opp = 32;

    if (figure.x < opponent.x + state_width_opp &&
        figure.x + state_width_fig > opponent.x &&
        figure.y < opponent.y + state_height_opp &&
        figure.y + state_height_fig > opponent.y) {
        return true; 
    }
    return false; 
};

// Polyfill cho Math.sign 
if (!Math.sign) {
    Math.sign = function(x) {
        x = +x; 
        if (x === 0 || isNaN(x)) {
            return Number(x);
        }
        return x > 0 ? 1 : -1;
    };
}