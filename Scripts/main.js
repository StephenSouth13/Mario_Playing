/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * MODIFIED FOR "ESCAPE THE SCAM"
 * *****
 */
//D:\Game\Mario_Playing\Scripts\main.js
// === KHAI BÁO BIẾN TOÀN CỤC ===
const GAME_WIDTH = 640; 
const GAME_HEIGHT = 480;
var level = null; 
// THÔNG SỐ SPRITE CỦA UEH PLAYER 
const PLAYER_WIDTH_SMALL = 32; 
const PLAYER_HEIGHT_SMALL = 23; 
const PLAYER_HEIGHT_BIG = 64;

/*
 * -------------------------------------------
 * BASE CLASS (Lớp cơ sở)
 * -------------------------------------------
 */
var Base = Class.extend({
    init: function(x, y) { // Hàm khởi tạo
        this.setPosition(x || 0, y || 0); // Đặt vị trí ban đầu
        this.clearFrames(); // Xóa cài đặt hoạt ảnh
        this.frameCount = 0; // Bộ đếm frame cho hoạt ảnh
    },
    setPosition: function(x, y) { // Đặt vị trí logic
        this.x = x;
        this.y = y;
    },
    getPosition: function() { // Lấy vị trí logic
        return { x : this.x, y : this.y };
    },
    setImage: function(img, x, y) { // Lưu thông tin ảnh nền và tọa độ cắt ảnh
        this.image = {
            path : img, // Đường dẫn ảnh
            x : x,      // Tọa độ x bắt đầu cắt ảnh
            y : y       // Tọa độ y bắt đầu cắt ảnh
        };
    },
    setSize: function(width, height) { // Đặt kích thước logic
        this.width = width;
        this.height = height;
    },
    getSize: function() { // Lấy kích thước logic
        return { width: this.width, height: this.height };
    },
    // Cài đặt thông số cho hoạt ảnh
    setupFrames: function(fps, frames, rewind, id) { 
        if(id && this.frameID === id) return true; // Tránh cài đặt lại nếu animation đang chạy
        
        this.frameID = id; // ID định danh cho hoạt ảnh đang chạy
        this.currentFrame = 0; // Frame hiện tại
        // Tính số tick game cho mỗi frame hoạt ảnh
        this.frameTick = frames ? (1000 / fps / constants.interval) : 0; 
        this.frames = frames; // Tổng số frame trong hoạt ảnh
        this.rewindFrames = rewind; // Hoạt ảnh có chạy ngược không (vd: đi trái)
        return false;
    },
    // Xóa cài đặt hoạt ảnh
    clearFrames: function() {
        this.frameID = undefined;
        this.frames = 0;
        this.currentFrame = 0;
        this.frameTick = 0;
    },
    // Chạy frame hoạt ảnh tiếp theo
    playFrame: function() {
        if(this.frameTick && this.view) { // Chỉ chạy nếu có cài đặt frame và có đối tượng view
            this.frameCount++;
            
            if(this.frameCount >= this.frameTick) { // Đủ thời gian để chuyển frame      
                this.frameCount = 0;
                if(this.currentFrame === this.frames) this.currentFrame = 0; // Quay lại frame đầu nếu hết
                    
                var $el = this.view;
                // Tính toán và cập nhật background-position để hiển thị frame mới
                 var bgX = -(this.image.x + this.width * (this.rewindFrames ? (this.frames - 1 - this.currentFrame) : this.currentFrame));
                 var bgY = -this.image.y;
                 $el.css('background-position', bgX + 'px ' + bgY + 'px');
                 this.currentFrame++;
            }
        }
    },
});

/*
 * -------------------------------------------
 * GAUGE CLASS (Lớp hiển thị UI)
 * -------------------------------------------
 */
var Gauge = Base.extend({
    init: function(id, startImgX, startImgY, fps, frames, rewind) {
        this._super(0, 0); // Gọi init của Base
        this.view = $('#' + id); // Lấy phần tử HTML bằng ID
        if(!this.view.length) { console.error("Gauge element not found:", id); return; } 
        this.setSize(this.view.width(), this.view.height()); // Lấy kích thước từ CSS

        var bgImage = this.view.css('background-image'); // Lấy ảnh nền từ CSS
        if (bgImage && bgImage !== 'none') {
             // Trích xuất URL ảnh từ CSS
             var imgUrlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/);
             if (imgUrlMatch && imgUrlMatch[1]) {
                 this.setImage(imgUrlMatch[1], startImgX, startImgY); // Lưu thông tin ảnh
             } else {
                 // console.warn("Could not parse background image URL for gauge:", id, bgImage);
             }
        } else {
            // console.warn("No background image set for gauge:", id);
        }
        this.setupFrames(fps, frames, rewind); // Cài đặt hoạt ảnh (nếu có)
    },
});

/*
 * -------------------------------------------
 * LEVEL CLASS (Lớp quản lý màn chơi)
 * -------------------------------------------
 */
