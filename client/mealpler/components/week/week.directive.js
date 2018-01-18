Mealpler.directive('weekManager', function () {
    const link = (scope, el, attrs, [dashboardCtrl, mainCtrl]) => {
        const weekCtrl = scope.week;

        dashboardCtrl.addWeekMealDataHandlers((data, start, id) => weekCtrl.init(data, start, id));

        /*mainCtrl.addAuthHandlers((uid) => {
            weekCtrl.userId = uid;
            //weekCtrl.preprocessDataForWeek(today);
        });*/

        mainCtrl.addDatabaseHandlers((data, date) => {
            weekCtrl.init(data, date);
        });

        weekCtrl.switchWeek = (time) => {
            const id = mainCtrl.uid;
            let newStartDate = {};

            if (time === 'past') {
                newStartDate = moment(weekCtrl.weekStartDate.fullDate).subtract(1, 'day').startOf('week');
            } else if (time === 'future') {
                newStartDate = moment(weekCtrl.weekStartDate.fullDate).add(weekCtrl.weekDuration + 1, 'day');
            }

            weekCtrl.init(null, newStartDate, id);

            mainCtrl.newWeekStartDate = newStartDate;
            runShopListAndDatePickerEvents(newStartDate);
        };

        function runShopListAndDatePickerEvents(date) {
            //dashboardCtrl.runShopListHandlers(date);
            dashboardCtrl.runDatePickerHandlers(date);
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