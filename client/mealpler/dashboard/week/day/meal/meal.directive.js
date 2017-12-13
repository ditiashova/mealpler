Mealpler.directive('mealManager', function () {
    const link = (scope, el, attrs, controllers) => {
        const MealCtrl = scope.meal;
        const DayCtrl = controllers[0];
        const WeekCtrl = controllers[1];
        scope.copyFood = (name, food) => {
            DayCtrl.copyFood(name, food);
        };
        scope.pasteFood = (name, food, date) => {
            MealCtrl.pasteFood(name, food, date);
            WeekCtrl._loadMealsDataForWeekRange();
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
        templateUrl: 'scripts/dashboard/week/day//meal/meal.tmpl.html',
        link: link
    };
});