var Level = Base.extend({
    init: function(id) {
        this.world = $('#' + id); 
        if (!this.world.length) { console.error("World element not found:", id); return; }
        this.nextCycles = 0; 
        this._super(0, 0);
        this.active = false; 
        this.figures = []; 
        this.obstacles = []; 
        this.decorations = []; 
        this.items = []; 
        
        // --- THÊM CHECKPOINT ---
        this.checkpoints = []; // Mảng chứa các checkpoint
        this.startPosition = { x: 160, y: 160 }; // Vị trí bắt đầu mặc định (sẽ bị ghi đè)
        this.lastCheckpoint = null; // Vị trí checkpoint cuối cùng
        
        // Tạo đối tượng Gauge cho Xu và Mạng
        this.coinGauge = new Gauge('coin', 0, 0, 10, 4, true); 
        this.liveGauge = new Gauge('live', 0, 430, 6, 6, true); 
    },
    
    // Tải lại màn chơi (HỒI SINH)
    reload: function() {
        console.log("Reloading level at checkpoint...");
        this.pause(); // Dừng game loop
        
        var settings = {};
        var mario = this.figures.find(fig => fig instanceof Mario); // Tìm Mario
        
        if (mario) {
            // Lấy số mạng HIỆN TẠI (đã bị trừ 1 trong hàm 'hurt')
            settings.lifes = mario.lifes; 
            settings.coins = mario.coins;
            // Giữ nguyên state (lớn/nhỏ) VÀ state (lửa) khi hồi sinh
            settings.state = mario.state; 
            settings.marioState = mario.marioState; 
        } else {
             // Fallback nếu không tìm thấy Mario
             settings.lifes = constants.start_lives - 1;
             settings.coins = 0;
             settings.state = size_states.small;
             settings.marioState = mario_states.normal;
        }
        
        // --- KIỂM TRA GAME OVER ---
        if(settings.lifes < 0) { 
            console.log("Game Over: Out of lives. Calling handleGameOver...");
            if(typeof window.handleGameOver === 'function') {
                 window.handleGameOver(false); // Gọi hàm xử lý Game Over từ index.html
            } else {
                 alert("Game Over! Hết mạng."); 
                 window.location.reload();
            }
            return; // Dừng tại đây
        }
        
        // --- NẾU CÒN MẠNG: HỒI SINH TẠI CHECKPOINT ---
        
        // Reset lại Mario về trạng thái sống
        mario.dead = false;
        mario.deathBeginWait = 0; 
        mario.deathCount = 0;
        mario.deathDir = 1;
        mario.invulnerable = Math.floor(constants.invulnerable / constants.interval); // Bất tử 1s
        mario.blink(Math.ceil(mario.invulnerable / (2 * constants.blinkfactor))); // Nhấp nháy
        
        // Đặt lại mạng/xu/state
        mario.setLifes(settings.lifes); 
        mario.setCoins(settings.coins); 
        mario.setState(settings.state); 
        mario.setMarioState(settings.marioState);
        mario.setVelocity(0, 0); // Đặt lại vận tốc

        // Tìm vị trí hồi sinh
        var respawnPos = this.lastCheckpoint ? this.lastCheckpoint : this.startPosition;
        console.log("Respawning at:", respawnPos.x, respawnPos.y);
        mario.setPosition(respawnPos.x, respawnPos.y); // Đặt Mario về checkpoint
        
        // Cập nhật lại camera
        mario.setPosition(mario.x, mario.y); 
        
        this.start(); // Bắt đầu lại game loop
    },
    
    // Tải dữ liệu màn chơi (Giữ nguyên logic)
    load: function(levelData) {
        if (!levelData) { console.error("Invalid level data!"); return;}
        console.log("Loading level:", levelData.id);

        if (this.active) { if (this.loop) this.pause(); this.reset(); }

        this.setPosition(0, 0); 
        this.setSize(levelData.width * 32, levelData.height * 32); 
        this.setImage(levelData.background); 
        this.raw = levelData; 
        this.id = levelData.id; 
        this.active = true;
        var data = levelData.data;

        // --- RESET CHECKPOINT ---
        this.lastCheckpoint = null; 
        this.checkpoints = []; 

        // Khởi tạo lưới vật cản obstacles[][]
        this.obstacles = []; 
        for (var i = 0; i < levelData.width; i++) {
            var t = [];
            for (var j = 0; j < levelData.height; j++) { t.push(null); }
            this.obstacles.push(t);
        }

        let questionCounter = 0; 
        if (!data) { console.error("Level data array is missing!"); return; }

        // Duyệt qua dữ liệu màn chơi để tạo đối tượng
        for (var i = 0, width = data.length; i < width; i++) {
            var col = data[i];
            if (!col) { console.warn(`Column ${i} is undefined!`); continue; } 
            for (var j = 0, height = col.length; j < height; j++) {
                var tileId = col[j];
                if (tileId && reflection[tileId]) { 
                    try {
                        // Tạo đối tượng (instance)
                        var instance = new (reflection[tileId])(i * 32, (levelData.height - 1 - j) * 32, this); 

                        // --- LƯU VỊ TRÍ MARIO ---
                        if (instance instanceof Mario) {
                            console.log("Mario start position set:", instance.x, instance.y);
                            this.startPosition = { x: instance.x, y: instance.y };
                        }
                        
                        // --- GÁN CÂU HỎI ---
                        if (instance instanceof QuestionBox) {
                            // Logic: 4 câu hỏi/màn. Màn 0 (0-3), Màn 1 (4-7), Màn 2 (8-11)
                            let qIndex = (this.id * 4) + questionCounter; 
                            if (typeof gameQuestions !== 'undefined' && qIndex >= 0 && qIndex < gameQuestions.length) {
                                instance.assignQuestion(qIndex); 
                                questionCounter++; // Tăng biến đếm
                            } else {
                                // Fallback (chỉ nên xảy ra khi thiếu Questions.js)
                                instance.assignQuestion(0); 
                            }
                        }
                    } catch (e) {
                         console.error(`Error creating instance for tileId '${tileId}' at [${i}, ${j}]:`, e);
                         console.error(e.stack); // In chi tiết lỗi
                    }
                } 
            } 
        } 
        console.log("Level", this.id, "loaded. Questions added:", questionCounter);
    }, 
    
    // Tải màn tiếp theo hoặc kết thúc game
    nextLoad: function() {
        if (this.nextCycles > 0) return; // Vẫn đang chờ

        const nextLevelId = this.id + 1;
        // --- KẾT THÚC GAME SAU MÀN 3 (ID=2) ---
        if (nextLevelId >= 3 || nextLevelId >= definedLevels.length) { 
            this.pause(); keys.reset(); keys.unbind();
            if(this.sounds) this.sounds.stopMusic(); 
            
            // **GỌI HÀM CHIẾN THẮNG TOÀN CỤC (handleGameVictory)**
            if(typeof window.handleGameVictory === 'function') {
                window.handleGameVictory(); 
            } else {
                alert("Chúc mừng! Game đã hoàn thành."); 
                window.location.reload(); 
            }
            return; 
        }
        
        console.log("Loading next level:", nextLevelId);
        var settings = {};
        this.pause();
        var mario = this.figures.find(fig => fig instanceof Mario);
        if (mario) {
            settings.lifes = mario.lifes;
            settings.coins = mario.coins;
            settings.state = mario.state;
            settings.marioState = mario.marioState;
        }
        
        this.reset();
        this.load(definedLevels[nextLevelId]); // Tải màn tiếp theo
        
        mario = this.figures.find(fig => fig instanceof Mario);
        if (mario) {
            mario.setLifes(settings.lifes !== undefined ? settings.lifes : constants.start_lives);
            mario.setCoins(settings.coins || 0);
            mario.setState(settings.state || size_states.small);
            mario.setMarioState(settings.marioState || mario_states.normal);
        }
        this.start();
    },
    
    next: function() {
        console.log("Level complete! Preparing for next level...");
        this.nextCycles = Math.floor(3000 / constants.interval); // Thời gian chờ 3s
    },
    getGridWidth: function() { return this.raw ? this.raw.width : 0; },
    getGridHeight: function() { return this.raw ? this.raw.height : 0; },
    
    setSounds: function(manager) { this.sounds = manager; },
    playSound: function(label) {  }, // Tạm thời tắt
    playMusic: function(label) {  }, // Tạm thời tắt

    reset: function() {
        console.log("Resetting level objects...");
        this.active = false;
        this.world.empty(); 
        this.figures = [];
        this.obstacles = [];
        this.items = [];
        this.decorations = [];
        this.checkpoints = []; // Xóa checkpoint
        this.setPosition(0, 0); 
         if (this.world.parent().length) { 
              this.world.parent().css('background-image', 'none');
         }
    },
    
    // Vòng lặp chính của game
    tick: function() {
        if(this.nextCycles > 0) { // Đang chờ chuyển màn
            this.nextCycles--;
            if (this.nextCycles === 0) this.nextLoad();         
            return;
        }
        
        var i = 0, j = 0, figure, opponent;
        
        for(i = this.figures.length - 1; i >= 0; i-- ) {
            figure = this.figures[i];
            if (!figure) continue; 

            if(figure.dead) { 
                if(!figure.death()) { 
                    if(figure instanceof Mario) {
                        return this.reload(); 
                    } else {
                        if (figure.view) figure.view.remove();
                        this.figures.splice(i, 1); 
                    }
                } else {
                     if (figure.playFrame) figure.playFrame(); 
                }
            } else { 
                 if(i > 0) { 
                     for(j = i - 1; j >= 0; j--) { 
                         if (!this.figures[i]) break; 
                          figure = this.figures[i]; 
                          if(figure.dead) break; 

                         opponent = this.figures[j];
                         if (!opponent) continue; 
                         
                         if(!opponent.dead && Math.abs(figure.x - opponent.x) < 64 && q2q(figure, opponent)) { 
                             figure.hit(opponent);
                              if (!opponent.dead && !figure.dead) { 
                                  opponent.hit(figure);
                              }
                         }
                     }
                 }
            }
            
            if (this.figures[i] && !this.figures[i].dead) { 
                this.figures[i].move();
                this.figures[i].playFrame();
            }
        }
        
        for(i = this.items.length - 1; i >= 0; i-- ) {
            if (this.items[i] && this.items[i].playFrame) { 
                 this.items[i].playFrame();
            }
        }
        
        // --- THÊM: KÍCH HOẠT CHECKPOINT ---
        var mario = this.figures.find(fig => fig instanceof Mario); // Tìm Mario
        if (mario && !mario.dead) {
             for (i = this.checkpoints.length - 1; i >= 0; i--) {
                  var cp = this.checkpoints[i];
                  if (cp && !cp.activated && q2q(mario, cp)) { // Nếu va chạm checkpoint chưa kích hoạt
                       cp.activate(mario);
                  }
             }
        }

        // Chạy hoạt ảnh cho Gauges (UI)
        if (this.coinGauge && this.coinGauge.playFrame) this.coinGauge.playFrame();
        if (this.liveGauge && this.liveGauge.playFrame) this.liveGauge.playFrame();
    },

    start: function() {
        if (this.loop) return; // Không bắt đầu nếu đang chạy
        var me = this;
        console.log("Starting game loop...");
        me.loop = setInterval(function() {
            try { 
                 me.tick.apply(me);
            } catch(e) {
                 console.error("Error in game tick:", e);
                 console.error(e.stack); // In chi tiết lỗi
                 me.pause(); 
            }
        }, constants.interval);
    },
    pause: function() {
        if (this.loop) {
             console.log("Pausing game loop...");
             clearInterval(this.loop);
             this.loop = undefined;
        }
    },
    setPosition: function(x, y) {
        this._super(x, y); 
        if (this.world) { this.world.css('left', -x); }
    },
    setImage: function(index) {
         const img = `${BASEPATH}backgrounds/${index < 10 ? '0' : ''}${index}.png`;
         const parent = this.world ? this.world.parent() : null; 
         if (parent && parent.length) { 
              parent.css({
                   backgroundImage : c2u(img),
                   backgroundPosition : '0 -380px', 
                   backgroundRepeat: 'repeat-x' 
              });
         } else {
              console.warn("Could not set background image, world parent not found.");
         }
    },
    setSize: function(width, height) {
        this._super(width, height);
        if (this.world) { this.world.css({ width: width, height: height }); }
    },
    setParallax: function(x) {
        this.setPosition(x, this.y); 
        const parent = this.world ? this.world.parent() : null;
        if (parent && parent.length) {
             parent.css('background-position', `-${Math.floor(x / 3)}px -380px`);
        }
    },
});

