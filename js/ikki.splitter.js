/* JS for Splitter | Written by IKKI | 2018-02-03 */

// 框架布局
$(function() {
    $('#body').kendoSplitter({
        orientation: 'vertical',
        panes: [
            {
                collapsible: true,
                resizable: false,
                scrollable: false,
                size: '60px'
            }
        ]
    });
    $('#main').kendoSplitter({
        panes: [
            {
                collapsible: true,
                resizable: false,
                size: '200px'
            }
        ]
    });
});