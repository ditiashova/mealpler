Mealpler.directive('addModal', function () {
    const link = (scope, el, attrs, controller) => {
        const addMeal = scope.addMeal;
        const WeekCtrl = controller[0];

    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        require: ['^^weekManager'],
        controller: 'AddMealModalCtrl',
        controllerAs: 'addMeal',
        templateUrl: 'scripts/tmpl/modals/meal/add.modal.html',
        link: link
    };
});