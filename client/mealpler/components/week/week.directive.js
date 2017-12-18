Mealpler.directive('weekManager', function () {
    const link = (scope, el, attrs, dashboardCtrl) => {
        const weekCtrl = scope.week;

        dashboardCtrl.addWeekMealDataHandlers((start) => weekCtrl.init(start));

        weekCtrl.switchWeek = (time) => {
            let newStartDate = {};

            if (time === 'past') {
                newStartDate = weekCtrl.weekStartDate.subtract(1, 'day');
            } else if (time === 'future') {
                newStartDate = weekCtrl.weekStartDate.add(weekCtrl.weekDuration + 1, 'day');
            }

            weekCtrl.init(newStartDate);
            callShopListAndDatePickerEvents(weekCtrl.weekStartDate);
        };

        function callShopListAndDatePickerEvents(date) {
            dashboardCtrl.runShopListHandlers(date);
            dashboardCtrl.runDatePickerHandlers(date);
        }
    };

    return {
        restrict: 'E',
        transclude: true,
        require: '^^dashboard',
        controller: 'WeekCtrl',
        controllerAs: 'week',
        scope: {},
        templateUrl: 'scripts/components/week/week.tmpl.html',
        link: link
    };
});