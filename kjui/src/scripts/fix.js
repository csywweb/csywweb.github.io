var dpr = window.devicePixelRatio;   //获取设备dpr;
var width = document.documentElement.clientWidth;   //获取设备宽度
var scale = 1 / dpr;                 //设置viewport缩放比列

var fontsize = width / 320 * dpr * 10;   //设置根元素大小
fontsize = dpr * 10;
document.querySelector('meta[name="viewport"]').setAttribute("content",
    "width=" + dpr * width +
    ", initial-scale=" + scale +
    ",maximum-scale=" + scale +
    ", minimum-scale=" + scale +
    ",user-scalable=no");
document.querySelector("html").setAttribute("style","font-size:"+fontsize+"px");