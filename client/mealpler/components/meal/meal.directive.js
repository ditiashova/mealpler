Mealpler.directive('mealManager', function (notify) {
    const link = (scope, el, attrs, [DayCtrl, WeekCtrl, MainCtrl]) => {
        const MealCtrl = scope.meal;
        //const DayCtrl = controllers[0];
        //const WeekCtrl = controllers[1];
        //const MainCtrl = controllers[2];
        scope.copyFood = (name, food) => {
            DayCtrl.copyFood(name, food);
        };
        scope.pasteFood = (name, mealNo, date) => {
            MealCtrl.pasteFood(name, mealNo, date).then(() => {
                WeekCtrl._loadMealsDataForWeekRange();
                notify.displayNotify('Food has been pasted successfully.', 'add');
            });
        };

        MainCtrl.addAuthHandlers((uid) => {
            MealCtrl.userId = uid;
        });
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
        require: ['^^dayManager', '^^weekManager', '^^mainBlock'],
        templateUrl: 'scripts/components/meal/meal.tmpl.html',
        link: link
    };
});