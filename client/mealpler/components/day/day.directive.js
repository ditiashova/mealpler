Mealpler.directive('dayManager', function (DayService, notify) {
    const link = (scope, el, attrs, [WeekCtrl, MainCtrl]) => {
        const DayCtrl = scope.dayCtrl;
        //const WeekCtrl = controller;
        scope.pasteMenu = (date) => {
            DayCtrl.pasteMenu(date).then(() => {
                //WeekCtrl._loadMealsDataForWeekRange();
                notify.displayNotify('Food has been pasted successfully.', 'add');
            });
        };
        MainCtrl.addAuthHandlers((uid) => {
            DayCtrl.userId = uid;
        });
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '='
        },
        controller: 'DayCtrl',
        controllerAs: 'dayCtrl',
        require: ['^^weekManager', '^^mainBlock'],
        templateUrl: 'scripts/components/day/day.tmpl.html',
        link: link
    };
});