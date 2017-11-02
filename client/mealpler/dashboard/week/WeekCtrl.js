Mealpler.controller('WeekCtrl', function (WeekModel) {
    const datePicker = $('input[name="daterange"]');
    let week = this;
    week.days = WeekModel.weekDays();
    //settings for Date Range Picker
    datePicker.daterangepicker({
        "dateLimit": {
            "days": 7
        },
        "startDate": "10/26/2017",
        "endDate": "11/01/2017"
    }, function(start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
    datePicker.on('apply.daterangepicker', function (e, picker) {
        // change for event with choosing new range
    })
});