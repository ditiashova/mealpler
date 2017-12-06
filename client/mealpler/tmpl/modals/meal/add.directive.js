Mealpler.directive('addModal', function () {
    const link = (scope, el, attrs, controllers) => {
        const WeekCtrl = controllers[0];
        const MealCtrl = controllers[1];
        const day = attrs.date;
        const meal = attrs.meal;
        let s = scope;
        scope.addMeal.saveNew = (type, newItems) => {
            MealCtrl.addNewItems(type, newItems, meal, day);
            WeekCtrl._loadMealsDataForWeek();
        }
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '=',
            meal: '='
        },
        require: ['^^weekManager', '^^mealManager'],
        controller: 'AddMealModalCtrl',
        controllerAs: 'addMeal',
        templateUrl: 'scripts/tmpl/modals/meal/add.modal.html',
        link: link
    };
});