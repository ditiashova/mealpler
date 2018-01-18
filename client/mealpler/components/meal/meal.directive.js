Mealpler.directive('mealManager', function (notify) {
    const link = (scope, el, attrs, [DayCtrl, WeekCtrl, MainCtrl]) => {
        const MealCtrl = scope.meal;
        scope.copyFood = (name, food) => {
            DayCtrl.copyFood(name, food);
        };
        scope.pasteFood = (name, mealNo, date) => {
            const id = MainCtrl.uid;
            MealCtrl.pasteFood(name, mealNo, date, id).then(() => {
                notify.displayNotify('Food has been pasted successfully.', 'add');
            });
        };

        /*MainCtrl.addAuthHandlers((uid) => {
            MealCtrl.userId = uid;
        });*/
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