Mealpler.directive('dayManager', function () {
    const link = (scope, el, attrs, controller) => {
        const DayCtrl = scope.day;
        const WeekCtrl = controller;
        scope.pasteMenu = (date) => {
            DayCtrl.pasteMenu(date);
            WeekCtrl._loadMealsDataForWeekRange();
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '='
        },
        controller: 'DayCtrl',
        controllerAs: 'day',
        require: '^^weekManager',
        templateUrl: 'scripts/dashboard/week/day/day.tmpl.html',
        link: link
    };
});