/*
 * -------------------------------------------
 * FIGURE CLASS (Đối tượng di chuyển)
 * -------------------------------------------
 */
var Figure = Base.extend({
    init: function(x, y, level) {
        if (!level || !level.world) { 
             console.error("Figure init: Invalid level or level.world is undefined.");
             return;
        }
        this.view = $(DIV).addClass(CLS_FIGURE).appendTo(level.world);
        this.dx = 0; this.dy = 0;
        this.dead = false; this.onground = true;
        this.setState(size_states.small);
        this.setVelocity(0, 0);
        this.direction = directions.none;
        this.level = level;
        this._super(x, y);
        level.figures.push(this); // Thêm vào mảng figures của level
    },
    setState: function(state) {
        this.state = state;
    },
    setImage: function(img, x, y) {
        if (!this.view) return; 
        this.view.css({
            backgroundImage : img ? c2u(img) : 'none',
            backgroundPosition : '-' + (x || 0) + 'px -' + (y || 0) + 'px',
        });
        this._super(img, x, y);
    },
    setOffset: function(dx, dy) {
        this.dx = dx;
        this.dy = dy;
        this.setPosition(this.x, this.y);
    },
    setPosition: function(x, y) {
        if (!this.view) return; 
        this.view.css({
            left: x,
            bottom: y,
            marginLeft: this.dx,
            marginBottom: this.dy,
        });
        this._super(x, y);
        this.setGridPosition(x, y);
    },
    setSize: function(width, height) {
        if (!this.view) return; 
        this.view.css({
            width: width,
            height: height
        });
        this._super(width, height);
    },
    setGridPosition: function(x, y) {
        this.i = Math.floor((x + 16) / 32); 
        this.j = Math.ceil(this.level.getGridHeight() - 1 - y / 32); 
        
        if(this.y < -64 && !this.dead) { // Rơi ra khỏi map
             this.die();
        }
    },
    getGridPosition: function(x, y) {
        return { i : this.i, j : this.j };
    },
    setVelocity: function(vx, vy) {
        this.vx = vx;
        this.vy = vy;
        
        if(vx > 0)
            this.direction = directions.right;
        else if(vx < 0)
            this.direction = directions.left;
    },
    getVelocity: function() {
        return { vx : this.vx, vy : this.vy };
    },
    hit: function(opponent) {
        // Sẽ được các lớp con (Mario, Enemy) ghi đè
    },
    // Hàm kiểm tra va chạm với vật cản
    collides: function(is, ie, js, je, blocking) {
        var isHero = (this instanceof Mario); 
        
        if(is < 0 || ie >= this.level.getGridWidth()) 
            return true; 
            
        if(js < 0 || je >= this.level.getGridHeight()) 
            return false; 
            
        for(var i = is; i <= ie; i++) {
            for(var j = je; j >= js; j--) {
                var obj = this.level.obstacles[i][j];
                
                if(obj) { 
                    // Nếu là Mario và va chạm với Item (hộp, xu)
                    if(obj instanceof Item && isHero && (blocking === ground_blocking.bottom || obj.blocking === ground_blocking.none))
                        obj.activate(this); // Kích hoạt item
                    
                    if((obj.blocking & blocking) === blocking)
                        return true; // Có va chạm
                }
            }
        }
        
        return false; // Không va chạm
    },
    // Hàm vật lý và di chuyển chính
    move: function() {
        var vx = this.vx;
        var vy = this.vy - constants.gravity; // Áp dụng trọng lực
        
        var s = this.state; // Kích thước (1=nhỏ, 2=lớn)
        var x = this.x;
        var y = this.y;
        
        var dx = Math.sign(vx); // Hướng ngang (1, -1, 0)
        var dy = Math.sign(vy); // Hướng dọc (1, -1, 0)
        
        var is = this.i; 
        var ie = is; 
        var js = Math.ceil(this.level.getGridHeight() - s - (y + 31) / 32); 
        var je = this.j; 
        
        var d = 0, b = ground_blocking.none;
        var onground = false;
        var t = Math.floor((x + 16 + vx) / 32); 
        
        // --- 1. KIỂM TRA VA CHẠM NGANG ---
        if(dx > 0) { 
            d = t - ie; 
            t = ie; 
            b = ground_blocking.left; 
        } else if(dx < 0) { 
            d = is - t; 
            t = is; 
            b = ground_blocking.right; 
        }
        
        x += vx; // Tạm thời di chuyển x
        
        for(var i = 0; i < d; i++) { 
            if(this.collides(t + dx, t + dx, js, je, b)) {
                vx = 0; 
                x = t * 32 + (dx > 0 ? 15 : -16); 
                break;
            }
            t += dx;
            is += dx;
            ie += dx;
        }
        
        // --- 2. KIỂM TRA VA CHẠM DỌC ---
        if(dy > 0) { // Di chuyển lên (nhảy)
            t = Math.ceil(this.level.getGridHeight() - s - (y + 31 + vy) / 32);
            d = js - t;
            t = js;
            b = ground_blocking.bottom; // Húc đầu
        } else if(dy < 0) { // Di chuyển xuống (rơi)
            t = Math.ceil(this.level.getGridHeight() - 1 - (y + vy) / 32);
            d = t - je;
            t = je;
            b = ground_blocking.top; // Đứng trên
        } else
            d = 0;
        
        y += vy; // Tạm thời di chuyển y
        
        for(var i = 0; i < d; i++) { 
            if(this.collides(is, ie, t - dy, t - dy, b)) {
                onground = (dy < 0); 
                vy = 0; 
                y = this.level.getGridHeight() * 32 - (t + 1) * 32 - (dy > 0 ? (s - 1) * 32 : 0); 
                if (onground) y += 1; // Thêm 1 pixel để đảm bảo chạm đất
                break;
            }
            t -= dy;
        }
        
        this.onground = onground;
        this.setVelocity(vx, vy);
        this.setPosition(x, y);
    },
    death: function() { return false; },
    die: function() { this.dead = true; },
});


