Mealpler.directive('weekManager', function () {
    const link = (scope, el, attrs, [DashboardCtrl, MainCtrl]) => {
        const WeekCtrl = scope.week;

        DashboardCtrl.addWeekMealDataHandlers((data, start, id) => WeekCtrl.init(data, start, id));

        if (!MainCtrl.uid) {
            //manually initialize week ctrl if user is not signed in
            WeekCtrl.init();
        }
        
        MainCtrl.addDatabaseHandlers((data, date) => {
            const id = MainCtrl.uid;
            return WeekCtrl.init(data, date, id);
        });

        WeekCtrl.switchWeek = (time) => {
            const id = MainCtrl.uid;
            let newStartDate = {};

            if (time === 'past') {
                newStartDate = moment(WeekCtrl.weekStartDate.date).subtract(1, 'day').startOf('week');
            } else if (time === 'future') {
                newStartDate = moment(WeekCtrl.weekStartDate.date).add(WeekCtrl.weekDuration + 1, 'day');
            }
            MainCtrl.newWeekStartDate = newStartDate;

            WeekCtrl.init(void 0, newStartDate, id).then(() => {
                runShopListAndDatePickerEvents(newStartDate, WeekCtrl.weekDuration, id);
            });
        };

        function runShopListAndDatePickerEvents(start, duration, id) {
            DashboardCtrl.runShopListHandlers(start, duration, id);
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