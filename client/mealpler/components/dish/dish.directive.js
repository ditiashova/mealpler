Mealpler.directive('dishBlock', function (DishService, IngredientService, notify) {
    const link = (scope, el, attrs, [MealCtrl, DayCtrl, WeekCtrl, MainCtrl]) => {
        const DishCtrl = scope.dishCtrl;

        DishCtrl.deleteDish = (item, mealNo, day) => {
            const userId = MainCtrl.uid;
            DishService.deleteDish(item, mealNo, day.date, userId)
                .then(() => MainCtrl.runDatabaseHandlers(userId))
                .then(() => notify.show('Food has been deleted.', 'delete'))
                .catch(console.log);
        };

        DishCtrl.deleteIngredient = (ingredient, itemName, mealNo, day) => {
            const userId = MainCtrl.uid;
            IngredientService.deleteIngredient(ingredient, itemName, mealNo, day.date, userId)
                .then(() => MainCtrl.runDatabaseHandlers(userId))
                .catch(console.log);
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            dish: '=',
            mealNo: '=',
            day: '='
        },
        controller: 'DishCtrl',
        controllerAs: 'dishCtrl',
        require: ['^^mealManager', '^^dayManager', '^^weekManager', '^^mainBlock'],
        templateUrl: 'scripts/components/dish/dish.tmpl.html',
        link: link
    };
});