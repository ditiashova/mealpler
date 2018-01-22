Mealpler.directive('dishBlock', function (DishService, IngredientService, notify) {
    const link = (scope, el, attrs, [MealCtrl, DayCtrl, WeekCtrl, MainCtrl]) => {
        const DishCtrl = scope.dishCtrl;

        DishCtrl.deleteDish = (item, mealNo, day) => {
            const id = MainCtrl.uid;
            DishService.deleteDish(item, mealNo, day.date, id)
                .then(() => notify.show('Food has been deleted.', 'delete'))
                .catch(console.log);
        };

        DishCtrl.deleteIngredient = (ingredient, itemName, mealNo, day) => {
            const id = MainCtrl.uid;
            IngredientService.deleteIngredient(ingredient, itemName, mealNo, day.date, id)
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