/* JS for All Pages | Written by IKKI | 2018-02-03 */

// 百度统计
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?19f119dc89e5fbc1a5a63448c2544768";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

/* 初始化 ****************************************************************************/
$(function() {
    // 移动端
    if (/Android|iPhone|iPad|iPod|Windows Phone|webOS|SymbianOS|BlackBerry/i.test(navigator.userAgent)) {

    }
    // 回到顶部
    $('#section').append('<button class="k-button k-state-selected" id="goTop"><i class="fas fa-angle-up"></i></button>').scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('#goTop').fadeIn();
        } else {
            $('#goTop').fadeOut();
        }
    });
    $('#goTop').click(function() {
        $('#section').animate({ scrollTop: 0 }, 500);
    });
});

/* Ajax 提交 ****************************************************************************/
function ajaxPost(type, data, url, succeed, failed, isMsg) {
    if (type === 'get') {
        $.ajaxSetup({
            cache: false
        });
    }
    $.ajax({
        type: type,
        data: data,
        url: url,
        dataType: 'json',
        success: function(res) {
            if (res.result === 'y') {
                succeed(res);
                if (isMsg) {
                    alertMsgNoBtn(res.msg, 'success');
                }
            } else {
                failed();
                alertMsg(res.msg, 'error');
            }
        }
    });
}

// 空方法
function noFunc() {}

/* 模态框 ****************************************************************************/

// 提示框
function tipMsg(dom, msg, position) {
    $(dom).kendoTooltip({
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        position: position,
        content: msg
    });
}

// 通知框
function noticeMsg(msg, type, position, finished) {
    var notification = $('<div class="notice-box"></div>').kendoNotification({
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        position: {
            pinned: false
        },
        show: function(e) {
            var el = e.element.parent(),
                cTop = Math.floor(($(window).height() - el.height()) / 2),
                cLeft = Math.floor(($(window).width() - el.width()) / 2);
            if (position === 'center') {
                el.css({top: cTop, left: cLeft});
            } else if (position === 'top') {
                el.css({top: 10, left: cLeft});
            } else if (position === 'left') {
                el.css({top: cTop, left: 10});
            } else if (position === 'right') {
                el.css({top: cTop, right: 10});
            } else if (position === 'bottom') {
                el.css({left: cLeft, bottom: 10});
            } else if (position === 'left top') {
                el.css({top: 10, left: 10});
            } else if (position === 'right top') {
                el.css({top: 10, right: 10});
            } else if (position === 'left bottom') {
                el.css({left: 10, bottom: 10});
            } else if (position === 'right bottom') {
                el.css({right: 10, bottom: 10});
            }
        },
        autoHideAfter: 3000,
        hide: function() {
            finished();
        }
    }).data('kendoNotification');
    notification.showText(msg, type);
}

// 信息类型判断
function checkInfoType(type) {
    if (type === 'success') {
        return '<i class="fas fa-check-circle"></i>';
    } else if (type === 'info') {
        return '<i class="fas fa-info-circle"></i>';
    } else if (type === 'question') {
        return '<i class="fas fa-question-circle"></i>';
    } else if (type === 'warning') {
        return '<i class="fas fa-exclamation-circle"></i>';
    } else if (type === 'error') {
        return '<i class="fas fa-times-circle"></i>';
    } else {
        return '';
    }
}

// 警告框
function alertMsg(msg, type) {
    var alertDialog = $('<div class="dialog-box"></div>').kendoDialog({
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        closable: false,
        maxWidth: '30%',
        maxHeight: '30%',
        minWidth: 320,
        minHeight: 196,
        title: '信息',
        content: checkInfoType(type) + msg,
        actions: [
            {
                text: '确定',
                primary: true,
                action: function(e) {
                    alertDialog.close();
                }
            }
        ],
        close: function() {
            alertDialog.destroy();
        }
    }).data('kendoDialog');
    alertDialog.open();
}

// 警告框小按钮
function alertMsgBtn(msg, type) {
    var alertWindow = $('<div class="dialog-box"></div>').kendoWindow({
        actions: [],
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        maxWidth: '30%',
        maxHeight: '30%',
        minWidth: 320,
        minHeight: 196,
        title: '信息',
        modal: true,
        pinned: true,
        resizable: false,
        close: function() {
            alertWindow.destroy();
        }
    }).data('kendoWindow');
    alertWindow.content(checkInfoType(type) + msg + '<div class="k-window-buttongroup"><button class="k-button k-button-lg k-state-selected" type="button">确 定</button></div>').center().open();
    $('.dialog-box .k-window-buttongroup .k-button').click(function() {
        alertWindow.close();
    });
}

