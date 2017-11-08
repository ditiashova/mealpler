Mealpler.controller('WeekCtrl', function (WeekModel, $scope) {
    const datePicker = $('input[name="daterange"]');
    let week = this;
    week.daysList = WeekModel.weekDays();
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
    //moment
    week.firstDayOfWeek = moment(); //today
    week.range = [];
    (function calculateWeekRange() {
        for (let i = 0; i < 7; i++) {
            let nextDay = moment().add(i, 'day');
            nextDay.id = i;
            /*nextDay = week.daysList.filter(d => d.id === nextDay);*/
            week.range.push(nextDay);
        }
        /*week.range.map(function(d) {
            d.fullDayName = week.daysList.filter(function (a) {
                return a.id === moment(d).day();
            })
        });*/
        week.range.map(function(d) {d.dayName = moment(d).format('dddd'); d.fullDay = moment(d).format('dddd, Do')});
        let a;
    })();
});

