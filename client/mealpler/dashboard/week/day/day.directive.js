Mealpler.directive('dayManager', function () {
    const link = (scope, el, attrs, controller) => {
        /*scope.showAnnotations = function() {
            /!*controller.showAnnotations();*!/
        };

        controller.onShowAnnotations(function() {
            scope.viewing = true;
        });*/
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