$(function(){
    // 提示
    noticeMsg('地理数据量大~ 载入中……', 'info', 'center', noFunc);
    // 自动完成框分组
    $('#autoCompleteGroup').kendoAutoComplete({
        dataSource: {
            transport: {
                read: {
                    url: 'json/cities.json',
                    dataType: 'json'
                }
            },
            group: {
                field: 'provinceName'
            }
        },
        placeholder: '-= 请输入 =-',
        dataTextField: 'name',
        height: 500,
        suggest: true,
        separator: ' '
    });
    // 单选下拉框分组
    $('#dropDownListGroup').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/cities.json',
                    dataType: 'json'
                }
            },
            group: {
                field: 'provinceName'
            }
        },
        optionLabel: '-= 请选择 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        height: 500
    });
    // 输入下拉框分组
    $('#comboBoxGroup').kendoComboBox({
        dataSource: {
            transport: {
                read: {
                    url: 'json/cities.json',
                    dataType: 'json'
                }
            },
            group: {
                field: 'provinceName'
            }
        },
        placeholder: '-= 请输入 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        height: 500,
        suggest: true
    });
    // 多选下拉框分组
    $('#multiSelectGroup').kendoMultiSelect({
        dataSource: {
            transport: {
                read: {
                    url: 'json/cities.json',
                    dataType: 'json'
                }
            },
            group: {
                field: 'provinceName'
            }
        },
        placeholder: '-= 请选择 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        height: 500,
        autoClose: false
    });
    // 树形下拉框多选
    $('#dropDownTreeMulti').kendoDropDownTree({
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
        placeholder: '-= 请选择 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        checkboxes: {
            checkChildren: true
        },
        checkAll: true,
        checkAllTemplate: '全选',
        autoClose: false
    });
    // 省市县乡村五级联动
    $('#province').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/provinces.json',
                    dataType: 'json'
                }
            }
        },
        optionLabel: '-= 省份 =-',
        dataValueField: 'code',
        dataTextField: 'name'
    });
    $('#city').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/cities.json',
                    dataType: 'json'
                }
            }
        },
        autoBind: false,
        cascadeFrom: 'province',
        cascadeFromField: 'provinceCode',
        optionLabel: '-= 城市 =-',
        dataValueField: 'code',
        dataTextField: 'name'
    });
    $('#area').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/areas.json',
                    dataType: 'json'
                }
            }
        },
        autoBind: false,
        cascadeFrom: 'city',
        cascadeFromField: 'cityCode',
        optionLabel: '-= 区县 =-',
        dataValueField: 'code',
        dataTextField: 'name'
    });
    $('#street').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/streets.json',
                    dataType: 'json'
                }
            }
        },
        autoBind: false,
        cascadeFrom: 'area',
        cascadeFromField: 'areaCode',
        optionLabel: '-= 乡镇 =-',
        dataValueField: 'code',
        dataTextField: 'name'
    });
    $('#village').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/villages.json',
                    dataType: 'json'
                }
            }
        },
        autoBind: false,
        cascadeFrom: 'street',
        cascadeFromField: 'streetCode',
        optionLabel: '-= 村庄 =-',
        dataValueField: 'code',
        dataTextField: 'name'
    });
    // 省市区三级联动
    $('#province2').kendoComboBox({
        dataSource: {
            transport: {
                read: {
                    url: 'json/provinces.json',
                    dataType: 'json'
                }
            }
        },
        placeholder: '-= 省份 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        filter: 'contains'
    });
    $('#city2').kendoComboBox({
        dataSource: {
            transport: {
                read: {
                    url: 'json/cities.json',
                    dataType: 'json'
                }
            }
        },
        autoBind: false,
        cascadeFrom: 'province2',
        cascadeFromField: 'provinceCode',
        placeholder: '-= 城市 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        filter: 'contains'
    });
    $('#area2').kendoComboBox({
        dataSource: {
            transport: {
                read: {
                    url: 'json/areas.json',
                    dataType: 'json'
                }
            }
        },
        autoBind: false,
        cascadeFrom: 'city2',
        cascadeFromField: 'cityCode',
        placeholder: '-= 区县 =-',
        dataValueField: 'code',
        dataTextField: 'name',
        filter: 'contains'
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
            resizable: false,
            activate: function() {
                var iMap = $('#inputMap').kendoMap({
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
                                            iMap.layers[3].setDataSource({
                                                type: 'geojson',
                                                transport: {
                                                    read: path + 'json/geo/' + e.shape.dataItem.properties.id + '.json'
                                                }
                                            });
                                            iMap.setOptions({
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
        divWindow.content('<div class="position-absolute w-100 h-100" id="inputMap"></div>').center().open();
    });
});