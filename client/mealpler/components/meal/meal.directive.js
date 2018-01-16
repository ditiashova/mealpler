Mealpler.directive('mealManager', function (notify) {
    const link = (scope, el, attrs, controllers) => {
        const MealCtrl = scope.meal;
        const DayCtrl = controllers[0];
        const WeekCtrl = controllers[1];
        scope.copyFood = (name, food) => {
            DayCtrl.copyFood(name, food);
        };
        scope.pasteFood = (name, mealNo, date) => {
            MealCtrl.pasteFood(name, mealNo, date).then(() => {
                WeekCtrl._loadMealsDataForWeekRange();
                notify.displayNotify('Food has been pasted successfully.', 'add');
            });
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            food: '=',
            date: '='
        },
        controller: 'MealCtrl',
        controllerAs: 'meal',
        require: ['^^dayManager', '^^weekManager'],
        templateUrl: 'scripts/components/meal/meal.tmpl.html',
        link: link
    };
});