/*
 * -------------------------------------------
 * MATTER CLASS (Vật thể tĩnh)
 * -------------------------------------------
 */
var Matter = Base.extend({
    init: function(x, y, blocking, level) {
        if (!level || !level.world) { 
             console.error("Matter init: Invalid level or level.world is undefined.");
             return;
        }
        this.blocking = blocking;
        this.view = $(DIV).addClass(CLS_MATTER).appendTo(level.world); 
        this.level = level;
        this._super(x, y);
        this.setSize(32, 32);
        this.addToGrid(level);
    },
    addToGrid: function(level) {
        var i = this.x / 32;
        var j = Math.floor(this.level.getGridHeight() - 1 - this.y / 32); // Sửa: Dùng floor
        if(this.level.obstacles && i >= 0 && i < this.level.obstacles.length && j >= 0 && j < this.level.obstacles[i].length) {
             this.level.obstacles[i][j] = this; // Thêm vào lưới va chạm
        } else {
             // console.warn("Matter created out of bounds:", this, i, j);
        }
    },
    setImage: function(img, x, y) {
        if(!this.view) return;
        this.view.css({
            backgroundImage : img ? c2u(img) : 'none',
            backgroundPosition : '-' + (x || 0) + 'px -' + (y || 0) + 'px',
        });
        this._super(img, x, y);
    },
    setPosition: function(x, y) {
        if(!this.view) return;
        this.view.css({
            left: x,
            bottom: y
        });
        this._super(x, y);
    },
});

