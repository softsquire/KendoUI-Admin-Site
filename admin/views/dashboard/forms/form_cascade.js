$(function() {
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
});