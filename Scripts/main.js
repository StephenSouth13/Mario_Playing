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
                 console.warn("Could not parse background image URL for gauge:", id, bgImage);
             }
        } else {
            console.warn("No background image set for gauge:", id);
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
            settings.lifes = mario.lifes; // Lấy số mạng HIỆN TẠI (đã bị trừ 1 trong hàm 'hurt')
            settings.coins = mario.coins;
            settings.state = mario.state; // Giữ nguyên state (lớn/nhỏ)
            settings.marioState = mario.marioState; // Giữ nguyên state (lửa)
        } else {
             settings.lifes = constants.start_lives - 1;
             settings.coins = 0;
             settings.state = size_states.small;
             settings.marioState = mario_states.normal;
        }
        
        // --- KIỂM TRA GAME OVER ---
        if(settings.lifes < 0) {
            console.log("Game Over! Reloading page.");
            if(typeof window.handleGameOver === 'function') {
                 window.handleGameOver(); // Gọi hàm xử lý Game Over từ index.html
            } else {
                 alert("Game Over! Hết mạng."); 
                 window.location.reload();
            }
            return; // Dừng tại đây
        }
        
        // --- NẾU CÒN MẠNG: HỒI SINH TẠI CHECKPOINT ---
        if (mario) {
            mario.dead = false;
            mario.deathBeginWait = 0; 
            mario.deathCount = 0;
            mario.deathDir = 1;
            mario.invulnerable = Math.floor(constants.invulnerable / constants.interval); // Bất tử 1s
            mario.blink(Math.ceil(mario.invulnerable / (2 * constants.blinkfactor))); // Nhấp nháy
            
            // Đặt lại mạng/xu/state
            mario.setLifes(settings.lifes); 
            mario.setCoins(settings.coins); 
            // Nếu bị thương, Mario tự động bị thu nhỏ (đã xử lý trong 'hurt'), nên giữ nguyên state
            mario.setState(mario.state); 
            mario.setMarioState(mario.marioState);
            mario.setVelocity(0, 0); // Đặt lại vận tốc

            // Tìm vị trí hồi sinh
            var respawnPos = this.lastCheckpoint ? this.lastCheckpoint : this.startPosition;
            console.log("Respawning at:", respawnPos.x, respawnPos.y);
            mario.setPosition(respawnPos.x, respawnPos.y); // Đặt Mario về checkpoint
            
            // Cập nhật lại camera
            mario.setPosition(mario.x, mario.y); 
            
        } else {
             // Lỗi nghiêm trọng: Không tìm thấy Mario -> Tải lại từ đầu
             console.error("Mario not found! Hard reloading level.");
             this.reset();
             this.load(this.raw ? this.raw : definedLevels[0]); 
             var newMario = this.figures.find(fig => fig instanceof Mario);
             if (newMario) {
                 newMario.setLifes(settings.lifes);
                 newMario.setCoins(settings.coins);
             }
        }
        
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
                                console.warn(`Level ${this.id}, Box ${questionCounter}: Question index ${qIndex} out of bounds! Using 0.`);
                                instance.assignQuestion(0); 
                            }
                        }
                    } catch (e) {
                         console.error(`Error creating instance for tileId '${tileId}' at [${i}, ${j}]:`, e);
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
            
            // Tạm dùng alert, bạn có thể thay bằng màn hình chiến thắng
            alert("Chúc mừng! Bạn đã hoàn thành game và vượt qua các cạm bẫy lừa đảo!"); 
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
    
    // ... (Giữ nguyên các hàm: next, getGridWidth, getGridHeight, setSounds, playSound, playMusic) ...
    next: function() {
        console.log("Level complete! Preparing for next level...");
        this.nextCycles = Math.floor(3000 / constants.interval); // Thời gian chờ 3s
    },
    getGridWidth: function() { return this.raw ? this.raw.width : 0; },
    getGridHeight: function() { return this.raw ? this.raw.height : 0; },
    setSounds: function(manager) { this.sounds = manager; },
    playSound: function(label) { 
        // Tạm thời vô hiệu hóa âm thanh để tránh lỗi 404
        // if(this.sounds) this.sounds.play(label); 
    },
    playMusic: function(label) { 
        // Tạm thời vô hiệu hóa âm thanh
        // if(this.sounds) this.sounds.sideMusic(label); 
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
         const img = `Content/backgrounds/${index < 10 ? '0' : ''}${index}.png`;
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
        this.view = $(DIV).addClass(CLS_FIGURE).appendTo(level.world);
        this.dx = 0;
        this.dy = 0;
        this.dead = false;
        this.onground = true;
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
        this.view.css({
            width: width,
            height: height
        });
        this._super(width, height);
    },
    // Đặt vị trí lưới (để kiểm tra va chạm)
    setGridPosition: function(x, y) {
        this.i = Math.floor((x + 16) / 32); // Vị trí cột (i)
        this.j = Math.ceil(this.level.getGridHeight() - 1 - y / 32); // Vị trí hàng (j)
        
        if(this.y < -64 && !this.dead) { // Rơi ra khỏi map
             console.log("Figure fell off map");
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
        var isHero = (this instanceof Mario); // Kiểm tra có phải Mario không
        
        if(is < 0 || ie >= this.level.obstacles.length) // Ra khỏi biên trái/phải
            return true; // Coi như va chạm
            
        if(js < 0 || je >= this.level.getGridHeight()) // Ra khỏi biên trên/dưới
            return false; // Không va chạm (để rơi xuống)
            
        for(var i = is; i <= ie; i++) {
            for(var j = je; j >= js; j--) {
                var obj = this.level.obstacles[i][j];
                
                if(obj) { // Nếu có vật cản tại ô [i, j]
                    // Nếu là Mario và va chạm với Item (hộp, xu)
                    if(obj instanceof Item && isHero && (blocking === ground_blocking.bottom || obj.blocking === ground_blocking.none))
                        obj.activate(this); // Kích hoạt item
                    
                    // Nếu loại va chạm của vật cản khớp với hướng đang kiểm tra
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
        
        // Tính toán các ô lưới (grid) mà đối tượng chiếm
        var is = this.i; // Cột bắt đầu
        var ie = is; // Cột kết thúc (mặc định = cột bắt đầu)
        // Hàng bắt đầu (tính từ trên xuống)
        var js = Math.ceil(this.level.getGridHeight() - s - (y + 31) / 32); 
        var je = this.j; // Hàng kết thúc (vị trí chân)
        
        var d = 0, b = ground_blocking.none;
        var onground = false;
        var t = Math.floor((x + 16 + vx) / 32); // Cột (i) dự đoán sau khi di chuyển ngang
        
        // --- 1. KIỂM TRA VA CHẠM NGANG ---
        if(dx > 0) { // Di chuyển sang phải
            d = t - ie; // Số cột cần kiểm tra
            t = ie; // Bắt đầu kiểm tra từ cột hiện tại
            b = ground_blocking.left; // Kiểm tra va chạm với bên trái của ô
        } else if(dx < 0) { // Di chuyển sang trái
            d = is - t; // Số cột cần kiểm tra
            t = is; // Bắt đầu kiểm tra từ cột hiện tại
            b = ground_blocking.right; // Kiểm tra va chạm với bên phải của ô
        }
        
        x += vx; // Tạm thời di chuyển x
        
        for(var i = 0; i < d; i++) { // Kiểm tra từng cột trên đường đi
            if(this.collides(t + dx, t + dx, js, je, b)) {
                vx = 0; // Dừng lại
                x = t * 32 + (dx > 0 ? 15 : -16); // Đặt vị trí ngay sát vật cản
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
            b = ground_blocking.bottom; // Kiểm tra va chạm với đáy của ô (húc đầu)
        } else if(dy < 0) { // Di chuyển xuống (rơi)
            t = Math.ceil(this.level.getGridHeight() - 1 - (y + vy) / 32);
            d = t - je;
            t = je;
            b = ground_blocking.top; // Kiểm tra va chạm với đỉnh của ô (đứng trên)
        } else
            d = 0;
        
        y += vy; // Tạm thời di chuyển y
        
        for(var i = 0; i < d; i++) { // Kiểm tra từng hàng trên đường đi
            if(this.collides(is, ie, t - dy, t - dy, b)) {
                onground = (dy < 0); // Đang đứng trên mặt đất nếu rơi xuống và va chạm
                vy = 0; // Dừng rơi/nhảy
                y = this.level.getGridHeight() * 32 - (t + 1) * 32 - (dy > 0 ? (s - 1) * 32 : 0); // Đặt vị trí ngay sát vật cản
                if (onground) y += 1; // Thêm 1 pixel để đảm bảo chạm đất
                break;
            }
            t -= dy;
        }
        
        this.onground = onground;
        this.setVelocity(vx, vy);
        this.setPosition(x, y);
    },
    death: function() {
        // Hoạt ảnh chết (sẽ được ghi đè)
        return false; // Trả về false để báo hiệu hoạt ảnh đã xong
    },
    die: function() {
        this.dead = true;
    },
});

/*
 * -------------------------------------------
 * MATTER CLASS (Vật thể tĩnh)
 * -------------------------------------------
 */
var Matter = Base.extend({
    init: function(x, y, blocking, level) {
        this.blocking = blocking;
        this.view = $(DIV).addClass(CLS_MATTER).appendTo(level.world);
        this.level = level;
        this._super(x, y);
        this.setSize(32, 32);
        this.addToGrid(level);
    },
    addToGrid: function(level) {
        var i = this.x / 32;
        var j = this.level.getGridHeight() - 1 - this.y / 32;
        if(i >= 0 && i < level.obstacles.length && j >= 0 && j < level.obstacles[i].length) {
             level.obstacles[i][j] = this; // Thêm vào lưới va chạm
        } else {
             console.warn("Matter created out of bounds:", this, i, j);
        }
    },
    setImage: function(img, x, y) {
        this.view.css({
            backgroundImage : img ? c2u(img) : 'none',
            backgroundPosition : '-' + (x || 0) + 'px -' + (y || 0) + 'px',
        });
        this._super(img, x, y);
    },
    setPosition: function(x, y) {
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
 * (Các lớp này kế thừa 'Matter' và chỉ định ảnh, loại va chạm)
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
    // Ghi đè để không thêm vào lưới va chạm
    addToGrid: function(level) { /* Do nothing */ }
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
 * CÁC LỚP ITEM (Giữ nguyên)
 * -------------------------------------------
 */
var Item = Matter.extend({ /* ... (Giữ nguyên code Item) ... */ });

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
        var gridX = this.x / 32;
        var gridY = this.level.getGridHeight() - 1 - this.y / 32;
        if (level.obstacles[gridX] && level.obstacles[gridX][gridY] === this) {
             level.obstacles[gridX][gridY] = null; // Xóa khỏi obstacles
        }
        level.checkpoints.push(this); 
    },
    addToGrid: function() { /* Không thêm vào lưới va chạm */ },
    addToLevel: function() { /* Đã xử lý trong init */ },
    
    activate: function(from) {
        if (!this.activated && from instanceof Mario) {
            console.log('Checkpoint activated at', this.x, this.y);
            this.level.playSound('coin'); // Dùng tạm âm thanh
            this.level.lastCheckpoint = { x: this.x, y: this.y }; // Lưu vị trí
            this.activated = true;
            this.view.css('opacity', 1.0); // Hiện rõ
            this.setImage(images.objects, 782, 832); // Đổi sang ảnh 'planted_soil_right' (đã kích hoạt)
        }
    },
    playFrame: function() { /* Không cần hoạt ảnh */ } 
}, 'checkpoint'); 


/*
 * -------------------------------------------
 * QUESTIONBOX CLASS (MỚI)
 * -------------------------------------------
 */
var QuestionBox = Item.extend({
    init: function(x, y, level) {
        this._super(x, y, true, level); 
        this.setImage(images.objects, 96, 33); // Ảnh hộp ? nhấp nháy
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
            this.setImage(images.objects, 514, 194); // Ảnh hộp đã dùng
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
          Item.prototype.playFrame.call(this); // Gọi playFrame của Item (xử lý bounce)
          if (!this.isUsed) {
               Base.prototype.playFrame.call(this); // Gọi playFrame của Base (xử lý nhấp nháy)
          }
     }
}, 'questionbox'); 


/*
 * -------------------------------------------
 * CÁC LỚP ITEM CŨ (Coin, Star, Mushroom...)
 * -------------------------------------------
 */
var Coin = Item.extend({ /* ... (Giữ nguyên code Coin) ... */ }, 'coin');
var CoinBoxCoin = Coin.extend({ /* ... (Giữ nguyên code CoinBoxCoin) ... */ });
var CoinBox = Item.extend({ /* ... (Giữ nguyên code CoinBox) ... */ }, 'coinbox');
var MultipleCoinBox = CoinBox.extend({ /* ... (GiÃữ nguyên code MultipleCoinBox) ... */ }, 'multiple_coinbox');
var ItemFigure = Figure.extend({ /* ... (Giữ nguyên code ItemFigure) ... */ });
var StarBox = Item.extend({ /* ... (Giữ nguyên code StarBox) ... */ }, 'starbox');
var Star = ItemFigure.extend({ /* ... (Giữ nguyên code Star) ... */ });
var MushroomBox = Item.extend({ /* ... (Giữ nguyên code MushroomBox) ... */ }, 'mushroombox');
var Mushroom = ItemFigure.extend({ /* ... (Giữ nguyên code Mushroom) ... */ });

/*
 * -------------------------------------------
 * BULLET CLASS
 * -------------------------------------------
 */
var Bullet = Figure.extend({ /* ... (Giữ nguyên code Bullet) ... */ });

/*
 * -------------------------------------------
 * HERO CLASS
 * -------------------------------------------
 */
var Hero = Figure.extend({ /* ... (Giữ nguyên code Hero) ... */ });

/*
 * -------------------------------------------
 * MARIO CLASS (SỬA LẠI LOGIC CHẾT/BỊ THƯƠNG)
 * -------------------------------------------
 */
var Mario = Hero.extend({
    // ... (init, setMarioState, setState, input, victory, shoot, setVelocity, blink, invincible, grow, shooter, walk, ... , stand, crouch, jump, move, addCoin, playFrame... giữ nguyên) ...
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
        this.deathStepUp = Math.ceil(200 / this.deathFrames);
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
        var r = this.level.width - 640;
        var w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210)); 
        this.level.setParallax(w);
        
        // Kiểm tra thắng (ví dụ: chạm cờ ở cuối)
        // Note: Logic này nên được chuyển vào 1 đối tượng 'VictoryPole' hoặc 'Checkpoint' cuối cùng
        if(this.onground && this.x >= this.level.width - 128 && this.level.id === (definedLevels.length - 1)) {
             // Chỉ thắng ở màn cuối cùng
             this.victory();
        }
    },
    input: function(keys) {
        this.fast = keys.accelerate;
        this.crouching = keys.down;
        if(!this.crouching) {
            if(this.onground && keys.up) this.jump();
            if(keys.accelerate && this.marioState === mario_states.fire) this.shoot();
            if(keys.right || keys.left) this.walk(keys.left, keys.accelerate);
            else this.vx = 0;
        }
    },
    victory: function() {
        if (this.level.nextCycles > 0) return; // Đã thắng
        this.level.playMusic('success');
        this.clearFrames();
        this.view.show();
        this.setImage(images.sprites, this.state === size_states.small ? 241 : 161, 81);
        this.level.next(); // Kích hoạt chuyển màn
    },
    shoot: function() {
        if(!this.cooldown) {
            this.cooldown = constants.cooldown;
            this.level.playSound('shoot');
            new Bullet(this);
        }
    },
    setVelocity: function(vx, vy) {
        if(this.crouching) {
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
    addCoin: function() {
        this.setCoins(this.coins + 1);
    },
    playFrame: function() {     
        if(this.blinking) {
            if(this.blinking % constants.blinkfactor === 0) this.view.toggle();
            this.blinking--;
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
    // Sửa setLifes để không gọi Game Over
    setLifes : function(lifes) {
        this.lifes = lifes;
        $('#liveNumber').text(this.lifes);
    },
    // Hoạt ảnh chết
    death: function() {
        if(this.deathBeginWait > 0) {
            this.deathBeginWait--;
            return true;
        }
        if(this.deathEndWait > 0) {
             this.deathEndWait--;
             return (this.deathEndWait > 0); // Trả về false khi = 0
        }
        
        // Hoạt ảnh bay lên
        this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
        this.deathCount += this.deathDir;
        
        if(this.deathCount === this.deathFrames)
            this.deathDir = -1; // Bắt đầu rơi xuống
        else if(this.deathCount === 0) { // Rơi xong
            this.deathEndWait = Math.floor(1000 / constants.interval); // Chờ 1s
            this.view.hide(); 
        }
            
        return true; // Hoạt ảnh vẫn đang chạy
    },
    // Bắt đầu trạng thái chết
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
    // Bị thương
    hurt: function(from) {
        if (this.deadly > 0) { // Đang bất tử
            if (from && typeof from.die === 'function') { from.die(); }
            return; 
        } 
        if (this.invulnerable > 0) { return; } // Đang nhấp nháy

        if (this.state === size_states.small) {
            // TRỪ MẠNG
            this.setLifes(this.lifes - 1); 
            this.die(); // Kích hoạt trạng thái/hoạt ảnh chết
            // Hàm Level.reload() sẽ xử lý logic Game Over hay hồi sinh
        } else {
            // Bị thu nhỏ
            this.invulnerable = Math.floor(constants.invulnerable / constants.interval);
            this.blink(Math.ceil(this.invulnerable / (2 * constants.blinkfactor)));
            this.setState(size_states.small); 
            this.level.playSound('hurt');               
        }
    },
}, 'mario');

// --- CÁC LỚP ENEMY (Gumpa, Turtle...) --- (Giữ nguyên)
var Enemy = Figure.extend({ /* ... (Giữ nguyên code Enemy) ... */ });
var Gumpa = Enemy.extend({ /* ... (Giữ nguyên code Gumpa) ... */ }, 'ballmonster');
var TurtleShell = Enemy.extend({ /* ... (Giữ nguyên code TurtleShell) ... */ }, 'shell');
var GreenTurtle = Enemy.extend({ /* ... (Giữ nguyên code GreenTurtle) ... */ }, 'greenturtle');
var SpikedTurtle = Enemy.extend({ /* ... (Giữ nguyên code SpikedTurtle) ... */ }, 'spikedturtle');
var Plant = Enemy.extend({ /* ... (Giữ nguyên code Plant) ... */ });
var StaticPlant = Plant.extend({ /* ... (Giữ nguyên code StaticPlant) ... */ }, 'staticplant');
var PipePlant = Plant.extend({ /* ... (Giữ nguyên code PipePlant) ... */ }, 'pipeplant');


/*
 * -------------------------------------------
 * HÀM SCALE GAME
 * -------------------------------------------
 */
function scaleGame() {
    const gameContainer = document.getElementById('game');
    if (!gameContainer) {
         console.warn("scaleGame: #game element not found.");
         return;
    }

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    const scaleX = winWidth / GAME_WIDTH;
    const scaleY = winHeight / GAME_HEIGHT;
    const scale = Math.min(scaleX, scaleY); 

    // Áp dụng scale
    gameContainer.style.transform = `scale(${scale})`;
    
    // Căn giữa game sau khi scale
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
          window.level.pause(); // Dừng game cũ nếu có
          console.log("Paused existing game loop.");
     }
     // Tạo đối tượng Level và gán vào biến toàn cục 'level'
     window.level = new Level('world'); 
     if (typeof definedLevels !== 'undefined' && definedLevels.length > 0) {
          level.load(definedLevels[0]); // Tải màn chơi đầu tiên
          level.start(); // Bắt đầu game loop
          keys.bind(); // Kích hoạt input
          console.log("Game initialized and started level 0.");

          // Tìm Mario sau khi load
          var mario = level.figures.find(fig => fig instanceof Mario);
          if (!mario) { console.error("Mario instance not found after init!"); }

     } else {
          console.error("definedLevels is not defined or empty! Cannot load level.");
          alert("Lỗi: Không thể tải dữ liệu màn chơi!");
     }
}

// Không tự động khởi tạo game nữa, chờ lệnh từ index.html
// $(document).ready(function() {
//      // initGame(); // Sẽ được gọi sau khi login
// });

