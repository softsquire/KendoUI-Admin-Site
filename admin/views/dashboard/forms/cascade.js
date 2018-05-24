$(function(){
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
});