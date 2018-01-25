Mealpler.directive('mealManager', function (notify, MealService, paste) {
    const link = (scope, el, attrs, [MainCtrl]) => {
        const MealCtrl = scope.meal;

        MealCtrl.pasteMeal = (mealNo, date) => {
            const id = MainCtrl.uid;
            paste.pasteMeal('meal', mealNo, date, id).then(() => {
                MainCtrl.runDatabaseHandlers();
                notify.show('Food has been pasted successfully.', 'add');
            });
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            food: '=',
            day: '='
        },
        controller: 'MealCtrl',
        controllerAs: 'meal',
        require: ['^^mainBlock'],
        templateUrl: 'scripts/components/meal/meal.tmpl.html',
        link: link
    };
});