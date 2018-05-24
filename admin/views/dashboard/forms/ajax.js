$(function(){
    // 年龄
    $('#age').kendoNumericTextBox({
        format: 'n0',
        decimals: 0,
        min: 1,
        max: 100
    });
    // 身高
    $('#height').kendoNumericTextBox({
        format: '0.00 m',
        decimals: 2,
        step: 0.01,
        min: 0.30,
        max: 3.00
    });
    // 血型
    $('#bloodType').kendoDropDownList();
    // 生日
    $('#birthday').kendoDatePicker({
        format: 'yyyy-MM-dd',
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日") #',
        min: new Date(1920, 0, 1),
        max: new Date()
    });
    // 配偶生日
    $('#mateBirthday').kendoDateInput({
        format: 'yyyy-MM-dd',
        min: new Date(1920, 0, 1),
        max: new Date()
    });
    // 银行卡
    $('#creditCard').kendoMaskedTextBox({
        mask: '0000 0000 0000 0000'
    });
    // 资产
    $('#asset').kendoNumericTextBox({
        format: 'c',
        decimals: 2,
        step: 10000
    });
    // 籍贯
    $('#province').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/province.json',
                    dataType: 'json'
                }
            }
        },
        optionLabel: '-= 省份 =-',
        dataValueField: 'province',
        dataTextField: 'provinceName'
    });
    $('#city').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/city.json',
                    dataType: 'json'
                }
            }
        },
        autoBind: false,
        cascadeFrom: 'province',
        optionLabel: '-= 城市 =-',
        dataValueField: 'city',
        dataTextField: 'cityName'
    });
    $('#area').kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: 'json/area.json',
                    dataType: 'json'
                }
            }
        },
        autoBind: false,
        cascadeFrom: 'city',
        optionLabel: '-= 区县 =-',
        dataValueField: 'area',
        dataTextField: 'areaName'
    });
    // 居住地
    $('#domicile').kendoDropDownTree({
        placeholder: '树形下拉框',
        dataSource: {
            transport: {
                read: {
                    url: 'json/domicile.json',
                    dataType: 'json'
                }
            },
            schema: {
                model: {
                    children: 'items'
                }
            }
        },
        dataValueField: 'code',
        dataTextField: 'name'
    });
    // 民族
    $('#nation').kendoComboBox({
        dataSource: {
            transport: {
                read: {
                    url: 'json/nation.json',
                    dataType: 'json'
                }
            }
        },
        dataValueField: 'nation',
        dataTextField: 'nationName',
        minLength: 1,
        delay: 100,
        suggest: true
    });
    // 语言
    $('#language').kendoAutoComplete({
        dataSource: {
            transport: {
                read: {
                    url: 'json/language.json',
                    dataType: 'json'
                }
            }
        },
        dataTextField: 'language',
        delay: 100,
        suggest: true,
        separator: ' '
    });
    // 毕业年份
    $('#graduation').kendoDatePicker({
        start: 'decade',
        depth: 'decade',
        format: 'yyyy',
        footer: '今年：#= kendo.toString(data, "yyyy年") #'
    });
    // 参加工作年月
    $('#firstJob').kendoDatePicker({
        start: 'year',
        depth: 'year',
        format: 'yyyy-MM',
        footer: '当月：#= kendo.toString(data, "yyyy年MM月") #'
    });
    // 起床时间
    $('#getUp').kendoTimePicker({
        format: 'HH:mm'
    });
    // 最有意义的时刻
    $('#importantMoment').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        footer: '现在：#= kendo.toString(data, "yyyy年MM月dd日 HH:mm") #'
    });
    // 性格
    $('#character').kendoSlider({
        decreaseButtonTitle: '内向',
        increaseButtonTitle: '开朗',
        min: -10,
        max: 10,
        smallStep: 2,
        largeStep: 1,
        tooltip: {
            template: '# if(value==10){ #超级开朗# }else if(value==8){ #非常开朗# }else if(value==6){ #很开朗# }else if(value==4){ #比较开朗# }else if(value==2){ #有点开朗# }else if(value==-2){ #有点内向# }else if(value==-4){ #比较内向# }else if(value==-6){ #很内向# }else if(value==-8){ #非常内向# }else if(value==-10){ #超级内向# }else{ #普通# } #'
        }
    });
    // 颜色喜好
    $('#color').kendoColorPicker({
        opacity: true,
        buttons: false
    });
    // 感兴趣的星座
    $('#constellation').kendoMultiSelect({
        placeholder: '多选下拉框',
        autoClose: false
    });
    // 头像
    $('#photo').kendoUpload({
        async: {
            saveUrl: 'json/upload.json',
            removeUrl: 'json/upload.json'
        },
        multiple: false,
        files: [
            {
                name: 'Virgo.png',
                size: 34011,
                extension: '.png'
            },
        ],
        validation: {
            allowedExtensions: ['.jpg', '.png', '.gif', '.bmp'],
            maxFileSize: 10000000
        },
        success: function(e) {
            if (e.response.result === 'y') {
                if (e.operation === 'upload') {
                    $('[name=photoUrl]').val(e.response.photoUrl).parent().find('img').attr('src', e.response.photoUrl);
                    alertMsg(e.response.msg, 'success');
                }
                if (e.operation === 'remove') {
                    $('[name=photoUrl]').val('').parent().find('img').attr('src', 'img/avatar.png');
                }
            } else {
                $(".k-upload-files").remove();
                alertMsg(e.response.msg, 'error');
            }
        }
    });
    // 签名
    $('#sign').kendoEditor({
        tools: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'fontName',
            'fontSize',
            'foreColor',
            'backColor',
            'justifyLeft',
            'justifyCenter',
            'justifyRight',
            'justifyFull',
            'insertUnorderedList',
            'insertOrderedList',
            'indent',
            'outdent',
            'createLink',
            'unlink',
            'insertImage',
            'insertFile',
            'tableWizard',
            'createTable',
            'addColumnLeft',
            'addColumnRight',
            'addRowAbove',
            'addRowBelow',
            'deleteRow',
            'deleteColumn',
            'formatting',
            'cleanFormatting',
            'insertHtml',
            'viewHtml',
            'print',
            'pdf'
        ]
    });
    // 同意条款
    $('#agree').kendoMobileSwitch({
        onLabel: '',
        offLabel: '',
        checked: true
    });
    // 表单验证
    var validator = $('form').kendoValidator({
        rules: {
            // 昵称
            nickName: function(input) {
                if (!input.is('[name=nickName]')) {
                    return true;
                }
                input.next().show();
                var unique = true;
                $.ajax({
                    async: false,
                    type: 'get',
                    // type: 'post',
                    data: {
                        'nickName': input.val()
                    },
                    url: 'json/nick_name.json',
                    dataType: 'json',
                    success: function(res) {
                        input.next().hide();
                        if (res.result === 'y') {
                            unique = true;
                        } else {
                            unique = false;
                        }
                    }
                });
                return unique;
            },
            // 匹配密码
            matchPassword: function(input) {
                if (!input.is('[name=confirmPassword]')) {
                    return true;
                }
                return (input.val() === $('[name=password]').val());
            },
            // 性别
            sex: function(input) {
                if (!input.is('[name=sex]')) {
                    return true;
                }
                return $('[name=sex]').is(':checked');
            },
            // 生日
            birthday: function(input) {
                if (!input.is('[name=birthday]')) {
                    return true;
                }
                return kendo.parseDate(input.val(), 'yyyy-MM-dd') instanceof Date;
            },
            // 配偶生日
            mateBirthday: function(input) {
                if (!input.is('[name=mateBirthday]')) {
                    return true;
                }
                return kendo.parseDate(input.val(), 'yyyy-MM-dd') instanceof Date;
            },
            // 民族
            nation: function(input) {
                if (!input.is('[name=nation_input]')) {
                    return true;
                }
                return input.val() === '' || input.val().match(/^[\u4E00-\u9FA5]+$/) !== null;
            },
            // 教育程度
            education: function(input) {
                if (!input.is('[name=education]')) {
                    return true;
                }
                return $('[name=education]').is(':checked');
            },
            // 毕业年份
            graduation: function(input) {
                if (!input.is('[name=graduation]')) {
                    return true;
                }
                return kendo.parseDate(input.val(), 'yyyy') instanceof Date;
            },
            // 参加工作年月
            firstJob: function(input) {
                if (!input.is('[name=firstJob]')) {
                    return true;
                }
                return kendo.parseDate(input.val(), 'yyyy-MM') instanceof Date;
            },
            // 起床时间
            getUp: function(input) {
                if (!input.is('[name=getUp]')) {
                    return true;
                }
                return kendo.parseDate(input.val(), 'HH:mm') instanceof Date;
            },
            // 最有意义的时刻
            importantMoment: function(input) {
                if (!input.is('[name=importantMoment]')) {
                    return true;
                }
                return kendo.parseDate(input.val(), 'yyyy-MM-dd HH:mm') instanceof Date;
            },
            // 头像
            photo: function(input) {
                if (!input.is('[name=photoUrl]')) {
                    return true;
                }
                return $('[name=photoUrl]').val() !== '';
            }
        },
        messages: {
            nickName: "此昵称已存在，请重新输入！",
            matchPassword: '两次输入的密码不一致！',
            sex: '请选择性别！',
            birthday: '日期格式不正确！',
            mateBirthday: '日期格式不正确！',
            nation: '请输入汉字！',
            education: '请选择教育程度！',
            graduation: '年份格式不正确！',
            firstJob: '月份格式不正确！',
            getUp: '时间格式不正确！',
            importantMoment: '日期时间格式不正确！',
            photo: '请上传头像！'
        }
    }).data('kendoValidator');
    // 表单提交
    $('#submitBtn').click(function() {
        if (validator.validate()) {
            $(this).addClass('k-state-disabled').removeClass('k-state-selected').prop('disabled', true).next().remove();
            noticeMsg('表单校验中，准备提交……', 'success', 'center', formSubmit);
        } else {
            noticeMsg('表单中有选项未填写正确！请检查……', 'error', 'center', focusError);
        }
    });
});

// 出错定位
function focusError() {
    $('.k-invalid-msg:visible').first().parents('.form-group').focus();
}

// 提交
function formSubmit() {
    $('#loading').show();
    ajaxPost('get', $('form').serialize(), 'json/response.json', ajaxSucceed, ajaxFailed, true);
    // ajaxPost('post', $('form').serialize(), 'json/response.json', ajaxSucceed, ajaxFailed, true);
}

// 提交成功
function ajaxSucceed() {
    $('#loading').hide();
}

// 提交失败
function ajaxFailed() {
    $('#loading').hide();
    $('#submitBtn').addClass('k-state-selected').removeClass('k-state-disabled').prop('disabled', false);
}