// 警告框无按钮
function alertMsgNoBtn(msg, type) {
    var alertDialog = $('<div class="dialog-box"></div>').kendoDialog({
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        maxWidth: '30%',
        maxHeight: '30%',
        minWidth: 320,
        minHeight: 160,
        title: '信息',
        content: checkInfoType(type) + msg,
        open: function() {
            setTimeout(function(){
                alertDialog.close();
            }, 2000);
        },
        close: function() {
            alertDialog.destroy();
        }
    }).data('kendoDialog');
    alertDialog.open();
}

// 确认框
function confirmMsg(title, msg, type, func, postType, postData, postUrl, succeed, failed, isMsg) {
    var confirmDialog = $('<div class="dialog-box"></div>').kendoDialog({
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        closable: false,
        maxWidth: '30%',
        maxHeight: '30%',
        minWidth: 320,
        minHeight: 196,
        title: title,
        content: checkInfoType(type) + msg,
        actions: [
            {
                text: '确定',
                primary: true,
                action: function(e) {
                    if (func === ajaxPost) {
                        func(postType, postData, postUrl, succeed, failed, isMsg);
                    } else {
                        func();
                    }
                }
            },
            {
                text: '取消',
                action: function(e) {
                    confirmDialog.close();
                }
            }
        ],
        close: function() {
            confirmDialog.destroy();
        }
    }).data('kendoDialog');
    confirmDialog.open();
}

// 确认框小按钮
function confirmMsgBtn(title, msg, type, func, postType, postData, postUrl, succeed, failed, isMsg) {
    var confirmWindow = $('<div class="dialog-box"></div>').kendoWindow({
        actions: [],
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        maxWidth: '30%',
        maxHeight: '30%',
        minWidth: 320,
        minHeight: 196,
        title: title,
        modal: true,
        pinned: true,
        resizable: false,
        close: function() {
            confirmWindow.destroy();
        }
    }).data('kendoWindow');
    confirmWindow.content(checkInfoType(type) + msg + '<div class="k-window-buttongroup"><button class="k-button k-button-lg k-state-selected" type="button">确 定</button><button class="k-button k-button-lg" type="button">取 消</button></div>').center().open();
    $('.dialog-box .k-window-buttongroup .k-state-selected').click(function() {
        if (func === ajaxPost) {
            func(postType, postData, postUrl, succeed, failed, isMsg);
        } else {
            func();
        }
    });
    $('.dialog-box .k-window-buttongroup .k-button').click(function() {
        confirmWindow.close();
    });
}

// 弹出层
function divWindow(title, width, height, content) {
    var divWindow = $('<div class="window-box"></div>').kendoWindow({
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        title: title,
        width: width,
        height: height,
        modal: true,
        pinned: true,
        resizable: false,
        close: function() {
            divWindow.destroy();
        }
    }).data('kendoWindow');
    divWindow.content(content).center().open();
}

// 弹出页
function iframeWindow(title, width, height, url) {
    var iframeWindow = $('<div class="iframe-box"></div>').kendoWindow({
        actions: ['Pin', 'Refresh', 'Minimize', 'Maximize', 'Close'],
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        title: title,
        width: width,
        height: height,
        modal: true,
        pinned: true,
        iframe: true,
        content: url,
        close: function() {
            iframeWindow.destroy();
        }
    }).data('kendoWindow');
    iframeWindow.center().open();
}

/* 表单操作 ****************************************************************************/

// 数字型范围
function numericRange(rangeStart,rangeEnd,format,decimals,step,min,max){
    var start = rangeStart.kendoNumericTextBox({
            change: startChange,
            format: format,
            decimals: decimals,
            step: step,
            min: min,
            max: max
        }).data("kendoNumericTextBox"),
        end = rangeEnd.kendoNumericTextBox({
            change: endChange,
            format: format,
            decimals: decimals,
            step: step,
            min: min,
            max: max
        }).data("kendoNumericTextBox");
    start.max(end.value());
    end.min(start.value());
    function startChange(){
        var startNumeric = start.value(),
            endNumeric = end.value();
        if (startNumeric){
            end.min(startNumeric);
        } else if (endNumeric){
            start.max(endNumeric);
        } else {
            start.max(endNumeric);
            end.min(endNumeric);
        }
    }
    function endChange(){
        var endNumeric = end.value(),
            startNumeric = start.value();
        if (endNumeric){
            start.max(endNumeric);
        } else if (startNumeric){
            end.min(startNumeric);
        } else {
            start.max(endNumeric);
            end.min(endNumeric);
        }
    }
}

