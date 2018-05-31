$(function(){
    // 提示
    noticeMsg('地理数据量大~ 载入中……', 'info', 'center', noFunc);
    // 地图点选
    $('#inputBoxMapBtn').click(function() {
        var divWindow = $('<div class="window-map"></div>').kendoWindow({
            actions: ['Minimize', 'Maximize', 'Close'],
            animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
            title: '地图点选',
            width: '80%',
            height: '40%',
            modal: true,
            pinned: true,
            activate: function() {
                $('#inputMap').kendoMap({
                    center: [51.51515, -0.126500],
                    minZoom: 2,
                    maxZoom: 6,
                    zoom: 2,
                    layerDefaults: {
                        shape: {
                            style: {
                                fill: {
                                    color: '#69c0ff',
                                    opacity: .8
                                },
                                stroke: {
                                    color: '#000000',
                                    dashType: 'dash'
                                }
                            }
                        }
                    },
                    layers: [
                        {
                            type: 'shape',
                            dataSource: {
                                type: 'geojson',
                                transport: {
                                    read: path + 'json/geo/world.json'
                                }
                            },
                            maxZoom: 4
                        },
                        {
                            type: 'shape',
                            dataSource: {
                                type: 'geojson',
                                transport: {
                                    read: path + 'json/geo/china.json'
                                }
                            },
                            minZoom: 5
                        }
                    ],
                    shapeFeatureCreated: function(e) {
                        if ($('#inputBoxMap').val() === e.dataItem.properties.name) {
                            $.each(e.group.children, function(i, items) {
                                items.options.set('fill.color', '#1890ff');
                            });
                        }
                        e.group.options.tooltip = {
                            content: e.properties.name,
                            position: 'cursor'
                        };
                    },
                    shapeMouseEnter: function(e) {
                        e.shape.options.set('fill.opacity', .5);
                    },
                    shapeMouseLeave: function(e) {
                        e.shape.options.set('fill.opacity', .8);
                    },
                    shapeClick: function(e) {
                        $('#inputBoxMap').val(e.shape.dataItem.properties.name);
                        e.layer.reset();
                        setTimeout(function(){
                            divWindow.close();
                        }, 1000);
                    }
                });
            },
            close: function() {
                divWindow.destroy();
            }
        }).data('kendoWindow');
        divWindow.content('<div class="position-absolute w-100 h-100" id="inputMap"></div>').center().open();
    });
    // 地图选择
    $('#textBoxMapBtn').click(function() {
        var divWindow = $('<div class="window-map"></div>').kendoWindow({
            actions: ['Minimize', 'Maximize', 'Close'],
            animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
            title: '地图选择',
            width: '80%',
            height: '40%',
            modal: true,
            pinned: true,
            activate: function() {
                var tMap = $('#textMap').kendoMap({
                    center: [36.320666, 108.815888],
                    minZoom: 4,
                    maxZoom: 9,
                    zoom: 4,
                    layerDefaults: {
                        shape: {
                            style: {
                                fill: {
                                    color: '#69c0ff',
                                    opacity: .8
                                },
                                stroke: {
                                    color: '#000000',
                                    dashType: 'dash'
                                }
                            }
                        }
                    },
                    layers: [
                        {
                            type: 'tile',
                            // Google Map
                            urlTemplate: 'http://mt#= subdomain #.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x=#= x #&y=#= y #&z=#= zoom #',
                            subdomains: ['0', '1', '2', '3'],
                            attribution: '&copy; Google Map',
                            opacity: 1
                        },
                        {
                            type: 'shape',
                            dataSource: {
                                type: 'geojson',
                                transport: {
                                    read: path + 'json/geo/china.json'
                                }
                            },
                            minZoom: 4,
                            maxZoom: 5
                        },
                        {
                            type: 'shape',
                            dataSource: {
                                type: 'geojson',
                                transport: {
                                    read: path + 'json/geo/province.json'
                                }
                            },
                            minZoom: 6,
                            opacity: .8
                        },
                        {
                            type: 'shape',
                            minZoom: 6
                        }
                    ],
                    shapeFeatureCreated: function(e) {
                        $.each($('#textBoxMap').val().split(','), function(i, contents) {
                            if (contents === e.dataItem.properties.name + '[' + e.dataItem.properties.id + ']' || contents === e.dataItem.properties.name + '[' + e.dataItem.id + ']') {
                                $.each(e.group.children, function(k, items) {
                                    items.options.set('fill.color', '#1890ff');
                                });
                            }
                        });
                        e.group.options.tooltip = {
                            content: e.properties.name,
                            position: 'cursor'
                        };
                    },
                    shapeMouseEnter: function(e) {
                        e.shape.options.set('fill.opacity', .5);
                    },
                    shapeMouseLeave: function(e) {
                        e.shape.options.set('fill.opacity', .8);
                    },
                    shapeClick: function(e) {
                        if (e.shape.dataItem.properties.id) {
                            var confirmDialog = $('<div class="dialog-box"></div>').kendoDialog({
                                animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
                                minWidth: 320,
                                minHeight: 196,
                                title: '是否选择',
                                content: '<i class="fas fa-question-circle"></i>是否选择当前层级？',
                                actions: [
                                    {
                                        text: '选择当前层级',
                                        primary: true,
                                        action: function() {
                                            e.shape.options.set('fill.color', '#1890ff');
                                            var str = e.shape.dataItem.properties.name + '[' + e.shape.dataItem.properties.id + ']',
                                                none = true;
                                            if ($('#textBoxMap').val() === '') {
                                                $('#textBoxMap').val(str);
                                            } else {
                                                $.each($('#textBoxMap').val().split(','), function(i, items) {
                                                    if (items === str) {
                                                        none = false;
                                                    }
                                                });
                                                if (none) {
                                                    $('#textBoxMap').val($('#textBoxMap').val() + ',' + str);
                                                }
                                            }
                                        }
                                    },
                                    {
                                        text: '进入下一层级',
                                        action: function() {
                                            tMap.layers[3].setDataSource({
                                                type: 'geojson',
                                                transport: {
                                                    read: path + 'json/geo/' + e.shape.dataItem.properties.id + '.json'
                                                }
                                            });
                                            tMap.setOptions({
                                                center: [e.shape.dataItem.properties.latitude, e.shape.dataItem.properties.longitude],
                                                zoom: 6
                                            });
                                        }
                                    }
                                ],
                                close: function() {
                                    confirmDialog.destroy();
                                }
                            }).data('kendoDialog');
                            confirmDialog.open();
                        } else {
                            e.shape.options.set('fill.color', '#1890ff');
                            var str = e.shape.dataItem.properties.name + '[' + e.shape.dataItem.id + ']',
                                none = true;
                            if ($('#textBoxMap').val() === '') {
                                $('#textBoxMap').val(str);
                            } else {
                                $.each($('#textBoxMap').val().split(','), function(i, items) {
                                    if (items === str) {
                                        none = false;
                                    }
                                });
                                if (none) {
                                    $('#textBoxMap').val($('#textBoxMap').val() + ',' + str);
                                }
                            }
                        }
                    }
                }).data('kendoMap');
            },
            close: function() {
                divWindow.destroy();
            }
        }).data('kendoWindow');
        divWindow.content('<div class="position-absolute w-100 h-100" id="textMap"></div>').center().open();
    });
    // 地图单选
    var comboMap = $('#comboBoxMap').kendoComboBox({
        dataSource: {
            transport: {
                read: {
                    url: 'json/select_data.json',
                    dataType: 'json'
                }
            }
        },
        placeholder: '-= 请点击右侧按钮打开地图 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        suggest: true
    }).data('kendoComboBox');
    $('#comboBoxMapBtn').kendoButton({
        icon: 'globe-outline',
        click: function(e) {
            var divWindow = $('<div class="window-map"></div>').kendoWindow({
                actions: ['Minimize', 'Maximize', 'Close'],
                animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
                title: '地图单选',
                width: '80%',
                height: '40%',
                modal: true,
                pinned: true,
                activate: function() {
                    var sMap = $('#singleMap').kendoMap({
                        center: [36.320666, 108.815888],
                        minZoom: 4,
                        maxZoom: 9,
                        zoom: 4,
                        layerDefaults: {
                            shape: {
                                style: {
                                    fill: {
                                        color: '#69c0ff',
                                        opacity: .8
                                    },
                                    stroke: {
                                        color: '#000000',
                                        dashType: 'dash'
                                    }
                                }
                            }
                        },
                        layers: [
                            {
                                type: 'tile',
                                // 高德地图
                                urlTemplate: 'http://wprd0#= subdomain #.is.autonavi.com/appmaptile?x=#= x #&y=#= y #&z=#= zoom #&lang=zh_cn&size=1&scl=1&style=7',
                                subdomains: ['1', '2', '3', '4'],
                                attribution: '&copy; 高德地图',
                                opacity: 1
                            },
                            {
                                type: 'shape',
                                dataSource: {
                                    type: 'geojson',
                                    transport: {
                                        read: path + 'json/geo/china.json'
                                    }
                                },
                                minZoom: 4,
                                maxZoom: 5
                            },
                            {
                                type: 'shape',
                                dataSource: {
                                    type: 'geojson',
                                    transport: {
                                        read: path + 'json/geo/province.json'
                                    }
                                },
                                minZoom: 6,
                                opacity: .8
                            },
                            {
                                type: 'shape',
                                minZoom: 6
                            }
                        ],
                        shapeFeatureCreated: function(e) {
                            if (comboMap.value() === e.dataItem.properties.id || comboMap.value() === e.dataItem.id) {
                                $.each(e.group.children, function(i, items) {
                                    items.options.set('fill.color', '#1890ff');
                                });
                            }
                            e.group.options.tooltip = {
                                content: e.properties.name,
                                position: 'cursor'
                            };
                        },
                        shapeMouseEnter: function(e) {
                            e.shape.options.set('fill.opacity', .5);
                        },
                        shapeMouseLeave: function(e) {
                            e.shape.options.set('fill.opacity', .8);
                        },
                        shapeClick: function(e) {
                            if (e.shape.dataItem.properties.id) {
                                var confirmDialog = $('<div class="dialog-box"></div>').kendoDialog({
                                    animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
                                    minWidth: 320,
                                    minHeight: 196,
                                    title: '是否选择',
                                    content: '<i class="fas fa-question-circle"></i>是否选择当前层级？',
                                    actions: [
                                        {
                                            text: '选择当前层级',
                                            primary: true,
                                            action: function() {
                                                comboMap.value(e.shape.dataItem.properties.id);
                                                e.layer.reset();
                                            }
                                        },
                                        {
                                            text: '进入下一层级',
                                            action: function() {
                                                sMap.layers[3].setDataSource({
                                                    type: 'geojson',
                                                    transport: {
                                                        read: path + 'json/geo/' + e.shape.dataItem.properties.id + '.json'
                                                    }
                                                });
                                                sMap.setOptions({
                                                    center: [e.shape.dataItem.properties.latitude, e.shape.dataItem.properties.longitude],
                                                    zoom: 6
                                                });
                                            }
                                        }
                                    ],
                                    close: function() {
                                        confirmDialog.destroy();
                                    }
                                }).data('kendoDialog');
                                confirmDialog.open();
                            } else {
                                comboMap.value(e.shape.dataItem.id);
                                e.layer.reset();
                            }
                        }
                    }).data('kendoMap');
                },
                close: function() {
                    divWindow.destroy();
                }
            }).data('kendoWindow');
            divWindow.content('<div class="position-absolute w-100 h-100" id="singleMap"></div>').center().open();
        }
    });
    // 地图多选
    var treeMap = $('#dropDownTreeMap').kendoDropDownTree({
        dataSource: {
            transport: {
                read: {
                    url: 'json/select_hierarchical_data.json',
                    dataType: 'json'
                }
            },
            schema: {
                model: {
                    children: 'items'
                }
            }
        },
        placeholder: '-= 请点击右侧按钮打开地图 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        checkboxes: true,
        filter: 'contains'
    }).data('kendoDropDownTree');
    $('#dropDownTreeMapBtn').kendoButton({
        icon: 'globe-outline',
        click: function(e) {
            var divWindow = $('<div class="window-map"></div>').kendoWindow({
                actions: ['Minimize', 'Maximize', 'Close'],
                animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
                title: '地图多选',
                width: '80%',
                height: '40%',
                modal: true,
                pinned: true,
                activate: function() {
                    var mMap = $('#multiMap').kendoMap({
                        center: [36.320666, 108.815888],
                        minZoom: 4,
                        maxZoom: 9,
                        zoom: 4,
                        layerDefaults: {
                            shape: {
                                style: {
                                    fill: {
                                        color: '#69c0ff',
                                        opacity: .8
                                    },
                                    stroke: {
                                        color: '#000000',
                                        dashType: 'dash'
                                    }
                                }
                            }
                        },
                        layers: [
                            {
                                type: 'tile',
                                // 高德地图
                                urlTemplate: 'http://wprd0#= subdomain #.is.autonavi.com/appmaptile?x=#= x #&y=#= y #&z=#= zoom #&lang=zh_cn&size=1&scl=1&style=7',
                                subdomains: ['1', '2', '3', '4'],
                                attribution: '&copy; 高德地图',
                                opacity: 1
                            },
                            {
                                type: 'shape',
                                dataSource: {
                                    type: 'geojson',
                                    transport: {
                                        read: path + 'json/geo/china.json'
                                    }
                                },
                                minZoom: 4,
                                maxZoom: 5
                            },
                            {
                                type: 'shape',
                                dataSource: {
                                    type: 'geojson',
                                    transport: {
                                        read: path + 'json/geo/province.json'
                                    }
                                },
                                minZoom: 6,
                                opacity: .8
                            },
                            {
                                type: 'shape',
                                minZoom: 6
                            }
                        ],
                        shapeFeatureCreated: function(e) {
                            $.each(treeMap.value(), function(i, contents) {
                                if (contents === e.dataItem.properties.id || contents === e.dataItem.id) {
                                    $.each(e.group.children, function(k, items) {
                                        items.options.set('fill.color', '#1890ff');
                                    });
                                }
                            });
                            e.group.options.tooltip = {
                                content: e.properties.name,
                                position: 'cursor'
                            };
                        },
                        shapeMouseEnter: function(e) {
                            e.shape.options.set('fill.opacity', .5);
                        },
                        shapeMouseLeave: function(e) {
                            e.shape.options.set('fill.opacity', .8);
                        },
                        shapeClick: function(e) {
                            var arr = treeMap.value(),
                                none = true;
                            if (e.shape.dataItem.properties.id) {
                                var confirmDialog = $('<div class="dialog-box"></div>').kendoDialog({
                                    animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
                                    minWidth: 320,
                                    minHeight: 196,
                                    title: '是否选择',
                                    content: '<i class="fas fa-question-circle"></i>是否选择当前层级？',
                                    actions: [
                                        {
                                            text: '选择当前层级',
                                            primary: true,
                                            action: function() {
                                                e.shape.options.set('fill.color', '#1890ff');
                                                $.each(treeMap.value(), function(i, items) {
                                                    if (items === e.shape.dataItem.properties.id) {
                                                        none = false;
                                                    }
                                                });
                                                if (none) {
                                                    arr.push(e.shape.dataItem.properties.id);
                                                    treeMap.value(arr);
                                                }
                                            }
                                        },
                                        {
                                            text: '进入下一层级',
                                            action: function() {
                                                mMap.layers[3].setDataSource({
                                                    type: 'geojson',
                                                    transport: {
                                                        read: path + 'json/geo/' + e.shape.dataItem.properties.id + '.json'
                                                    }
                                                });
                                                mMap.setOptions({
                                                    center: [e.shape.dataItem.properties.latitude, e.shape.dataItem.properties.longitude],
                                                    zoom: 6
                                                });
                                            }
                                        }
                                    ],
                                    close: function() {
                                        confirmDialog.destroy();
                                    }
                                }).data('kendoDialog');
                                confirmDialog.open();
                            } else {
                                e.shape.options.set('fill.color', '#1890ff');
                                $.each(treeMap.value(), function(i, items) {
                                    if (items === e.shape.dataItem.id) {
                                        none = false;
                                    }
                                });
                                if (none) {
                                    arr.push(e.shape.dataItem.id);
                                    treeMap.value(arr);
                                }
                            }
                        }
                    }).data('kendoMap');
                },
                close: function() {
                    divWindow.destroy();
                }
            }).data('kendoWindow');
            divWindow.content('<div class="position-absolute w-100 h-100" id="multiMap"></div>').center().open();
        }
    });
});