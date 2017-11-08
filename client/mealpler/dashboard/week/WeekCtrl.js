Mealpler.controller('WeekCtrl', function (WeekModel, $scope) {
    const datePicker = $('input[name="daterange"]');
    let week = this;
    week.days = WeekModel.weekDays();
    //settings for Date Range Picker
    datePicker.daterangepicker({
        "dateLimit": {
            "days": 7
        },
        "startDate": new Date()
    }, function(start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
    datePicker.on('apply.daterangepicker', function (e, picker) {
        const startDate = picker.startDate._d.getDay();
        week.viewDate = new Date(startDate);
    });
});