/*
 * -------------------------------------------
 * CÁC LỚP GROUND, DECORATION (Giữ nguyên)
 * -------------------------------------------
 */
var Ground = Matter.extend({
    init: function(x, y, blocking, level) { this._super(x, y, blocking, level); },
});
var TopGrass = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.top, level); this.setImage(images.objects, 888, 404); },
}, 'grass_top');
var TopRightGrass = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.top + ground_blocking.right, level); this.setImage(images.objects, 922, 404); },
}, 'grass_top_right');
var TopLeftGrass = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.left + ground_blocking.top, level); this.setImage(images.objects, 854, 404); },
}, 'grass_top_left');
var RightGrass = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.right, level); this.setImage(images.objects, 922, 438); },
}, 'grass_right');
var LeftGrass = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.left, level); this.setImage(images.objects, 854, 438); },
}, 'grass_left');
var TopRightRoundedGrass = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.top, level); this.setImage(images.objects, 922, 506); },
}, 'grass_top_right_rounded');
var TopLeftRoundedGrass = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.top, level); this.setImage(images.objects, 854, 506); },
}, 'grass_top_left_rounded');
var Stone = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.all, level); this.setImage(images.objects, 550, 160); },
}, 'stone');
var BrownBlock = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.all, level); this.setImage(images.objects, 514, 194); },
}, 'brown_block');
var RightTopPipe = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.all, level); this.setImage(images.objects, 36, 358); },
}, 'pipe_top_right');
var LeftTopPipe = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.all, level); this.setImage(images.objects, 2, 358); },
}, 'pipe_top_left');
var RightPipe = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.right + ground_blocking.bottom, level); this.setImage(images.objects, 36, 390); },
}, 'pipe_right');
var LeftPipe = Ground.extend({
    init: function(x, y, level) { this._super(x, y, ground_blocking.left + ground_blocking.bottom, level); this.setImage(images.objects, 2, 390); },
}, 'pipe_left');
var Decoration = Matter.extend({
    init: function(x, y, level) {
        this._super(x, y, ground_blocking.none, level);
        level.decorations.push(this);
    },
    addToGrid: function(level) { /* Không làm gì */ }
});
var TopRightCornerGrass = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 612, 868); },
}, 'grass_top_right_corner');
var TopLeftCornerGrass = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 648, 868); },
}, 'grass_top_left_corner');
var Soil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 888, 438); },
}, 'soil');
var RightSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 922, 540); },
}, 'soil_right');
var LeftSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 854,540); },
}, 'soil_left');
var RightBush = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 382, 928); },
}, 'bush_right');
var RightMiddleBush = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 314, 928); },
}, 'bush_middle_right');
var MiddleBush = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 348, 928); },
}, 'bush_middle');
var LeftMiddleBush = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 212, 928); },
}, 'bush_middle_left');
var LeftBush = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 178, 928); },
}, 'bush_left');
var TopRightGrassSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 990, 506); },
}, 'grass_top_right_rounded_soil');
var TopLeftGrassSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 956, 506); },
}, 'grass_top_left_rounded_soil');
var RightPlantedSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 782, 832); },
}, 'planted_soil_right');
var MiddlePlantedSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 748, 832); },
}, 'planted_soil_middle');
var LeftPlantedSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 714, 832); },
}, 'planted_soil_left');
var RightPipeGrass = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 36, 424); },
}, 'pipe_right_grass');
var LeftPipeGrass = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 2, 424); },
}, 'pipe_left_grass');
var RightPipeSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 36, 458); },
}, 'pipe_right_soil');
var LeftPipeSoil = Decoration.extend({
    init: function(x, y, level) { this._super(x, y, level); this.setImage(images.objects, 2, 458); },
}, 'pipe_left_soil');


