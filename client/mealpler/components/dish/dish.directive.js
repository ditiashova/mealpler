Mealpler.directive('dishBlock', function (MealModel, DishService, IngredientService, notify) {
    const link = (scope, el, attrs, controllers) => {
        const DayCtrl = controllers[1];
        const WeekCtrl = controllers[2];
        const DishCtrl = scope.dishCtrl;
        scope.deleteDish = (item, mealName, date) => {
            DishCtrl.deleteDish(item, mealName, date.fullDate).then(() => {
                WeekCtrl._loadMealsDataForWeekRange();
                notify.displayNotify('Food has been deleted.', 'delete');
            });
        };
        scope.deleteIngredient = (ingredient, itemName, mealName, date) => {
            DishCtrl.deleteIngredient(ingredient, itemName, mealName, date.fullDate).then(() => {
                WeekCtrl._loadMealsDataForWeekRange();
            });
        };
        DishCtrl.copyDish = (name, food) => {
            DayCtrl.copyFood(name, food);
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            dish: '=',
            mealName: '=',
            date: '='
        },
        controller: 'DishCtrl',
        controllerAs: 'dishCtrl',
        require: ['^^mealManager', '^^dayManager', '^^weekManager'],
        templateUrl: 'scripts/components/dish/dish.tmpl.html',
        link: link
    };
});