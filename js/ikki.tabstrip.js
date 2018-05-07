/*!
 * Kendo UI Admin v1.0.0 by IKKI & Amikoko - https://ikki2000.github.io/
 * Copyright 2018 IKKI Studio
 * Released under the MIT License - https://ikki2000.github.io/KendoUI-Admin-Site/LICENSE
 */

/* JS for TabStrip | Written by IKKI | 2018-02-03 */

// 选项卡标题、内容及路由创建
var tabText = '',
    tabContent = '',
    router = new kendo.Router({
        change: function(e) {
            tokenAuth();
            showPath(e.url.split('/')[e.url.split('/').length - 1]);
            $('#loading').show();
        },
        routeMissing: function() {
            error404();
        }
    });

// 路由路径
router.route('(/:lv1)(/:lv2)(/:lv3)(/:lv4)(/:lv5)', function(lv1, lv2, lv3, lv4, lv5, params) {
    var lvs = [lv1, lv2, lv3, lv4, lv5],
        routePath = webType + '/views',
        routeFile = '',
        tabStrip = $('#tab').data('kendoTabStrip');
    $.each(lvs, function(i, lv) {
        if (lv) {
            routePath += '/' + lv;
            routeFile = lv;
        }
    });
    if ($('#tab-' + routeFile).length < 1) {
        // 选项卡添加
        $.get(path + routePath + '.html', function(temp) {
            $('#template').html(temp);
            if (routeFile === 'home') {
                tabText = '<span id="tab-' + routeFile + '"><i class="fas fa-home"></i>首页<small>Home</small></span>';
            } else if (routeFile === '404') {
                tabText = '<span id="tab-' + routeFile + '"><i class="fas fa-info-circle"></i>404<small>Error</small><i class="fas fa-times-circle"></i></span>';
            } else {
                tabText = '<span id="tab-' + routeFile + '">' + $('#navMenu, #menuH, #menuV').find('.links-'+ routeFile).children('.k-link').html() + '<i class="fas fa-times-circle"></i></span>';
            }
            tabContent = $(new kendo.View(routeFile + 'Temp', { wrap: false }).render()).parent().html();
            tabStrip.append({
                text: tabText,
                content: tabContent,
                encoded: false
            }).select(tabStrip.items().length - 1);
            $.getScript(path + routePath + '.js', function() {
                $('#loading').hide();
            });
        }).fail(function() {
            error404();
        });
    } else {
        // 选项卡激活
        tabStrip.activateTab($('#tab-' + routeFile).closest('.k-item'));
    }
});

// 路由根目录
router.route('/', function() {
    router.navigate('/home');
});

// 路由丢失
function error404() {
    router.navigate('/404');
}

// 路由导航链接
function linkTo(dirs, links) {
    router.navigate(dirs + links);
}

// 初始化
$(function() {
    // 选项卡创建
    $('#tab').kendoTabStrip({
        animation: false,
        select: function(e) {
            var selected = $(e.item).find('.k-link').children('span').attr('id').split('-')[1];
            if (selected === 'home') {
                router.navigate('/home');
            } else if (selected === '404') {
                router.navigate('/404');
            } else {
                location.href = $('#navMenu, #menuH, #menuV').find('.links-'+ selected).children('.k-link').attr('href');
            }
        },
        activate: function(e) {
            $('#loading').hide();
        }
    });
    var tabStrip = $('#tab').data('kendoTabStrip');
    // 选项卡删除
    tabStrip.tabGroup.on('click', '.fa-times-circle', function(e) {
        tabStrip.remove($(e.target).closest('.k-item'));
        router.navigate('/home');
    });
    // 选项卡拖放排序
    $('#tab ul.k-tabstrip-items').kendoSortable({
        container: 'ul.k-tabstrip-items',
        filter: 'li.k-item',
        axis: 'x',
        cursor: 'move',
        hint: function(e) {
            return $('<div id="hint" class="k-widget k-header k-tabstrip"><ul class="k-tabstrip-items k-reset"><li class="k-item k-state-active k-tab-on-top">' + e.html() + '</li></ul></div>');
        },
        start: function(e) {
            tabStrip.select(e.item);
        },
        change: function(e) {
            var reference = tabStrip.tabGroup.children().eq(e.newIndex);
            if (e.oldIndex < e.newIndex) {
                tabStrip.insertAfter(e.item, reference);
            } else {
                tabStrip.insertBefore(e.item, reference);
            }
        },
        placeholder: function(e) {
            return e.clone().css({
                'opacity': .3,
                'border': '1px dashed #666'
            });
        },
        end: function(e) {
            tabStrip.activateTab(e.item);
        }
    });
    // 选项卡右键关联菜单
    $('#contextMenu').kendoContextMenu({
        target: '#tab ul.k-tabstrip-items',
        dataSource: [
            {
                text: '<i class="fas fa-times"></i>关闭当前页',
                encoded: false,
                url: 'javascript:closeThis();'
            },
            {
                text: '<i class="far fa-times-circle"></i>关闭其他页',
                encoded: false,
                url: 'javascript:closeOthers();'
            },
            {
                text: '<i class="fas fa-times-circle"></i>关闭所有页',
                encoded: false,
                url: 'javascript:closeAll();'
            }
        ]
    });
    // 路由启动
    router.start();
    // 选项卡首页
    router.navigate('/');
});

// 关闭当前页
function closeThis() {
    if ($('#tab li.k-state-active').find('#tab-home').length < 1) {
        $('#tab').data('kendoTabStrip').remove($('#tab li.k-state-active'));
        router.navigate('/home');
    }
}

// 关闭其他页
function closeOthers() {
    $('#tab li.k-item').each(function() {
        if ($(this).find('#tab-home').length < 1 && !($(this).hasClass('k-state-active'))) {
            $('#tab').data('kendoTabStrip').remove($(this));
        }
    });
}

// 关闭所有页
function closeAll() {
    $('#tab li.k-item').each(function() {
        if ($(this).find('#tab-home').length < 1) {
            $('#tab').data('kendoTabStrip').remove($(this));
        }
    });
    router.navigate('/home');
}

// 选项卡刷新
function refresh() {
    $('#loading').show();
    tokenAuth();
    $.get(path + webType + '/views' + location.hash.split('#')[1] + '.html', function(temp) {
        $('#template').html(temp);
        $('#tab div.k-state-active').html($(new kendo.View(location.hash.split('/')[location.hash.split('/').length - 1] + 'Temp', { wrap: false }).render()).parent().html());
        $.getScript(path + webType + '/views' + location.hash.split('#')[1] + '.js', function() {
            $('#loading').hide();
        });
    });
}