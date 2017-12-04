Mealpler.directive('weekManager', function () {
    const link = (scope, el, attrs, controller) => {
        //here we accept variables from MainCtrl
    };

    return {
        restrict: 'E',
        transclude: true,
        controller: 'WeekCtrl',
        controllerAs: 'week',
        scope: {},
        templateUrl: 'scripts/dashboard/week/week.tmpl.html',
        link: link
    };
});