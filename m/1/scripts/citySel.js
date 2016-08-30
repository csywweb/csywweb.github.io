/*
 * 省市区选择插件
 * date : 2016-8-23
 * author : 曹思远
 *  初步实现功能，待优化
 *
 */
(function ($) {
    var url = "/scripts/city.min.json";
    var province = "";
    var city = "";
    var area = "";
    var arr_p = null;
    var arr_city = null;
     console.log($(".main-citysel").html());
    //点击一级菜单
    $(".main-citysel").on("click", ".first-citysel a", function () {
        console.log("xxxx");
        if ($(this).data("city")) {
            var now_city = $(this).data("city");
            last(now_city);
            return;
        }
        if ($(this).data("hot") == 1) {
            var hot_str = $(this).data("ctx");
            hotcity(hot_str);
            //样式切换
            //$(".first-citysel .col").removeClass("current");
            //$(this).addClass("current");
            return;
        }
        if ($(this).data("add") && $(this).data("add") != "国外") {
            var now_p = $(this).data("add");
            $(".parent-text").text(now_p);
            province = now_p;
            now_p == "热门城市" ? child(now_p, 1) : child(now_p);
            //样式切换
            $(".first-citysel a").removeClass("current");
            $(this).addClass("current");
            return;
        } else {
            province = "国外"
            saveAdd();
            return;
        }
        
    })

    //点击二级菜单
    $(".main-citysel").on("click", ".second-citysel a", function () {
        var isChild = $(this).data("area");     //有没有第三级
        var isLast = $(this).data("last");      //是否是第三级
        var isHot = $(this).data("hot");        //是否点击的是热门城市

        if (isHot == 1) {
            var hot_str = $(this).text();
            hotcity(hot_str);
            return;
        }
        if (isChild == 1) {
            //用来匹配的值，根据city来匹配对应的地区数组
            var com_val = $(this).data("city"); 
            last(com_val);
            return;
        }
        //如果没有第三级
        if (isChild == 0) {
            var cur_val = $(this).text();
            saveAdd(province, cur_val);
            return;
        }

        //如果是第三级
        if (isLast == 1) {
            var area_val = $(this).text();
            saveAdd(city ,area_val);
            return;
        }
    })
    //点击头部一级分类
    $(".main-citysel").on("click", ".parent-text", function () {
        //目标省份
        var tag_p = $(this).text();

        init(arr_p, tag_p);
    })
    //点击关闭按钮
    $(".main-citysel").on("click", ".close-citysel", function () {
        closePop();
    })

    //初始化一级菜单
    function init(data, str) {
        var l = data.length;
        var level1 = "";
        var level1_top = "";
        var child_flag = "";
        for (var i = 0; i < l; i++) {
            if (i == 0 && !str) {
                level1_top = '<a href="javascript:;" class="current" data-add="' + data[i].p + '">';

                province = data[i].p;
                $(".parent-text").text(province);
            } else if (str && str == data[i].p) {
                level1_top = '<a href="javascript:;" class="current" data-add="' + data[i].p + '">';

                province = data[i].p;
                $(".parent-text").text(province);
              
            } else {
                level1_top = '<a href="javascript:;" data-add="' + data[i].p + '">';
            }
            level1 += level1_top + data[i].p +'</a>';
        }
        $(".first-citysel").html(level1);
        province == "热门城市" ? child(province, 1) : child(province);
    }

    //初始化二级菜单
    function child(str, hot) {
        //过滤，根据指定的省份 筛选出城市所属城市的数组
        var newdata = arr_p.filter(function (val, index) {
                        for (var k in val) {
                            if (val[k] == str) {
                                return val;
                            }
                        }
                     });
        var datacity = newdata[0].c;
        arr_city = datacity;    //保存在全局，方便调用
       
        var ishot = "";
        var level2 = "";
        var area_flag = "";
        hot ? ishot = 1 : ishot = 0;
        for (var i = 0; i < datacity.length; i++) {
            if (i == 0) {
                $(".child-text").text(datacity[i].n);
            }
            var tmp = datacity[i].a;
            if (tmp !== undefined) {
                area_flag = 1;
            } else {
                area_flag = 0;
            }
            //将所属的城市名字保存在DOM元素中 用来寻找区
            level2 += '<a href="javascript:;" data-area="' + area_flag + '" data-city="' + datacity[i].n + '" data-hot="'+ ishot +'">' + datacity[i].n + '</a>';
        }
        $(".second-citysel").html(level2);

        
    }

    //设置区级
    function last(str) {
        //变换子标题
        $(".child-text").text(str);
        //过滤，根据指定的城市 筛选出城市所属区的数组
        var newdata = arr_city.filter(function (val, index) {
                            for (var k in val) {
                                if (val[k] == str) {
                                    return val;
                                }
                            }
                        });
        var level2 = "";
        //对应城市的地区数组
        city = newdata[0].n;
        var dataarr = newdata[0].a;
        for (var i = 0; i < dataarr.length; i++) {
            level2 += '<a href="javascript:;"  data-last="1">' + dataarr[i].s + '</a>';
        }
        $(".second-citysel").html(level2);

        //重新填充一级菜单
        var level1 = "";
        var level1_top = "";
        for (var i = 0; i < arr_city.length; i++) {
            if (arr_city[i].n == str) {
                level1_top = '<a href="javascript:;" class="current" data-city="' + arr_city[i].n + '">'
            } else {
                level1_top = '<a href="javascript:;" data-city="' + arr_city[i].n + '">';
            }
            level1 += level1_top + arr_city[i].n + '</a>';
        }
        $(".first-citysel").html(level1);
    }

    //点击热门城市
    function hotcity(str) {
        $(".parent-text").text("热门城市");
        var hot_name = str;
        var hot_last = null;
        var isbreak = 0;
        var hot_arr = null;
        for (var i = 0; i < arr_p.length; i++) {
            if (isbreak == 1) {
                break;
            }
            //略过热门城市这一项
            if (arr_p[i].p == "热门城市") {
                hot_arr = arr_p[i].c;
                continue;
            }
            //是否为直辖市
            if (arr_p[i].p == hot_name) {
                hot_last = arr_p[i].c;
                province = arr_p[i].p;
                city = arr_p[i].p;
                $(".child-text").text(province);
                break;
            }
            
            //不是直辖市 遍历找到对应的区级数组
            var tmp = arr_p[i].c;
            for (var j = 0; j < tmp.length; j++) {
                if (tmp[j].n == hot_name) {
                    hot_last = tmp[j].a;
                    isbreak = 1;
                    province = arr_p[i].p;
                    city = tmp[j].n;
                    break;
                }
            }
        }
        
       
        var html = "";
        var ctx = "";
       
        for (var i = 0; i < hot_last.length; i++) {
            hot_last[i].s ? ctx = hot_last[i].s : ctx = hot_last[i].n
            html += '<a href="javascript:;" data-last="1">' + ctx + '</a>';
        }
        $(".second-citysel").html(html);

        //循环一级列表 第一个菜单变为一级菜单
        var level1 = "";
        var level1_top = "";
        for (var j = 0; j < hot_arr.length; j++) {
            hot_arr[j].n == city ? level1_top = '<a href="javascript:;" class="current" data-hot="1" data-ctx="' + hot_arr[j].n + '">' : level1_top = '<a href="javascript:;" class="" data-hot="1" data-ctx="' + hot_arr[j].n + '">'
            
            level1 += level1_top + hot_arr[j].n + '</a>';
        }
        $(".first-citysel").html(level1);
    }
    //保存地址并关闭弹窗
    function saveAdd(c, a) {
        if(arguments.length == 0){
            var address = province ;
        } else {
            var address = province + " " + c + " " + a;
        }
       
        $(".js-province").val(province);
        $(".js-city").val(c);
        $(".js-area").val(a);

        $(".js-citysel").val(address);
        console.log(address)
        closePop();
    };

    function closePop() {
        $(".mask-citysel").hide();
    };
    
    $.getJSON(url, function (data) {
        arr_p = data.citylist;
        init(arr_p);
       
    })
})(Zepto);