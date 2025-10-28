/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * MODIFIED FOR "ESCAPE THE SCAM"
 * *****
 */

// === KHAI BÁO BIẾN TOÀN CỤC ===
// Kích thước gốc của game (lấy từ CSS: #game)
const GAME_WIDTH = 640; 
const GAME_HEIGHT = 480;
// Biến toàn cục để chứa đối tượng game chính
var level = null; 

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
            // Vì Mario.hurt() đã xử lý việc thu nhỏ nếu > small
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
            console.log("Game Over! Calling handleGameOver...");
            if(typeof window.handleGameOver === 'function') {
                 window.handleGameOver(); // Gọi hàm xử lý Game Over từ index.html
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
    
    // Tải dữ liệu màn chơi
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
                                // console.warn(`Level ${this.id}, Box ${questionCounter}: Question index ${qIndex} out of bounds! Using 0.`);
                                instance.assignQuestion(0); // Dùng câu 0 nếu hết câu hỏi
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
        // --- SỬA LẠI: KẾT THÚC GAME SAU MÀN 3 (ID=2) ---
        if (nextLevelId >= 3 || nextLevelId >= definedLevels.length) { // Nếu đã hoàn thành màn 2 (hoặc màn cuối)
            this.pause(); keys.reset(); keys.unbind();
            if(this.sounds) this.sounds.stopMusic(); 
            
            // TODO: Thay alert bằng màn hình chiến thắng
            alert("Chúc mừng! Bạn đã hoàn thành 3 màn chơi và vượt qua các cạm bẫy lừa đảo!"); 
            window.location.reload(); 
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
    playSound: function(label) { 
        // if(this.sounds) this.sounds.play(label); // Tạm thời tắt
    },
    playMusic: function(label) { 
        // if(this.sounds) this.sounds.sideMusic(label); // Tạm thời tắt
    },

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
                        // Mario chết xong -> gọi reload (để hồi sinh hoặc game over)
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
        
        // Chạy hoạt ảnh cho Items (hộp ?, xu tĩnh...)
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
 * MATTER CLASS (Vật thể tĩnh) - SỬA LỖI
 * -------------------------------------------
 */
var Matter = Base.extend({
    init: function(x, y, blocking, level) {
        if (!level || !level.world) { // Sửa lỗi: Thêm kiểm tra
             console.error("Matter init: Invalid level or level.world is undefined.");
             return;
        }
        this.blocking = blocking;
        this.view = $(DIV).addClass(CLS_MATTER).appendTo(level.world); // Đây là dòng 682
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
 * (Tất cả kế thừa 'Matter' và tự động đăng ký 'reflection')
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
 * ITEM CLASS (Sửa lỗi: Phải gọi _super() với ĐỦ 4 tham số)
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
        // --- SỬA LỖI: Truyền 4 tham số cho Matter.init ---
        this._super(x, y, isBlocking ? ground_blocking.all : ground_blocking.none, level); 
        this.activated = false;
        this.addToLevel(level);
    },
    addToLevel: function(level) {
        level.items.push(this);
    },
    activate: function(from) {
        // Hàm này sẽ được các lớp con (CoinBox, MushroomBox...) ghi đè
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
 * CHECKPOINT CLASS (MỚI)
 * -------------------------------------------
 */
var Checkpoint = Item.extend({
    init: function(x, y, level) {
        this._super(x, y, false, level); 
        this.setImage(images.objects, 714, 832); // Dùng sprite 'planted_soil_left' (tạm thời)
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
 * QUESTIONBOX CLASS (SỬA LỖI: Sửa lỗi this.bounce)
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
            this.bounce(); // Dòng 892. Giờ sẽ hoạt động vì Item.init đã chạy đúng
            this.clearFrames(); 
            this.setImage(images.objects, 514, 194); 
            this.isUsed = true; 
            this.level.playSound('mushroom'); 

            if (typeof window.showQuiz === 'function') {
                window.showQuiz(this.questionIndex, this); 
            } else {
                console.error("showQuiz function not found!");
            }
        }
        // Không gọi _super() của Item
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
 * CÁC LỚP ITEM CŨ (Coin, Star, Mushroom...)
 * (SỬA LỖI: Đảm bảo truyền đủ 4 tham số cho lớp cha)
 * -------------------------------------------
 */
var Coin = Item.extend({
    init: function(x, y, level) {
        this._super(x, y, false, level); // SỬA LỖI (thêm false, level)
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
 * BULLET CLASS
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
        this.speed = constants.bullet_v;
        this.vx = this.direction === directions.right ? this.speed : -this.speed;
    },
    setVelocity: function(vx, vy) {
        this._super(vx, vy);
        if(this.vx === 0) {
            var s = this.speed; 
            this.vx = this.direction === directions.right ? s : -s;
        }
        if(this.onground)
            this.vy = constants.bounce;
    },
    move: function() {
        if(--this.life > 0) 
            this._super();
        else
            this.die();
    },
    hit: function(opponent) {
        if(!(opponent instanceof Mario) && !(opponent instanceof Bullet)) { 
            if (typeof opponent.die === 'function') opponent.die();
            this.die();
        }
    },
});

/*
 * -------------------------------------------
 * HERO CLASS
 * -------------------------------------------
 */
var Hero = Figure.extend({
    init: function(x, y, level) {
        this._super(x, y, level);
    },
});

/*
 * -------------------------------------------
 * MARIO CLASS (SỬA LẠI LOGIC CHẾT/BỊ THƯƠNG)
 * -------------------------------------------
 */
var Mario = Hero.extend({
    init: function(x, y, level) {
        this.standSprites = [
            [[{ x : 0, y : 81},{ x: 481, y : 83}],[{ x : 81, y : 0},{ x: 561, y : 83}]],
            [[{ x : 0, y : 162},{ x: 481, y : 247}],[{ x : 81, y : 243},{ x: 561, y : 247}]]
        ];
        this.crouchSprites = [
            [{ x : 241, y : 0},{ x: 161, y : 0}],
            [{ x : 241, y : 162},{ x: 241, y : 243}]
        ];
        this.deadly = 0;
        this.invulnerable = 0;
        this.width = 80;
        this._super(x, y, level);
        this.blinking = 0;
        this.setOffset(-24, 0);
        this.setSize(80, 80);
        this.cooldown = 0;
        this.setMarioState(mario_states.normal);
        this.setLifes(constants.start_lives);
        this.setCoins(0);
        this.deathBeginWait = Math.floor(700 / constants.interval);
        this.deathEndWait = 0;
        this.deathFrames = Math.floor(600 / constants.interval);
        this.deathStepUp = Math.ceil(200 / (this.deathFrames || 1)); // Tránh chia cho 0
        this.deathStepDown = 0; // Sẽ được tính trong die()
        this.deathDir = 1;
        this.deathCount = 0;
        this.direction = directions.right;
        this.setImage(images.sprites, 81, 0);
        this.crouching = false;
        this.fast = false;
    },
    setMarioState: function(state) { this.marioState = state; },
    setState: function(state) {
        if(state !== this.state) {
            this.setMarioState(mario_states.normal);
            this._super(state);
        }
    },
    setPosition: function(x, y) {
        this._super(x, y);
        if (!this.level || this.level.width === undefined) return; // Bảo vệ
        var r = this.level.width - 640;
        if (r < 0) r = 0; 
        var w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210));     
        this.level.setParallax(w);
    },
    input: function(keys) {
        this.fast = keys.accelerate;
        this.crouching = keys.down;
        if(!this.crouching || !this.onground) { // Bỏ crouching nếu đang nhảy
             this.crouching = false;
            if(this.onground && keys.up) this.jump();
            if(keys.accelerate && this.marioState === mario_states.fire) this.shoot();
            if(keys.right || keys.left) this.walk(keys.left, keys.accelerate);
            else this.vx = 0;
        }
    },
    victory: function() {
        if (this.level.nextCycles > 0) return; 
        this.level.playMusic('success');
        this.clearFrames();
        this.view.show();
        this.setImage(images.sprites, this.state === size_states.small ? 241 : 161, 81);
        this.level.next(); 
    },
    shoot: function() {
        if(!this.cooldown) {
            this.cooldown = constants.cooldown;
            this.level.playSound('shoot');
            new Bullet(this);
        }
    },
    setVelocity: function(vx, vy) {
        if(this.crouching && this.onground) { // Chỉ ngồi khi đang trên mặt đất
            vx = 0;
            this.crouch();
        } else {
            if(this.onground && vx > 0) this.walkRight();
            else if(this.onground && vx < 0) this.walkLeft();
            else this.stand();
        }
        this._super(vx, vy);
    },
    blink: function(times) {
        this.blinking = Math.max(2 * times * constants.blinkfactor, this.blinking || 0);
    },
    invincible: function() {
        this.level.playMusic('invincibility');
        this.deadly = Math.floor(constants.invincible / constants.interval);
        this.invulnerable = this.deadly;
        this.blink(Math.ceil(this.deadly / (2 * constants.blinkfactor)));
    },
    grow: function() {
        if(this.state === size_states.small) {
            this.level.playSound('grow');
            this.setState(size_states.big);
            this.blink(3);
        }
    },
    shooter: function() {
        if(this.state === size_states.small) this.grow();
        else this.level.playSound('grow');
        this.setMarioState(mario_states.fire);
    },
    walk: function(reverse, fast) {
        this.vx = constants.walking_v * (fast ? 2 : 1) * (reverse ? - 1 : 1);
    },
    walkRight: function() {
        if(this.state === size_states.small) {
            if(!this.setupFrames(8, 2, true, 'WalkRightSmall')) this.setImage(images.sprites, 0, 0);
        } else {
            if(!this.setupFrames(9, 2, true, 'WalkRightBig')) this.setImage(images.sprites, 0, 243);
        }
    },
    walkLeft: function() {
        if(this.state === size_states.small) {
            if(!this.setupFrames(8, 2, false, 'WalkLeftSmall')) this.setImage(images.sprites, 80, 81);
        } else {
            if(!this.setupFrames(9, 2, false, 'WalkLeftBig')) this.setImage(images.sprites, 81, 162);
        }
    },
    stand: function() {
        var coords = this.standSprites[this.state - 1][this.direction === directions.left ? 0 : 1][this.onground ? 0 : 1];
        this.setImage(images.sprites, coords.x, coords.y);
        this.clearFrames();
    },
    crouch: function() {
        var coords = this.crouchSprites[this.state - 1][this.direction === directions.left ? 0 : 1];
        this.setImage(images.sprites, coords.x, coords.y);
        this.clearFrames();
    },
    jump: function() {
        this.level.playSound('jump');
        this.vy = constants.jumping_v;
    },
    move: function() {
        this.input(keys);       
        this._super();
    },
    addCoin: function() { this.setCoins(this.coins + 1); },
    playFrame: function() {     
        if(this.blinking) {
            if(this.blinking % constants.blinkfactor === 0) this.view.toggle();
            this.blinking--;
        } else if (this.view && !this.dead) { 
             this.view.show();
        }
        if(this.cooldown) this.cooldown--;
        if(this.deadly) this.deadly--;
        if(this.invulnerable) this.invulnerable--;
        this._super();
    },
    setCoins: function(coins) {
        this.coins = coins;
        if(this.coins >= constants.max_coins) {
            this.addLife()
            this.coins -= constants.max_coins;
        }
        $('#coinNumber').text(this.coins);
    },
    addLife: function() {
        this.level.playSound('liveupgrade');
        this.setLifes(this.lifes + 1);
    },
    setLifes : function(lifes) {
        this.lifes = lifes;
        $('#liveNumber').text(this.lifes);
    },
    death: function() {
        if(this.deathBeginWait > 0) {
            this.deathBeginWait--;
            return true; 
        }
        if(this.deathEndWait > 0) {
             this.deathEndWait--;
             return (this.deathEndWait > 0); 
        }
        this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
        this.deathCount += this.deathDir;
        
        if(this.deathCount === this.deathFrames)
            this.deathDir = -1; 
        else if(this.deathCount === 0) { 
            this.deathEndWait = Math.floor(1000 / constants.interval); 
            this.view.hide(); 
        }
        return true; 
    },
    die: function() {
        if (this.dead) return; 
        console.log("Mario die() called");
        this.setMarioState(mario_states.normal);
        this.deathStepDown = Math.ceil(240 / (this.deathFrames || 1));
        this.setupFrames(9, 2, false, 'MarioDeath');
        this.setImage(images.sprites, 81, 324);
        this.level.playMusic('die');
        this._super(); // Đặt this.dead = true
    },
    hurt: function(from) {
        if (this.deadly > 0) { 
            if (from && typeof from.die === 'function') { from.die(); }
            return; 
        } 
        if (this.invulnerable > 0) { return; } 

        if (this.state === size_states.small) {
            // TRỪ MẠNG
            this.setLifes(this.lifes - 1); 
            this.die(); // Kích hoạt trạng thái/hoạt ảnh chết
            // Level.tick() sẽ bắt this.dead và gọi Level.reload()
        } else {
            // Bị thu nhỏ
            this.invulnerable = Math.floor(constants.invulnerable / constants.interval);
            this.blink(Math.ceil(this.invulnerable / (2 * constants.blinkfactor)));
            this.setState(size_states.small); 
            this.setMarioState(mario_states.normal); // Mất trạng thái lửa
            this.level.playSound('hurt');               
        }
    },
}, 'mario');

/*
 * -------------------------------------------
 * CÁC LỚP ENEMY (Giữ nguyên)
 * -------------------------------------------
 */
var Enemy = Figure.extend({
    init: function(x, y, level) {
        this._super(x, y, level);
        this.speed = 0;
    },
    hide: function() {
        this.invisible = true;
        this.view.hide();
    },
    show: function() {  
        this.invisible = false;
        this.view.show();
    },
    move: function() {
        if(!this.invisible) {
            this._super();
            if(this.vx === 0) {
                var s = this.speed; // Sửa lỗi: không dùng Math.sign
                this.setVelocity(this.direction === directions.right ? -s : s, this.vy);
            }
        }
    },
    collides: function(is, ie, js, je, blocking) {
        // Kiểm tra xem có bị rơi khỏi rìa không
        if(this.j + 1 < this.level.getGridHeight()) {
            for(var i = is; i <= ie; i++) {
                if(i < 0 || i >= this.level.getGridWidth())
                    return true; // Rơi ra biên
                var obj = this.level.obstacles[i][this.j + 1];
                if(!obj || (obj.blocking & ground_blocking.top) !== ground_blocking.top)
                    return true; // Không có đất -> rơi
            }
        }
        return this._super(is, ie, js, je, blocking);
    },
    setSpeed: function(v) {
        this.speed = v;
        this.setVelocity(-v, 0);
    },
    hurt: function(from) {
        this.die();
    },
    hit: function(opponent) {
        if(this.invisible || this.dead) return; // Thêm kiểm tra dead
            
        if(opponent instanceof Mario) {
            // Mario nhảy lên đầu
            if(opponent.vy < 0 && opponent.y - opponent.vy >= this.y + (this.state * 32) - 16) { // Nới lỏng 16px
                opponent.setVelocity(opponent.vx, constants.bounce);
                this.hurt(opponent);
            } else {
                opponent.hurt(this);
            }
        }
    },
});

var Gumpa = Enemy.extend({
    init: function(x, y, level) {
        this._super(x, y, level);
        this.setSize(34, 32);
        this.setSpeed(constants.ballmonster_v);
        this.death_mode = death_modes.normal;
        this.deathCount = 0;
    },
    setVelocity: function(vx, vy) {
        this._super(vx, vy);
        if(this.direction === directions.left) {
            if(!this.setupFrames(6, 2, false, 'LeftWalk'))
                this.setImage(images.enemies, 34, 188);
        } else {
            if(!this.setupFrames(6, 2, true, 'RightWalk'))
                this.setImage(images.enemies, 0, 228);
        }
    },
    death: function() {
        if(this.death_mode === death_modes.normal)
            return --this.deathCount > 0; // Sửa lại
        
        this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + this.deathStep + 'px' });
        this.deathCount += this.deathDir;
        
        if(this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if(this.deathCount === 0)
            return false;
            
        return true;
    },
    die: function() {
        this.clearFrames();
        if(this.death_mode === death_modes.normal) {
            this.level.playSound('enemy_die');
            this.setImage(images.enemies, 102, 228);
            this.deathCount = Math.ceil(600 / constants.interval);
        } else if(this.death_mode === death_modes.shell) {
            this.level.playSound('shell');
            this.setImage(images.enemies, 68, this.direction === directions.right ? 228 : 188);
            this.deathFrames = Math.floor(250 / constants.interval);
            this.deathDir = 1;
            this.deathStep = Math.ceil(150 / this.deathFrames);
        }
        this._super();
    },
}, 'ballmonster');

var TurtleShell = Enemy.extend({
    init: function(x, y, level) {
        this._super(x, y, level);
        this.setSize(34, 32);
        this.speed = 0;
        this.setImage(images.enemies, 0, 494);
        this.hide(); // Ẩn ban đầu
    },
    activate: function(x, y) {
        this.setupFrames(6, 4, false, 'ShellSpin');
        this.setPosition(x, y);
        this.show();
    },
    takeBack: function(where) {
        if(where.setShell(this))
            this.clearFrames();
    },
    hit: function(opponent) {
        if(this.invisible || this.dead) return;
            
        if(this.vx) { // Nếu đang trượt
            if(this.idle)
                this.idle--;
            else if(opponent instanceof Mario)
                opponent.hurt(this);
            else if (opponent instanceof Enemy) { // Thêm: Chỉ giết Enemy
                opponent.death_mode = death_modes.shell;
                opponent.die();
            }
        } else { // Nếu đang đứng yên
            if(opponent instanceof Mario) {
                this.setSpeed(opponent.direction === directions.right ? constants.shell_v : -constants.shell_v); // Sửa: hướng
                opponent.setVelocity(opponent.vx, constants.bounce);
                this.idle = 2;
            } else if(opponent instanceof GreenTurtle && opponent.state === size_states.small)
                this.takeBack(opponent);
        }
    },
    collides: function(is, ie, js, je, blocking) { 
        // Va chạm với mọi vật cản (khác với Enemy)
        if(is < 0 || ie >= this.level.getGridWidth())
            return true;
        if(js < 0 || je >= this.level.getGridHeight())
            return false;
            
        for(var i = is; i <= ie; i++) {
            for(var j = je; j >= js; j--) {
                var obj = this.level.obstacles[i][j];
                if(obj && ((obj.blocking & blocking) === blocking))
                    return true;
            }
        }
        return false;
    },
    // Ghi đè setSpeed
    setSpeed: function(v) {
         this.speed = v;
         this.setVelocity(v, 0); // Vận tốc là v, không phải -v
    }
}, 'shell');

var GreenTurtle = Enemy.extend({
    init: function(x, y, level) {
        this.walkSprites = [
            [{ x : 34, y : 382 },{ x : 0, y : 437 }],
            [{ x : 34, y : 266 },{ x : 0, y : 325 }]
        ];
        this._super(x, y, level);
        this.wait = 0;
        this.deathMode = death_modes.normal;
        this.deathFrames = Math.floor(250 / constants.interval);
        this.deathStepUp = Math.ceil(150 / this.deathFrames);
        this.deathStepDown = Math.ceil(182 / this.deathFrames);
        this.deathDir = 1;
        this.deathCount = 0;
        this.setSize(34, 54);
        
        // Tạo shell mới và gán vào this.shell
        var shell = new TurtleShell(x, y, level);
        this.setShell(shell);
    },
    setShell: function(shell) {
        if(this.shell || this.wait)
            return false;
            
        this.shell = shell;
        shell.hide();
        this.setState(size_states.big);
        return true;
    },
    setState: function(state) {
        this._super(state);
        
        if(state === size_states.big)
            this.setSpeed(constants.big_turtle_v);
        else
            this.setSpeed(constants.small_turtle_v);
    },
    setVelocity: function(vx, vy) {
        this._super(vx, vy);
        var rewind = this.direction === directions.right;
        var coords = this.walkSprites[this.state - 1][rewind ? 1 : 0];
        var label = Math.sign(vx) + '-' + this.state;
        
        if(!this.setupFrames(6, 2, rewind, label))
            this.setImage(images.enemies, coords.x, coords.y);
    },
    die: function() {
        this._super();
        this.clearFrames();
        
        if(this.deathMode === death_modes.normal) {
            this.deathFrames = Math.floor(600 / constants.interval);
            this.setImage(images.enemies, 102, 437);
        } else if(this.deathMode === death_modes.shell) {
            this.level.playSound('shell');
            this.setImage(images.enemies, 68, (this.state === size_states.small ? (this.direction === directions.right ? 437 : 382) : 325));
        }
    },
    death: function() {
        if(this.deathMode === death_modes.normal)
            return --this.deathFrames > 0;
            
        this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
        this.deathCount += this.deathDir;
        
        if(this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if(this.deathCount === 0)
            return false;
            
        return true;
    },
    move: function() {
        if(this.wait)
            this.wait--;
            
        this._super();
    },
    hurt: function(opponent) {  
        this.level.playSound('enemy_die');
        
        if(this.state === size_states.small)
            return this.die();
        
        this.wait = constants.shell_wait
        this.setState(size_states.small);
        if (this.shell) { // Kiểm tra shell tồn tại
             this.shell.activate(this.x, this.y);
             this.shell = undefined; // Bỏ tham chiếu
        }
    },
}, 'greenturtle');

var SpikedTurtle = Enemy.extend({
    init: function(x, y, level) {
        this._super(x, y, level);
        this.setSize(34, 32);
        this.setSpeed(constants.spiked_turtle_v);
        this.deathFrames = Math.floor(250 / constants.interval);
        this.deathStepUp = Math.ceil(150 / this.deathFrames);
        this.deathStepDown = Math.ceil(182 / this.deathFrames);
        this.deathDir = 1;
        this.deathCount = 0;
    },
    setVelocity: function(vx, vy) {
        this._super(vx, vy);
        
        if(this.direction === directions.left) {
            if(!this.setupFrames(4, 2, true, 'LeftWalk'))
                this.setImage(images.enemies, 0, 106);
        } else {
            if(!this.setupFrames(6, 2, false, 'RightWalk'))
                this.setImage(images.enemies, 34, 147);
        }
    },
    death: function() {
        this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
        this.deathCount += this.deathDir;
        
        if(this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if(this.deathCount === 0)
            return false;
            
        return true;
    },
    die: function() {
        this.level.playSound('shell');
        this.clearFrames();
        this._super();
        this.setImage(images.enemies, 68, this.direction === directions.left ? 106 : 147);
    },
    hit: function(opponent) {
        if(this.invisible || this.dead) return;
            
        if(opponent instanceof Mario) {
            opponent.hurt(this); // Rùa gai luôn làm Mario bị thương
        }
    },
}, 'spikedturtle');

var Plant = Enemy.extend({
    init: function(x, y, level) {
        this._super(x, y, level);
        this.setSize(34, 42);
        this.setupFrames(5, 2, true);
        this.setImage(images.enemies, 0, 3);
    },
    setVelocity: function(vx, vy) {
        this._super(0, 0); // Cây tĩnh không di chuyển ngang
    },
    die: function() {
        this.level.playSound('shell');
        this.clearFrames();
        this._super();
    },
    hit: function(opponent) {
        if(this.invisible || this.dead) return;
            
        if(opponent instanceof Mario) {
            opponent.hurt(this);
        }
    },
});

var StaticPlant = Plant.extend({
    init: function(x, y, level) {
        this._super(x, y, level);
        this.deathFrames = Math.floor(250 / constants.interval);
        this.deathStepUp = Math.ceil(100 / this.deathFrames);
        this.deathStepDown = Math.ceil(132 / this.deathFrames);
        this.deathDir = 1;
        this.deathCount = 0;
    },
    die: function() {
        this._super();
        this.setImage(images.enemies, 68, 3);
    },
    death: function() {
        this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
        this.deathCount += this.deathDir;
        
        if(this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if(this.deathCount === 0)
            return false;
            
        return true;
    },
}, 'staticplant');

var PipePlant = Plant.extend({
    init: function(x, y, level) {
        this.bottom = y - 48;
        this.top = y - 6;
        this._super(x + 16, y - 6, level); // Đặt vị trí ban đầu
        this.setDirection(directions.down);
        this.setImage(images.enemies, 0, 56);
        this.deathFrames = Math.floor(250 / constants.interval);
        this.deathFramesExtended = 6;
        this.deathFramesExtendedActive = false;
        this.deathStep = Math.ceil(100 / this.deathFrames);
        this.deathDir = 1;
        this.deathCount = 0;
        this.view.css('z-index', 95);
    },
    setDirection: function(dir) {
        this.direction = dir;
    },
    setPosition: function(x, y) {
        if(y === this.bottom || y === this.top) {
            this.minimum = constants.pipeplant_count;
            this.setDirection(this.direction === directions.up ? directions.down : directions.up);
        }
        this._super(x, y);
    },
    blocked: function() {
        if(this.y === this.bottom) {
            var state = false;
            // Tạm thời di chuyển lên để kiểm tra va chạm
            this.y += 48; 
            for(var i = this.level.figures.length; i--; ) {
                if(this.level.figures[i] != this && q2q(this.level.figures[i], this)) {
                    state = true;
                    break;
                }
            }
            this.y -= 48; // Trả lại vị trí
            return state;
        }
        return false;
    },
    move: function() {
        if(this.minimum === 0) {
            if(!this.blocked())
                this.setPosition(this.x, this.y - (this.direction - 3) * constants.pipeplant_v);
        } else
            this.minimum--;
    },
    die: function() {       
        this._super();
        this.setImage(images.enemies, 68, 56);
    },
    death: function() {
        if(this.deathFramesExtendedActive) {
            this.setPosition(this.x, this.y - 8);
            return --this.deathFramesExtended > 0;
        }
        
        this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + this.deathStep + 'px' });
        this.deathCount += this.deathDir;
        
        if(this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if(this.deathCount === 0)
            this.deathFramesExtendedActive = true;
            
        return true;
    },
}, 'pipeplant');


/*
 * -------------------------------------------
 * HÀM SCALE GAME
 * -------------------------------------------
 */
function scaleGame() {
    const gameContainer = document.getElementById('game');
    if (!gameContainer) { return; }

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const scaleX = winWidth / GAME_WIDTH;
    const scaleY = winHeight / GAME_HEIGHT;
    const scale = Math.min(scaleX, scaleY); 

    gameContainer.style.transform = `scale(${scale})`;
    
     const marginLeft = (winWidth - (GAME_WIDTH * scale)) / 2;
     const marginTop = (winHeight - (GAME_HEIGHT * scale)) / 2;
    gameContainer.style.marginLeft = `${marginLeft}px`;
    gameContainer.style.marginTop = `${marginTop}px`;
}
// Gắn sự kiện scale
window.addEventListener('load', scaleGame);
window.addEventListener('resize', scaleGame);


/*
 * -------------------------------------------
 * KHỞI TẠO GAME (SẼ ĐƯỢC GỌI TỪ index.html)
 * -------------------------------------------
 */
function initGame() {
     console.log("Initializing Game...");
     if (window.level && window.level.loop) {
          window.level.pause(); 
          console.log("Paused existing game loop.");
     }
     // Tạo đối tượng Level và gán vào biến toàn cục 'level'
     window.level = new Level('world'); 
     if (typeof definedLevels !== 'undefined' && definedLevels.length > 0) {
          level.load(definedLevels[0]); // Tải màn chơi đầu tiên
          level.start(); // Bắt đầu game loop
          keys.bind(); // Kích hoạt input
          console.log("Game initialized and started level 0.");
     } else {
          console.error("definedLevels is not defined or empty! Cannot load level.");
          alert("Lỗi: Không thể tải dữ liệu màn chơi!");
     }
}

