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
        if (nextLevelId >= 3) { // Nếu đã hoàn thành màn 2 (id=2)
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
    
    // Sửa lỗi 404 âm thanh bằng cách comment out
    setSounds: function(manager) { this.sounds = manager; },
    playSound: function(label) { 
        // if(this.sounds) this.sounds.play(label); 
    },
    playMusic: function(label) { 
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
        if (!level || !level.world) { // Kiểm tra xem level và world có tồn tại không
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
    setState: function(state) { this.state = state; },
    setImage: function(img, x, y) {
        if (!this.view) return; // Bảo vệ
        this.view.css({
            backgroundImage : img ? c2u(img) : 'none',
            backgroundPosition : '-' + (x || 0) + 'px -' + (y || 0) + 'px',
        });
        this._super(img, x, y);
    },
    setOffset: function(dx, dy) {
        this.dx = dx; this.dy = dy;
        this.setPosition(this.x, this.y);
    },
    setPosition: function(x, y) {
        if (!this.view) return; // Bảo vệ
        this.view.css({
            left: x, bottom: y,
            marginLeft: this.dx, marginBottom: this.dy,
        });
        this._super(x, y);
        this.setGridPosition(x, y);
    },
    setSize: function(width, height) {
        if (!this.view) return; // Bảo vệ
        this.view.css({ width: width, height: height });
        this._super(width, height);
    },
    setGridPosition: function(x, y) {
        this.i = Math.floor((x + 16) / 32); 
        this.j = Math.ceil(this.level.getGridHeight() - 1 - y / 32); 
        
        if(this.y < -64 && !this.dead) { 
             this.die();
        }
    },
    getGridPosition: function(x, y) { /* ... (Giữ nguyên) ... */ },
    setVelocity: function(vx, vy) { /* ... (Giữ nguyên) ... */ },
    getVelocity: function() { /* ... (Giữ nguyên) ... */ },
    hit: function(opponent) { /* ... (Giữ nguyên) ... */ },
    collides: function(is, ie, js, je, blocking) { /* ... (Giữ nguyên) ... */ },
    move: function() { /* ... (Giữ nguyên) ... */ },
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
        var j = this.level.getGridHeight() - 1 - this.y / 32;
        if(this.level.obstacles && i >= 0 && i < this.level.obstacles.length && j >= 0 && j < this.level.obstacles[i].length) {
             this.level.obstacles[i][j] = this;
        } else {
             // console.warn("Matter created out of bounds:", this, i, j);
        }
    },
    setImage: function(img, x, y) { /* ... (Giữ nguyên) ... */ },
    setPosition: function(x, y) { /* ... (Giữ nguyên) ... */ },
});

/*
 * -------------------------------------------
 * CÁC LỚP GROUND, DECORATION (Giữ nguyên)
 * -------------------------------------------
 */
