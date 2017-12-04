Mealpler.directive('mealManager', function () {
    const link = (scope, el, attrs, controller) => {
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            food: '='
        },
        controller: 'MealCtrl',
        controllerAs: 'meal',
        require: '^^dayManager',
        templateUrl: 'scripts/dashboard/week/day//meal/meal.tmpl.html',
        link: link
    };
});