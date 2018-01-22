Mealpler.directive('weekManager', function () {
    const link = (scope, el, attrs, [DashboardCtrl, MainCtrl]) => {
        const WeekCtrl = scope.week;

        DashboardCtrl.addWeekMealDataHandlers((data, start, id) => WeekCtrl.init(data, start, id));
        
        MainCtrl.addDatabaseHandlers((data, date) => {
            WeekCtrl.init(data, date);
        });

        WeekCtrl.switchWeek = (time) => {
            const id = MainCtrl.uid;
            let newStartDate = {};

            if (time === 'past') {
                newStartDate = moment(WeekCtrl.weekStartDate.date).subtract(1, 'day').startOf('week');
            } else if (time === 'future') {
                newStartDate = moment(WeekCtrl.weekStartDate.date).add(WeekCtrl.weekDuration + 1, 'day');
            }

            WeekCtrl.init(null, newStartDate, id);

            MainCtrl.newWeekStartDate = newStartDate;
            runShopListAndDatePickerEvents(newStartDate, id);
        };

        function runShopListAndDatePickerEvents(start, id) {
            DashboardCtrl.runShopListHandlers(start, null, id);
            DashboardCtrl.runDatePickerHandlers(start);
        }
    };

    return {
        restrict: 'E',
        transclude: true,
        require: ['^^dashboard', '^^mainBlock'],
        controller: 'WeekCtrl',
        controllerAs: 'week',
        scope: {},
        templateUrl: 'scripts/components/week/week.tmpl.html',
        link: link
    };
});