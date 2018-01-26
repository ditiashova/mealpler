Mealpler.directive('mealManager', function (notify, MealService, paste, DayService) {
    const link = (scope, el, attrs, [MainCtrl]) => {
        const MealCtrl = scope.meal;

        MealCtrl.pasteMeal = (mealNo, date) => {
            const userId = MainCtrl.uid;
            paste.pasteMeal(mealNo, date, userId)
                .then(() => MainCtrl.runDatabaseHandlers(userId))
                .then(() => notify.show('Food has been pasted successfully.', 'add'))
                .catch((e) => console.log(e.message));
        };

        MealCtrl.deleteMeal = (mealNo, date) => {
            const userId = MainCtrl.uid;
            DayService.deleteMealFromDay(mealNo, date.format("YYYY-M-D"), userId)
                .then(() => MainCtrl.runDatabaseHandlers(userId))
                .then(() => notify.show('Meal has been deleted.', 'delete'))
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