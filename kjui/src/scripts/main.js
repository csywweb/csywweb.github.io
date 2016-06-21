$(function () {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    // grid
    var home = {
        url: '/',
        className: 'home',
        render: function () {
            return $('#tpl_home').html();
        }
    };

    // button
    var button = {
        url: '/button',
        className: 'button',
        render: function () {
            return $('#tpl_button').html();
        }
    };


    // toast
    var toast = {
        url: '/toast',
        className: 'toast',
        render: function () {
            return $('#tpl_toast').html();
        },
        bind: function () {
            $('#container').on('click', '#tip', function () {
               $.poptip();
            }).on('click', '#loading', function () {
                $.poploading()
                setTimeout(function(){
                    $.poploading().hide();
                },2000)
            });
        }
    };

    // dialog
    var dialog = {
        url: '/dialog',
        className: 'dialog',
        render: function () {
            return $('#tpl_dialog').html();
        },
        bind: function () {
            $('#container').on('click', '#alert', function () {
                $.poptext();
            }).on('click', '#confirm', function () {
               $.popconfirm();
            });

        }
    };

 

    // actionsheet
    var actionsheet = {
        url: '/actionsheet',
        className: 'actionsheet',
        render: function () {
            return $('#tpl_actionsheet').html();
        },
        bind: function () {
            $('#container').on('click', '#tel', function () {
                $.poptel("13912344123");
            });
        }
    };

    router.push(home)
        .push(button)
        .push(toast)
        .push(dialog)
        .push(actionsheet)
        .setDefault('/')
        .init();


    // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    // 相关 issue: https://github.com/weui/weui/issues/15
    // 解决方法:
    // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
    // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
    //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
});