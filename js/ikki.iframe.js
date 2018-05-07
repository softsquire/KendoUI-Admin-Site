/*!
 * Kendo UI Admin v1.0.0 by IKKI & Amikoko - https://ikki2000.github.io/
 * Copyright 2018 IKKI Studio
 * Released under the MIT License - https://ikki2000.github.io/KendoUI-Admin-Site/LICENSE
 */

/* JS for iFrame | Written by IKKI | 2018-02-03 */

// 框架面包屑首页
$(function() {
    tokenAuth();
    showPath();
});

// 框架导航链接
function linkTo(dirs, links) {
    tokenAuth();
    window.frames['section'].location.href = path + webType + '/pages' + dirs + links + '.html';
    showPath(links);
}

// 框架刷新
function refresh() {
    tokenAuth();
    window.frames['section'].location.reload();
}