var Ground = Matter.extend({ /* ... */ });
var TopGrass = Ground.extend({ /* ... */ }, 'grass_top');
var TopRightGrass = Ground.extend({ /* ... */ }, 'grass_top_right');
var TopLeftGrass = Ground.extend({ /* ... */ }, 'grass_top_left');
var RightGrass = Ground.extend({ /* ... */ }, 'grass_right');
var LeftGrass = Ground.extend({ /* ... */ }, 'grass_left');
var TopRightRoundedGrass = Ground.extend({ /* ... */ }, 'grass_top_right_rounded');
var TopLeftRoundedGrass = Ground.extend({ /* ... */ }, 'grass_top_left_rounded');
var Stone = Ground.extend({ /* ... */ }, 'stone');
var BrownBlock = Ground.extend({ /* ... */ }, 'brown_block');
var RightTopPipe = Ground.extend({ /* ... */ }, 'pipe_top_right');
var LeftTopPipe = Ground.extend({ /* ... */ }, 'pipe_top_left');
var RightPipe = Ground.extend({ /* ... */ }, 'pipe_right');
var LeftPipe = Ground.extend({ /* ... */ }, 'pipe_left');
var Decoration = Matter.extend({ /* ... */ });
var TopRightCornerGrass = Decoration.extend({ /* ... */ }, 'grass_top_right_corner');
var TopLeftCornerGrass = Decoration.extend({ /* ... */ }, 'grass_top_left_corner');
var Soil = Decoration.extend({ /* ... */ }, 'soil');
var RightSoil = Decoration.extend({ /* ... */ }, 'soil_right');
var LeftSoil = Decoration.extend({ /* ... */ }, 'soil_left');
var RightBush = Decoration.extend({ /* ... */ }, 'bush_right');
var RightMiddleBush = Decoration.extend({ /* ... */ }, 'bush_middle_right');
var MiddleBush = Decoration.extend({ /* ... */ }, 'bush_middle');
var LeftMiddleBush = Decoration.extend({ /* ... */ }, 'bush_middle_left');
var LeftBush = Decoration.extend({ /* ... */ }, 'bush_left');
var TopRightGrassSoil = Decoration.extend({ /* ... */ }, 'grass_top_right_rounded_soil');
var TopLeftGrassSoil = Decoration.extend({ /* ... */ }, 'grass_top_left_rounded_soil');
var RightPlantedSoil = Decoration.extend({ /* ... */ }, 'planted_soil_right');
var MiddlePlantedSoil = Decoration.extend({ /* ... */ }, 'planted_soil_middle');
var LeftPlantedSoil = Decoration.extend({ /* ... */ }, 'planted_soil_left');
var RightPipeGrass = Decoration.extend({ /* ... */ }, 'pipe_right_grass');
var LeftPipeGrass = Decoration.extend({ /* ... */ }, 'pipe_left_grass');
var RightPipeSoil = Decoration.extend({ /* ... */ }, 'pipe_right_soil');
var LeftPipeSoil = Decoration.extend({ /* ... */ }, 'pipe_left_soil');


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
        this.activated = true;
    },
    bounce: function() {
        this.isBouncing = true;
        
        for(var i = this.level.figures.length; i--; ) {
            var fig = this.level.figures[i];
            if(fig.y === this.y + 32 && fig.x >= this.x - 16 && fig.x <= this.x + 16 && !fig.onground) {
                if(fig instanceof ItemFigure)
                    fig.setVelocity(fig.vx, constants.bounce); 
                else if (fig instanceof Enemy) 
                    fig.die(); 
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
        
        this._super(); // Gọi playFrame của Base (cho hoạt ảnh nhấp nháy)
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
        this.setImage(images.objects, 714, 832); // 'planted_soil_left' (tạm)
        this.view.css('opacity', 0.6); 
        this.blocking = ground_blocking.none; 
        this.activated = false;
        
        // Xóa khỏi mảng items và obstacles, thêm vào mảng checkpoints
        level.items.pop(); 
        var gridX = this.x / 32;
        var gridY = Math.max(0, this.level.getGridHeight() - 1 - this.y / 32); // Thêm Max(0)
        if (level.obstacles[gridX] && level.obstacles[gridX][gridY] === this) {
             level.obstacles[gridX][gridY] = null; 
        }
        level.checkpoints.push(this); 
    },
    addToGrid: function() { /* Không làm gì */ },
    addToLevel: function() { /* Đã xử lý */ },
    
    activate: function(from) {
        if (!this.activated && from instanceof Mario) {
            console.log('Checkpoint activated at', this.x, this.y);
            this.level.playSound('coin'); 
            this.level.lastCheckpoint = { x: this.x, y: this.y + 1 }; // Lưu vị trí
            this.activated = true;
            this.view.css('opacity', 1.0); 
            this.setImage(images.objects, 782, 832); // Ảnh 'planted_soil_right'
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
        var gridX = this.x / 32;
        var gridY = Math.max(0, this.level.getGridHeight() - 1 - this.y / 32);
        if (this.level.obstacles[gridX] && this.level.obstacles[gridX][gridY] === this) {
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
        this.setAmount(amount || 1);
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
 * CÁC LỚP CÒN LẠI (Bullet, Hero, Mario, Enemy...)
 * (ĐÃ SỬA LỖI LOGIC HỒI SINH/GAME OVER)
 * -------------------------------------------
 */
var Bullet = Figure.extend({ /* ... (Giữ nguyên code Bullet) ... */ });
var Hero = Figure.extend({ /* ... (Giữ nguyên code Hero) ... */ });

var Mario = Hero.extend({
    // ... (Giữ nguyên init) ...
    init: function(x, y, level) { /* ... (Giữ nguyên) ... */ },
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
        
        // Kiểm tra thắng (nếu chạm cột cờ cuối màn 3)
        // (Chúng ta sẽ dùng 1 đối tượng Checkpoint đặc biệt tên là 'victorypole' ở cuối màn 2 (id=2))
    },
    input: function(keys) { /* ... (Giữ nguyên) ... */ },
    // Hàm victory() sẽ được gọi bởi checkpoint cuối cùng
    victory: function() {
        if (this.level.nextCycles > 0) return; // Đã thắng
        this.level.playMusic('success');
        this.clearFrames();
        this.view.show();
        this.setImage(images.sprites, this.state === size_states.small ? 241 : 161, 81);
        this.level.next(); // Kích hoạt chuyển màn
    },
    shoot: function() { /* ... (Giữ nguyên) ... */ },
    setVelocity: function(vx, vy) { /* ... (Giữ nguyên) ... */ },
    blink: function(times) { /* ... (Giữ nguyên) ... */ },
    invincible: function() { /* ... (Giữ nguyên) ... */ },
    grow: function() { /* ... (Giữ nguyên) ... */ },
    shooter: function() { /* ... (Giữ nguyên) ... */ },
    walk: function(reverse, fast) { /* ... (Giữ nguyên) ... */ },
    walkRight: function() { /* ... (Giữ nguyên) ... */ },
    walkLeft: function() { /* ... (Giữ nguyên) ... */ },
    stand: function() { /* ... (Giữ nguyên) ... */ },
    crouch: function() { /* ... (Giữ nguyên) ... */ },
    jump: function() { /* ... (Giữ nguyên) ... */ },
    move: function() { /* ... (Giữ nguyên) ... */ },
    addCoin: function() { this.setCoins(this.coins + 1); },
    playFrame: function() {     
        if(this.blinking) {
            if(this.blinking % constants.blinkfactor === 0) this.view.toggle();
            this.blinking--;
        } else if (this.view && !this.dead) { // Thêm: đảm bảo view hiện khi hết blink
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
    // Sửa setLifes để không gọi Game Over (Level.reload sẽ lo việc này)
    setLifes : function(lifes) {
        this.lifes = lifes;
        $('#liveNumber').text(this.lifes);
    },
    // Hoạt ảnh chết
    death: function() {
        if(this.deathBeginWait > 0) {
            this.deathBeginWait--;
            return true; // Vẫn đang trong hoạt ảnh
        }
        if(this.deathEndWait > 0) {
             this.deathEndWait--;
             return (this.deathEndWait > 0); // Vẫn đang đợi
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
        // 'from' có thể là null (từ câu hỏi sai)
        if (this.deadly > 0) { 
            if (from && typeof from.die === 'function') { from.die(); }
            return; 
        } 
        if (this.invulnerable > 0) { return; } 

        if (this.state === size_states.small) {
            // TRỪ MẠNG
            this.setLifes(this.lifes - 1); 
            this.die(); // Kích hoạt trạng thái/hoạt ảnh chết
            // Hàm Level.tick() sẽ bắt this.dead = true và gọi Level.reload()
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

// Bỏ $(document).ready() tự động chạy initGame()

