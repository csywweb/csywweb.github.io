// 微信端组件 js代码
// author : csy
// date : 2016-4-11

; (function ($) {
    //初始化高度
    $.extend($, {
        /*
        参数说明： 提示信息 
        类型 ： 字符串    
        */
        popwarn : function (option) {
            var str  = option || "信息填写错误";
            var html = '<div class="popwarn">' +
                            '<div class="popwarn-ctx">' +
                                '<div class="center">' +
                                    '<span class="kjicon kjicon-gantanhao"></span>' +
                                '</div>' +
                                '<p>'+ str +'</p>' +
                                '<a href="javascript:;" class="js-pop-confirm btn btn-default btn-normal full">确认</a>' +
                            '</div>' +
                        '</div>';

          
            $("body").append(html);
            $("body").on("click", ".js-pop-confirm", function () {
                $(".popwarn").remove();
            })
            return this;
        }
    }, 
    {
        /* 拨打电话 弹出框 */
        poptel: function (str) {
            var t;
            str ? t  = "tel:" + str : t = "javascript:;";
            var html = '<div class="poptel">' +
                            '<div class="poptel-ctx">' +
                                '<div class="title">拨打电话</div>' +
                                '<a class="num" href="'+ t +'">'+ str +'</a>' +
                                '<div class="cancle poptel-cancle">取消</div>' +
                            '</div>' +
                        '</div>';
            
                $("body").append(html);

            $(window).on("click", ".poptel-cancle", function (e) {
                $(".poptel").remove();
                e.preventDefault();
            });
        }
    }, {
        /* loading 弹框 
         * $.poploading().hide();可以关闭弹框
         *
         */
        poploading: function () {
            var html = '<div class="poptoast">' + 
                            '<div class="ctx">' +
                                '<div class="kj-loading">' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-0"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-1"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-2"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-3"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-4"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-5"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-6"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-7"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-8"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-9"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-10"></div>' +
                                    '<div class="kj-loading-leaf kj-loading-leaf-11"></div>' +
                                '</div>' +
                                '<p>加载中</p>' +
                            '</div>' +
                        '</div>';
            function Poploading() {
                this.hide = function () {
                    $(".poptoast").remove();
                }
            }
           
            $("body").append(html);

            return new Poploading();
        }
    }, {
        /* 单纯的文字提示
         * 参数 ： 提示文字  
         * 格式 ： 字符串
         */
        poptip: function (s) {
            var str = s || "加载完成";
            var html = '<div class="poptip">' +
                            '<span class="ctx">'+ str +'</span>' +
                        '</div>';

            $("body").append(html);

            setTimeout(function () {
                $(".poptip").remove();
            }, 1100);

        }
    }, {
        //文本提示框
        //参数 html字符串
        poptext: function (options) {
            var opt = {
                content: "<p>提示消息</p>",
                fn: function () {
                    $(".popalert").addClass("animate-hide");
                    setTimeout(function () {
                        $(".popalert").remove();
                        $(".popalert").removeClass("animate-hide");
                    }, 200);
                }
            }
            opt = $.extend(opt, options);
            var str  = opt.content;
            var html = '<div class="poptext popalert">' +
                            '<div class="ctx">' +
                                '<div class="wrap">'+ str +'</div>' +
                                '<div class="confirm text-confirm">确认</div>' +
                            '</div>' +
                        '</div>';
            $("body").append(html);

            $("body").on("click", ".text-confirm", function () {
                opt.fn();
            })
        }
    },{
        popconfirm: function(options){
            function hide(){
                $(".popconfirm").addClass("animate-hide");
                setTimeout(function () {
                    $(".popconfirm").remove();
                    $(".popconfirm").removeClass("animate-hide");
                }, 200);
            }
            var opt = {
                content: "<p>提示消息</p>",
                fn: function () {
                    $(".popconfirm").addClass("animate-hide");
                    setTimeout(function () {
                        $(".popconfirm").remove();
                        $(".popconfirm").removeClass("animate-hide");
                    }, 200);
                }
            }
            opt = $.extend(opt, options);
            var html = '<div class="popconfirm poptext">' +
                            '<div class="ctx">' +
                                '<div class="wrap">123213</div>' +
                                
                                 '<div class="ub">' + 
                                    '<div class="confirm text-confirm ub-f1">确认</div>' +
                                    '<div class="confirm text-cancle ub-f1">取消</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
            $("body").append(html);

            $("body").on("click", ".text-confirm", function () {
                opt.fn();
                hide();
            })

            $("body").on("click", ".text-cancle", function () {
                $(".popconfirm").addClass("animate-hide");
                hide();
            })
        }
    })
})(Zepto)