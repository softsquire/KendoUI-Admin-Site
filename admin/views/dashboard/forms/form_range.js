$(function() {
    // 数字范围
    numericRange($('#ageStart'), $('#ageEnd'), 'n0', 0, 1, 1, 100);
    // 小数单位数字范围
    numericRange($('#heightStart'), $('#heightEnd'), '0.00 m', 2, 0.01, 0.30, 3.00);
    // 金融数字范围
    numericRange($('#assetStart'), $('#assetEnd'), 'c', 2, 10000, 0, 10000000000);
    // 日期范围
    dateRange($('#birthdayStart'), $('#birthdayEnd'), 'Date');
    // 日期时间掩码范围
    dateInputRange($('#mateBirthdayStart'), $('#mateBirthdayEnd'), 'Date');
    // 年份范围
    dateRange($('#graduationStart'), $('#graduationEnd'), 'Year');
    // 月份范围
    dateRange($('#firstJobStart'), $('#firstJobEnd'), 'Month');
    // 时间范围
    dateRange($('#getUpStart'), $('#getUpEnd'), 'Time');
    // 日期时间范围
    dateRange($('#importantMomentStart'), $('#importantMomentEnd'), 'DateTime');
});