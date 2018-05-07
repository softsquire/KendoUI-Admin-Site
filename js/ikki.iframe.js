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