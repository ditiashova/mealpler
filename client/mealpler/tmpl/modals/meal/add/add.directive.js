Mealpler.directive('addModal', function () {
    const link = (scope, el, attrs, controllers) => {
        const WeekCtrl = controllers[0];
        const MealCtrl = scope.meal;
        const AddMealCtrl = scope.addMeal;
        const date = MealCtrl.date;
        const meal = MealCtrl.meal;
        scope.cancel = () => { //for cancel icon in modal
            MealCtrl.cancel();
        };
        AddMealCtrl.saveNew = (type, newItems) => {
            MealCtrl.save(type, newItems, meal, date);
            WeekCtrl._loadMealsDataForWeek();
        };
        AddMealCtrl.cancelModal = scope.cancel;
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
        templateUrl: 'scripts/tmpl/modals/meal/add/add.modal.html',
        link: link
    };
});