/*
 * -------------------------------------------
 * ITEM CLASS (Lớp vật thể có thể kích hoạt)
 * -------------------------------------------
 */
var Item = Matter.extend({
    init: function(x, y, isBlocking, level) {
        this.isBouncing = false;
        this.bounceCount = 0;
        this.bounceFrames = Math.floor(50 / constants.interval);
        this.bounceStep = Math.ceil(10 / this.bounceFrames);
        this.bounceDir = 1;
        this.isBlocking = isBlocking;
        // Truyền 4 tham số cho Matter.init
        this._super(x, y, isBlocking ? ground_blocking.all : ground_blocking.none, level); 
        this.activated = false;
        this.addToLevel(level);
    },
    addToLevel: function(level) {
        level.items.push(this);
    },
    activate: function(from) {
        // Kích hoạt khi Mario va chạm từ dưới lên
        this.activated = true;
    },
    bounce: function() {
        this.isBouncing = true;
        
        for(var i = this.level.figures.length; i--; ) {
            var fig = this.level.figures[i];
            // Kiểm tra nếu có kẻ thù/vật phẩm ĐANG ĐỨNG TRÊN hộp
            if(fig.y === this.y + 32 && fig.x >= this.x - 16 && fig.x <= this.x + 16 && !fig.onground) {
                if(fig instanceof ItemFigure)
                    fig.setVelocity(fig.vx, constants.bounce); // Nảy vật phẩm lên
                else if (fig instanceof Enemy) // Thêm kiểm tra
                    fig.die(); // Giết kẻ thù
            }
        }
    },
    playFrame: function() {
        if(this.isBouncing) {
            this.view.css({ 'bottom' : (this.bounceDir > 0 ? '+' : '-') + '=' + this.bounceStep + 'px' });
            this.bounceCount += this.bounceDir;
            
            if(this.bounceCount === this.bounceFrames)
                this.bounceDir = -1;
            else if(this.bounceCount === 0) {
                this.bounceDir = 1;
                this.isBouncing = false;
            }
        }
        
        this._super(); // Gọi playFrame của Base (cho hoạt ảnh nhấp nháy nếu có)
    },
});

/*
 * -------------------------------------------
 * CHECKPOINT CLASS (Giữ nguyên)
 * -------------------------------------------
 */