// 日期型范围
function dateRange(rangeStart,rangeEnd,type){
    if(type=="Year"){
        var start = rangeStart.kendoDatePicker({
                change: startChange,
                start: "decade",
                depth: "decade",
                format: "yyyy",
                footer: "今年：#= kendo.toString(data, 'yyyy年') #"
            }).data("kendoDatePicker"),
            end = rangeEnd.kendoDatePicker({
                change: endChange,
                start: "decade",
                depth: "decade",
                format: "yyyy",
                footer: "今年：#= kendo.toString(data, 'yyyy年') #"
            }).data("kendoDatePicker");
    }else if(type=="Month"){
        var start = rangeStart.kendoDatePicker({
                change: startChange,
                start: "year",
                depth: "year",
                format: "yyyy-MM",
                footer: "当月：#= kendo.toString(data, 'yyyy年MM月') #"
            }).data("kendoDatePicker"),
            end = rangeEnd.kendoDatePicker({
                change: endChange,
                start: "year",
                depth: "year",
                format: "yyyy-MM",
                footer: "当月：#= kendo.toString(data, 'yyyy年MM月') #"
            }).data("kendoDatePicker");
    }else if(type=="Time"){
        var start = rangeStart.kendoTimePicker({
                change: startChange,
                format: "HH:mm"
            }).data("kendoTimePicker"),
            end = rangeEnd.kendoTimePicker({
                change: endChange,
                format: "HH:mm"
            }).data("kendoTimePicker");
    }else if(type=="DateTime"){
        var start = rangeStart.kendoDateTimePicker({
                change: startChange,
                format: "yyyy-MM-dd HH:mm",
                footer: "现在：#= kendo.toString(data, 'yyyy年MM月dd日 HH:mm') #"
            }).data("kendoDateTimePicker"),
            end = rangeEnd.kendoDateTimePicker({
                change: endChange,
                format: "yyyy-MM-dd HH:mm",
                footer: "现在：#= kendo.toString(data, 'yyyy年MM月dd日 HH:mm') #"
            }).data("kendoDateTimePicker");
    }else{
        var start = rangeStart.kendoDatePicker({
                change: startChange,
                format: "yyyy-MM-dd",
                footer: "今天：#= kendo.toString(data, 'yyyy年MM月dd日') #"
            }).data("kendoDatePicker"),
            end = rangeEnd.kendoDatePicker({
                change: endChange,
                format: "yyyy-MM-dd",
                footer: "今天：#= kendo.toString(data, 'yyyy年MM月dd日') #"
            }).data("kendoDatePicker");
    }
    start.max(end.value());
    end.min(start.value());
    function startChange(){
        var startDate = start.value(),
            endDate = end.value();
        if (startDate){
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate){
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }
    function endChange(){
        var endDate = end.value(),
            startDate = start.value();
        if (endDate){
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate){
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }
}

// 日期输入型范围
function dateInputRange(rangeStart,rangeEnd,type){
    if(type=="Year"){
        var start = rangeStart.kendoDateInput({
                change: startChange,
                format: "yyyy"
            }).data("kendoDateInput"),
            end = rangeEnd.kendoDateInput({
                change: endChange,
                format: "yyyy"
            }).data("kendoDateInput");
    }else if(type=="Month"){
        var start = rangeStart.kendoDateInput({
                change: startChange,
                format: "yyyy-MM"
            }).data("kendoDateInput"),
            end = rangeEnd.kendoDateInput({
                change: endChange,
                format: "yyyy-MM"
            }).data("kendoDateInput");
    }else if(type=="Time"){
        var start = rangeStart.kendoDateInput({
                change: startChange,
                format: "HH:mm:ss"
            }).data("kendoDateInput"),
            end = rangeEnd.kendoDateInput({
                change: endChange,
                format: "HH:mm:ss"
            }).data("kendoDateInput");
    }else if(type=="DateTime"){
        var start = rangeStart.kendoDateInput({
                change: startChange,
                format: "yyyy-MM-dd HH:mm"
            }).data("kendoDateInput"),
            end = rangeEnd.kendoDateInput({
                change: endChange,
                format: "yyyy-MM-dd HH:mm"
            }).data("kendoDateInput");
    }else{
        var start = rangeStart.kendoDateInput({
                change: startChange,
                format: "yyyy-MM-dd"
            }).data("kendoDateInput"),
            end = rangeEnd.kendoDateInput({
                change: endChange,
                format: "yyyy-MM-dd"
            }).data("kendoDateInput");
    }
    start.max(end.value());
    end.min(start.value());
    function startChange(){
        var startDate = start.value(),
            endDate = end.value();
        if (startDate){
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate){
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }
    function endChange(){
        var endDate = end.value(),
            startDate = start.value();
        if (endDate){
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate){
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }
}

// 表单序列化 Json 对象
$.fn.serializeObject = function (){
    "use strict";
    var result = {};
    var extend = function (i, element){
        var node = result[element.name];
        if ('undefined' !== typeof node && node !== null){
            if ($.isArray(node)){
                node.push(element.value);
            } else {
                result[element.name] = [node, element.value];
            }
        } else {
            result[element.name] = element.value;
        }
    };
    $.each(this.serializeArray(), extend);
    return result;
};