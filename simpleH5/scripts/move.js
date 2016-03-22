/**
 * 
 * @authors csy (xjcjcsy@qq.com)
 * @date    2014-12-06 12:27:24
 * @version $Id$
 */
/*
* description : 修改注意：
*                   1. 所有的动画效果写在page-content 的 data-animate标签上，如果要修改动画效果主需要修改data-animate属性
*                       并且修改animation.css 里的css 即可
*                   2. 注意一个细节，当第一页点击之后，第一页再也不会显示 ，这不是bug
*                   3. 方法没有封装的很到位，别介意
*                   4. 有问题邮件
*                   5. 如果您有更好的实现方式请通过邮件告诉我
*                                                                                          by  csy.
* */
var touch = {

	_moveFirst : true,
	_page : $(".page"),
    _cont : $(".animate"),
	_pageNow : 0,
	_pageNext : null,
	_pageNum : $(".page").size(),
    _speed : 1000,
    _showPic : 7,    						//开始加载图片数量
    _lazyLoad : 5,							//滑动一次加载之后的五张
	_view : $("#view"),
	_icon : $(".icon"),
	_load : $(".load"),

	_firstChange : false,
	_isAnimating : true,
    _tapFirst : true,                    
	//禁止滚动条
	_scrollStop		: function(){
						//禁止滚动
						$(window).on('touchmove.scroll',this._scrollControl);
						$(window).on('scroll.scroll',this._scrollControl);
	},

	//滚动条控制事件
	_scrollControl	: function(e){e.preventDefault();},


    //初始化事件
	initSwipe : function(){
		touch._view.swipeUp(touch.page_swipeUp);
		touch._view.swipeDown(touch.page_swipeDown);
	},

	page_swipeUp : function(e){
		if(touch._isAnimating) return;
        var node;
		touch._moveFirst = false;
		//到底判断
		if(touch._pageNow == touch._pageNum-1){
            //开启循环滑动
			touch._firstChange = true;
			touch._pageNext = 0;
            console.log(touch._pageNext)
		} else{
			touch._pageNext = touch._pageNow + 1;
		}
		touch._isAnimating = true;
		touch.lazyLoading();//加载之后 的图片
		node = touch.position(e);
	    touch.setTimeEvent(node, "toTop","fromTop");
	},
	page_swipeDown : function(e){
		if(touch._moveFirst) return;
		if(touch._isAnimating) return;
		// 顶部判断
		if(touch._pageNow == 0){
			if(!touch._firstChange) return;
			touch._pageNext = touch._pageNum - 1;
		} else{
			touch._pageNext = touch._pageNow - 1;
		}
		touch._isAnimating = true;

		node = touch.position(e);
	    touch.setTimeEvent(node, "toBottom","fromBottom");
	},

	position : function(e){	
		touch._icon.hide();
		if(e.type == "swipeUp") {
			next = touch._page.eq(touch._pageNext);
			now = touch._page.eq(touch._pageNow);
	        node = [now, next];
			next.removeClass("hide")
			now.addClass("toTop");

			touch._pageNow = touch._pageNext;
		} else {
			var now = touch._page.eq(touch._pageNow);
			var next = touch._page.eq(touch._pageNext);
	        var node = [now, next];
			next.removeClass("hide");
			now.addClass("toBottom");
			touch._pageNow = touch._pageNext;
		}
		return node;
	},
    /*
    * 翻页成功之后做的函数
    * */
    setTimeEvent : function(arr, class_1, class_2){
        setTimeout(function(){
            touch._isAnimating = false;
            if(touch._firstMove) {
                touch._firstMove = false;
            }
            arr[0].find(".animate").addClass("hide");
            arr[1].find(".animate").removeClass("hide");
            arr[0].removeClass("current " + class_1).addClass("hide");
            arr[1].addClass("current");
            touch._icon.show();
        },touch._speed);
    },
	/*图片加载完成显示*/
	pageShow : function(){
		touch._load.remove();
		touch._icon.show();
		this._page.eq(touch._pageNow).removeClass("hide").addClass("current");
		this._page.eq(touch._pageNow).find(".page-content").removeClass("hide");

			
		//等待动画完成
		touch._isAnimating = false;

	},

	/* 图片预加载*/
	imgLoading : function(){
		var src = $(".lazyImg");
		for(var i = 0; i < touch._showPic; i++){
			var img = new Image();
			img.onload = (function(n){
				return function(){
					if(this.complete==true){ 
						$(src[n]).removeClass("lazyImg"); 
                		$(src[n]).css("backgroundImage" ,"url("+ this.src + ")"); 
               			if( n == touch._showPic -1 ){
							touch.pageShow();
						} 
            		}  	
				}
			})(i)
			img.src = (function(num){			
				return $(src[num]).data("src");
			})(i) 		
		}
	},
	lazyLoading : function(){
		var src = $(".lazyImg");
		for(var i = 0; i < touch._lazyLoad; i++){
			var img = new Image();
			img.onload = (function(n){
				return function(){
					if(this.complete==true){  
						$(src[n]).removeClass("lazyImg"); 
                		$(src[n]).css("backgroundImage" ,"url("+ this.src + ")"); 
               			if( n == touch._showPic -1 ){
							touch.pageShow();
						} 
            		}  	
				}
			})(i)
			img.src = (function(num){			
				return $(src[num]).data("src");
			})(i) 		
		}
	},
    /*
    * 初始化动画
    * */
    initAnimate : function(){
        var animate_,animate;
        this._cont.each(function(k, v){
            animate_ = $(v).data("animate");
            animate  = animate_.split(" ");
            for(var i = 0; i < animate.length; i++){
                $(v).addClass(animate[i]);
            }
        })
    },
     /*
    * 初始化 css
    * */
	initStyle : function(){
		touch._page.addClass("hide");
		touch._icon.hide();
		touch._page.find(".page-content").addClass("hide");

		/*
		*   图片样式
		*/
		touch._view.css({
			height:$(window).height(),
			width:$(document).width()
		});
		/*
		*  容器 样式
		*/
		touch._page.css({
			height:$(window).height(),
			width:$(document).width()
		});
		/*
		*  文字 图片样式
		*/
		touch._page.find(".page-content").css({
			height:$(window).height(),
			width:$(document).width()
		});
		/*
		*  load 图片样式
		*/
		touch._load.css({
			height:$(window).height(),
			width:$(document).width()
		});
		touch._load.show();
	},

	init : function(){		
		this._scrollStop();
		this.initStyle();
        this.initAnimate();
		this.imgLoading();
        this.initSwipe();

	}

}
touch.init();

