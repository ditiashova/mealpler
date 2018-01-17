Mealpler.directive('dishBlock', function (MealModel, DishService, IngredientService, notify) {
    const link = (scope, el, attrs, [MealCtrl, DayCtrl, WeekCtrl, MainCtrl]) => {
        const DishCtrl = scope.dishCtrl;
        //const DayCtrl = controllers[1];
        //const WeekCtrl = controllers[2];
        scope.deleteDish = (item, mealName, date) => {
            DishCtrl.deleteDish(item, mealName, date.fullDate).then(() => {
                WeekCtrl._loadMealsDataForWeekRange();
                notify.displayNotify('Food has been deleted.', 'delete');
            });
        };
        scope.deleteIngredient = (ingredient, itemName, mealName, date) => {
            DishCtrl.deleteIngredient(ingredient, itemName, mealName, date.fullDate).then(() => {
                WeekCtrl._loadMealsDataForWeekRange();
            })
        };

        DishCtrl.copyDish = (name, food) => {
            DayCtrl.copyFood(name, food);
        };

        MainCtrl.addAuthHandlers((uid) => {
            DishCtrl.userId = uid;
        });
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
        require: ['^^mealManager', '^^dayManager', '^^weekManager', '^^mainBlock'],
        templateUrl: 'scripts/components/dish/dish.tmpl.html',
        link: link
    };
});