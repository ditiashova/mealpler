Mealpler.directive('mealManager', function (notify, MealService, paste) {
    const link = (scope, el, attrs, [MainCtrl]) => {
        const MealCtrl = scope.meal;

        MealCtrl.pasteMeal = (mealNo, date) => {
            const id = MainCtrl.uid;
            paste.pasteMeal('meal', mealNo, date, id)
                .then(() => {
                    if (!userId) return MainCtrl.runDatabaseHandlers();
                })
                .then(() => notify.show('Food has been pasted successfully.', 'add'))
                .catch((e) => console.log(e.message));
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