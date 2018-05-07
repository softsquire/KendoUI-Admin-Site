/*!
 * Kendo UI Admin v1.0.0 by IKKI & Amikoko - https://ikki2000.github.io/
 * Copyright 2018 IKKI Studio
 * Released under the MIT License - https://ikki2000.github.io/KendoUI-Admin-Site/LICENSE
 */

/* JS for Website | Written by IKKI | 2018-02-03 */

// 配置路径
var path = $('base').attr('href'),
    webType = $('base').attr('type'),
    loginMenuUrl = '/json/site_login.json',
    logoutMenuUrl = '/json/site_logout.json',
    tokenUrl = 'json/logout.json',
    logoutUrl = 'json/response.json';

/* 初始化 ****************************************************************************/
$(function() {
    // 语言
    kendo.culture('zh-CN');
});

// 发送 Token 验证
function tokenAuth() {
    $.ajax({
        headers: {
            'Authorization': sessionStorage.getItem('token'),
        },
        async: false,
        type: 'get',
        // type: 'post',
        data: {
            userid: sessionStorage.getItem('userid')
        },
        url: tokenUrl,
        dataType: 'json',
        success: function(res) {
            if (res.result === 'y') {
                // 已登录导航数据获取
                ajaxPost('get', '', path + loginMenuUrl, showNav, noFunc, false);
            } else {
                sessionStorage.clear();
                // 未登录导航数据获取
                ajaxPost('get', '', path + logoutMenuUrl, showNav, noFunc, false);
            }
        }
    });
}

// 导航显示
function showNav(res) {
    $('#navPanelBar').kendoPanelBar({
        dataSource: res.data
    });
    $('#menuH').kendoMenu({
        dataSource: res.data
    });
}

// 面包屑导航
function showPath(hash) {
    $('#path').html('');
    $.each($('#menuH').find('.links-'+ hash).children('.k-link').parents('.k-item'), function(i, doms) {
        $('#path').prepend('<span><i class="fas fa-angle-double-right"></i>' + $(doms).children('.k-link').html() + '</span>');
    });
    if (hash === '404') {
        $('#path').prepend('<span><i class="fas fa-angle-double-right"></i><i class="fas fa-info-circle"></i>404<small>Error</small></span>');
    }
    $('#path').prepend('<a href="' + webType + '/#/home' + '"><i class="fas fa-home"></i>首页<span><small>Home</small></span></a>');
}

// 配色
function changeColor(color) {
    $('#Amikoko').attr('href', path + '/css/themes/theme_' + color + '.css');
    setTimeout(function() {
        kendo.dataviz.autoTheme(true);
        refresh();
    }, 100);
}

// 语言
function changeLang(lang) {
    $.getScript(path + '/js/global/kendo.' + lang + '.js', function() {
        kendo.culture(lang);
        refresh();
    });
}

// 退出登录
function logout() {
    $.ajax({
        type: 'get',
        // type: 'post',
        data: {
            userid: sessionStorage.getItem('userid')
        },
        url: logoutUrl,
        dataType: 'json',
        success: function(res) {
            if (res.result === 'y') {
                // 清除登录状态
                sessionStorage.clear();
                ajaxPost('get', '', path + logoutMenuUrl, showNav, noFunc, false);
            } else {
                noticeMsg(res.msg, 'error', 'center', noFunc);
            }
        }
    });
}