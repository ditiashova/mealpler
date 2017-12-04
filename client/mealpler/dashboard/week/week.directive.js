Mealpler.directive('week', function () {
    return {
        restrict: 'E',
        transclude: true,
        controller: 'WeekCtrl',
        controllerAs: 'week',
        scope: {},
        templateUrl: 'scripts/dashboard/week/week.tmpl.html'
    };
});