var Checkpoint = Item.extend({
    init: function(x, y, level) {
        this._super(x, y, false, level); 
        this.setImage(images.objects, 714, 832); 
        this.view.css('opacity', 0.6); 
        this.blocking = ground_blocking.none; 
        this.activated = false;
        
        // Xóa khỏi mảng items và obstacles, thêm vào mảng checkpoints
        level.items.pop(); 
        var gridX = Math.floor(this.x / 32);
        var gridY = Math.floor(this.level.getGridHeight() - 1 - this.y / 32);
        if (gridX >= 0 && gridX < level.obstacles.length && level.obstacles[gridX][gridY] === this) {
             level.obstacles[gridX][gridY] = null; // Xóa khỏi obstacles
        }
        level.checkpoints.push(this); 
    },
    addToGrid: function() { /* Không thêm vào lưới va chạm */ },
    addToLevel: function() { /* Đã xử lý */ },
    
    activate: function(from) {
        if (!this.activated && from instanceof Mario) {
            console.log('Checkpoint activated at', this.x, this.y);
            this.level.playSound('coin'); // Dùng tạm âm thanh
            this.level.lastCheckpoint = { x: this.x, y: this.y }; // Lưu vị trí
            this.activated = true;
            this.view.css('opacity', 1.0); 
            this.setImage(images.objects, 782, 832); // Đổi sang ảnh 'planted_soil_right' (đã kích hoạt)
        }
    },
    playFrame: function() { /* Không cần hoạt ảnh */ } 
}, 'checkpoint'); 


/*
 * -------------------------------------------
 * QUESTIONBOX CLASS (FIX LỖI NHÂN VẬT ĐỨNG IM)
 * -------------------------------------------
 */
var QuestionBox = Item.extend({
    init: function(x, y, level) {
        this._super(x, y, true, level); // Gọi Item.init với 4 tham số
        this.setImage(images.objects, 96, 33); 
        this.setupFrames(8, 4, false, 'QuestionBoxBlink'); 
        this.questionIndex = -1; 
        this.isUsed = false;      
    },
    assignQuestion: function(index) {
        this.questionIndex = index;
    },
    activate: function(from) {
        if (!this.isUsed && !this.isBouncing && from instanceof Mario) {
            this.bounce(); 
            this.clearFrames(); 
            this.setImage(images.objects, 514, 194); 
            this.isUsed = true; 
            this.level.playSound('mushroom'); 

            // **FIX: DỪNG TẤT CẢ DI CHUYỂN CỦA MARIO**
            from.setVelocity(0, 0); 

            if (typeof window.showQuiz === 'function') {
                window.showQuiz(this.questionIndex, this); 
            } else {
                console.error("showQuiz function not found!");
            }
        }
    },
     playFrame: function() {
          // Gọi playFrame của Item để xử lý bounce
          Item.prototype.playFrame.call(this); 
          // Chỉ chạy hoạt ảnh nhấp nháy nếu chưa dùng
          if (!this.isUsed) {
               Base.prototype.playFrame.call(this); // Gọi playFrame của Base
          }
     }
}, 'questionbox'); 


/*
 * -------------------------------------------
 * CÁC LỚP ITEM KHÁC (Coin, CoinBox, Star...)
 * -------------------------------------------
 */
var Coin = Item.extend({
    init: function(x, y, level) {
        this._super(x, y, false, level); 
        this.setImage(images.objects, 0, 0);
        this.setupFrames(10, 4, true);
    },
    activate: function(from) {
        if(!this.activated) {
            this.level.playSound('coin');
            from.addCoin();
            this.remove();
        }
        this._super(from); // Gọi Item.activate
    },
    remove: function() {
        // Cần xóa khỏi lưới obstacles (vì nó kế thừa từ Item -> Matter)
        var gridX = Math.floor(this.x / 32);
        var gridY = Math.floor(this.level.getGridHeight() - 1 - this.y / 32);
        if (gridX >= 0 && gridX < this.level.obstacles.length && this.level.obstacles[gridX][gridY] === this) {
             this.level.obstacles[gridX][gridY] = null; 
        }
        // Xóa khỏi mảng items
        var itemIndex = this.level.items.indexOf(this);
        if (itemIndex > -1) {
             this.level.items.splice(itemIndex, 1);
        }
        this.view.remove();
    },
}, 'coin');

var CoinBoxCoin = Coin.extend({
    init: function(x, y, level) {
        this._super(x, y, level); // Coin.init đã được sửa
        this.setImage(images.objects, 96, 0);
        this.clearFrames();
        this.view.hide();
        this.count = 0;
        this.frames = Math.floor(150 / constants.interval);
        this.step = Math.ceil(30 / this.frames);
    },
    remove: function() { /* Ghi đè để không tự xóa */ },
    addToGrid: function() { /* Ghi đè để không thêm vào lưới */ },
    addToLevel: function() { /* Ghi đè để không thêm vào mảng items */ },
    activate: function(from) {
        this._super(from);
        this.view.show().css({ 'bottom' : '+=8px' });
    },
    act: function() {
        this.view.css({ 'bottom' : '+=' + this.step + 'px' });
        this.count++;
        return (this.count === this.frames);
    },
});

