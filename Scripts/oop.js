/*
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */

// Biến reflection toàn cục
// Sẽ được các file (như main.js) tự động điền vào
var reflection = {};

(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    
    // Lớp Class cơ sở (rỗng)
    this.Class = function(){};
    
    // Hàm extend để tạo lớp con
    Class.extend = function(prop, ref_name) {
        var _super = this.prototype;
        
        // Khởi tạo một đối tượng prototype (không chạy hàm init)
        initializing = true;
        var prototype = new this();
        initializing = false;
        
        // Sao chép các thuộc tính/phương thức mới vào prototype
        for (var name in prop) {
            // Kiểm tra nếu chúng ta đang ghi đè một hàm
            // và hàm mới có gọi this._super
            prototype[name] = typeof prop[name] == "function" && 
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        
                        // Thêm một phương thức ._super() tạm thời
                        this._super = _super[name];
                        
                        // Chạy phương thức mới
                        var ret = fn.apply(this, arguments);        
                        
                        // Khôi phục lại this._super
                        this._super = tmp;
                        
                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }
        
        // Hàm khởi tạo (constructor) thực sự của Lớp mới
        function Class() {
            // Chỉ chạy hàm init nếu chúng ta không đang ở chế độ initializing
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }
        
        // Gán prototype mới
        Class.prototype = prototype;
        
        // Đặt lại con trỏ constructor
        Class.prototype.constructor = Class;

        // Cho phép lớp này được kế thừa tiếp
        Class.extend = arguments.callee;
        
        // Đăng ký class vào reflection *SAU KHI* đã tạo xong
        if(ref_name) {
             reflection[ref_name] = Class;
             // console.log("Registered reflection:", ref_name); // Bỏ comment để debug
        }
        
        return Class;
    };
})();