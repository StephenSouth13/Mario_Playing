var reflection = {}; // Khởi tạo reflection toàn cục

// Dòng reflection['questionbox'] = QuestionBox; ĐÃ BỊ XÓA KHỎI ĐÂY

//http://ejohn.org/blog/simple-javascript-inheritance/
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // Lớp Class cơ sở (không làm gì)
    this.Class = function(){};
   
    // Hàm để tạo lớp con mới kế thừa từ lớp hiện tại
    Class.extend = function(prop, ref_name) {
        
        var _super = this.prototype; // Lấy prototype của lớp cha

        // Tạo một đối tượng prototype mới kế thừa từ lớp cha
        // nhưng không chạy hàm init() của cha
        initializing = true;
        var prototype = new this();
        initializing = false;
       
        // Sao chép các thuộc tính/phương thức từ 'prop' vào prototype mới
        for (var name in prop) {
            // Kiểm tra xem có đang ghi đè một hàm và có gọi _super không
            prototype[name] = typeof prop[name] == "function" && 
              typeof _super[name] == "function" && fnTest.test(prop[name]) ?
              // Nếu có, tạo hàm bao (wrapper) để cung cấp this._super
              (function(name, fn){
                return function() {
                  var tmp = this._super;
                  // Gán tạm this._super thành hàm của lớp cha
                  this._super = _super[name];
                  // Thực thi hàm của lớp con
                  var ret = fn.apply(this, arguments);        
                  // Phục hồi this._super cũ
                  this._super = tmp;
                  return ret;
                };
              })(name, prop[name]) :
              // Nếu không, chỉ cần sao chép qua
              prop[name];
        }
       
        // Hàm khởi tạo (constructor) thực sự cho lớp con
        function Class() {
            // Chỉ gọi hàm init() khi tạo đối tượng mới (không phải khi kế thừa)
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }
       
        // Gán prototype đã tạo cho lớp con
        Class.prototype = prototype;
       
        // Đặt lại constructor cho đúng
        Class.prototype.constructor = Class;

        // Cho phép lớp con này tiếp tục được kế thừa
        Class.extend = arguments.callee; 
       
        // === SỬA LỖI: Gán vào reflection SAU KHI Class con đã hoàn chỉnh ===
        if(ref_name) {
             reflection[ref_name] = Class; // Gán lớp con vào reflection
             // console.log("Registered reflection:", ref_name); // Bỏ comment để debug nếu cần
        }
        // =================================================================
       
        return Class; // Trả về lớp con mới
    };
})();

