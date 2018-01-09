Mealpler.directive('dayManager', function (DayService, notify) {
    const link = (scope, el, attrs, controller) => {
        const DayCtrl = scope.dayCtrl;
        const WeekCtrl = controller;
        DayCtrl.pasteMenu = (date) => {
            DayService.pasteMenuForDay(date);
            WeekCtrl._loadMealsDataForWeekRange();
            notify.displayNotify('Food has been pasted successfully.', 'add');
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '='
        },
        controller: 'DayCtrl',
        controllerAs: 'dayCtrl',
        require: '^^weekManager',
        templateUrl: 'scripts/components/day/day.tmpl.html',
        link: link
    };
});