var CoinBox = Item.extend({
    init: function(x, y, level, amount) { // Thêm amount
        this._super(x, y, true, level); // Gọi Item.init
        this.setImage(images.objects, 346, 328);
        this.setAmount(amount || 1); // Dùng amount hoặc mặc định 1
    },
    setAmount: function(amount) {
        this.items = []; this.actors = [];
        for(var i = 0; i < amount; i++)
            this.items.push(new CoinBoxCoin(this.x, this.y, this.level));
    },
    activate: function(from) {
        if(!this.isBouncing) {
            if(this.items.length) {
                this.bounce();
                var coin = this.items.pop();
                coin.activate(from);
                this.actors.push(coin);
                if(!this.items.length)
                    this.setImage(images.objects, 514, 194); // Đổi ảnh gạch nâu
            }
        }
        // Không gọi _super() của Item
    },
    playFrame: function() {
        for(var i = this.actors.length; i--; ) {
            if(this.actors[i].act()) {
                this.actors[i].view.remove();
                this.actors.splice(i, 1);
            }
        }
        this._super(); // Gọi Item.playFrame (để bounce và nhấp nháy nếu có)
    },
}, 'coinbox');

var MultipleCoinBox = CoinBox.extend({
    init: function(x, y, level) {
        this._super(x, y, level, 8); // Gọi CoinBox.init với 4 tham số
    },
}, 'multiple_coinbox');

var ItemFigure = Figure.extend({
    init: function(x, y, level) { this._super(x, y, level); },
});

var StarBox = Item.extend({
    init: function(x, y, level) {
        this._super(x, y, true, level);
        this.setImage(images.objects, 96, 33);
        this.star = new Star(x, y, level);
        this.setupFrames(8, 4, false, 'StarBoxBlink');
    },
    activate: function(from) {
        if(!this.activated) {
            this.star.release();
            this.clearFrames();
            this.bounce();
            this.setImage(images.objects, 514, 194);
        }
        this._super(from); // Gọi Item.activate
    },
}, 'starbox');

var Star = ItemFigure.extend({
    init: function(x, y, level) {
        this._super(x, y + 32, level);
        this.active = false; this.setSize(32, 32);
        this.setImage(images.objects, 32, 69);
        this.view.hide();
    },
    release: function() {
        this.taken = 4; this.active = true;
        this.level.playSound('mushroom');
        this.view.show();
        this.setVelocity(constants.star_vx, constants.star_vy);
        this.setupFrames(10, 2, false, 'StarBlink');
    },
    collides: function(is, ie, js, je, blocking) { return false; },
    move: function() {
        if(this.active) {
            this.vy += this.vy <= -constants.star_vy ? constants.gravity : constants.gravity / 2;
            Figure.prototype.move.call(this); // Gọi move của Figure
        }
        if(this.taken > 0) this.taken--;
    },
    hit: function(opponent) {
        if(this.taken === 0 && this.active && opponent instanceof Mario) {
            opponent.invincible();
            this.die();
        }
    },
});

var MushroomBox = Item.extend({
    init: function(x, y, level) {
        this._super(x, y, true, level);
        this.setImage(images.objects, 96, 33);
        this.max_mode = mushroom_mode.plant;
        this.mushroom = new Mushroom(x, y, level);
        this.setupFrames(8, 4, false, 'MushroomBoxBlink');
    },
    activate: function(from) {
        if(!this.activated) {
            if(from.state === size_states.small || this.max_mode === mushroom_mode.mushroom)
                this.mushroom.release(mushroom_mode.mushroom);
            else
                this.mushroom.release(mushroom_mode.plant);
            this.clearFrames();
            this.bounce();
            this.setImage(images.objects, 514, 194);
        }
        this._super(from);
    },
}, 'mushroombox');

var Mushroom = ItemFigure.extend({
    init: function(x, y, level) {
        this._super(x, y, level);
        this.active = false; this.setSize(32, 32);
        this.setImage(images.objects, 582, 60);
        this.released = 0;
        this.view.css('z-index', 94).hide();
    },
    release: function(mode) {
        this.released = 4;
        this.level.playSound('mushroom');
        if(mode === mushroom_mode.plant)
            this.setImage(images.objects, 548, 60);
        this.mode = mode;
        this.view.show();
    },
    move: function() {
        if(this.active) {
            this._super(); // Gọi Figure.move()
            if(this.mode === mushroom_mode.mushroom && this.vx === 0)
                this.setVelocity(this.direction === directions.right ? -constants.mushroom_v : constants.mushroom_v, this.vy);
        } else if(this.released > 0) {
            this.released--;
            this.setPosition(this.x, this.y + 8);
            if(this.released === 0) {
                this.active = true;
                this.view.css('z-index', 99);
                if(this.mode === mushroom_mode.mushroom)
                    this.setVelocity(constants.mushroom_v, constants.gravity);
            }
        }
    },
    hit: function(opponent) {
        if(this.active && opponent instanceof Mario) {
            if(this.mode === mushroom_mode.mushroom) opponent.grow();
            else if(this.mode === mushroom_mode.plant) opponent.shooter();
            this.die();
        }
    },
});

/*
 * -------------------------------------------
 * BULLET CLASS (Giữ nguyên)
 * -------------------------------------------
 */
var Bullet = Figure.extend({
    init: function(parent) {
        this._super(parent.x + 31, parent.y + 14, parent.level);
        this.parent = parent;
        this.setImage(images.sprites, 191, 366);
        this.setSize(16, 16);
        this.direction = parent.direction;
        this.vy = 0;
        this.life = Math.ceil(2000 / constants.interval);