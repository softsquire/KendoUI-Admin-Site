/*!
 * Kendo UI Admin v1.0.0 by IKKI & Amikoko - https://ikki2000.github.io/
 * Copyright 2018 IKKI Studio
 * Released under the MIT License - https://ikki2000.github.io/KendoUI-Admin-Site/LICENSE
 */

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