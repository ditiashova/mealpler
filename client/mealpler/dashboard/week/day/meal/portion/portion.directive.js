Mealpler.directive('portionBlock', function (MealModel) {
    const link = (scope, el, attrs, controllers) => {
        const DayCtrl = controllers[1];
        const WeekCtrl = controllers[2];
        scope.deleteItem = (item, mealName, date) => {
            MealModel.deleteItemMeal(item, mealName, date);
            WeekCtrl._loadMealsDataForWeek();
        };
        scope.deleteIngredient = (ingredient, itemName, mealName, date) => {
            MealModel.deleteIngredient(ingredient, itemName, mealName, date);
            WeekCtrl._loadMealsDataForWeek();
        };
        scope.copyFood = (name, food) => {
            DayCtrl.copyFood(name, food);
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            item: '=',
            mealName: '=',
            date: '='
        },
        controller: 'PortionCtrl',
        controllerAs: 'portion',
        require: ['^^mealManager', '^^dayManager', '^^weekManager'],
        templateUrl: 'scripts/dashboard/week/day/meal/portion/portion.tmpl.html',
        link: link
    };
});