Mealpler.directive('weekManager', function () {
    const link = (scope, el, attrs, controller) => {
        const dashboardCtrl = controller;
        const weekCtrl = scope.week;
        dashboardCtrl.saveWeekStartDate(scope.week.weekStartDate);
        dashboardCtrl.setMealDataForWeekActions((start) => scope.week.init(start));
    };

    return {
        restrict: 'E',
        transclude: true,
        require: '^^dashboard',
        controller: 'WeekCtrl',
        controllerAs: 'week',
        scope: {},
        templateUrl: 'scripts/dashboard/week/week.tmpl.html',
        link: link
    };
});