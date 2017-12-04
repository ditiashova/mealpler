Mealpler.directive('portionBlock', function () {
    const link = (scope, el, attrs, controller) => {
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            item: '='
        },
        controller: 'PortionCtrl',
        controllerAs: 'portion',
        require: '^^mealManager',
        templateUrl: 'scripts/dashboard/week/day/meal/portion/portion.tmpl.html',
        link: link
    };
});