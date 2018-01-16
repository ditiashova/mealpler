Mealpler.directive('deleteModal', function (notify) {
    const link = (scope, el, attrs, controllers) => {
        const WeekCtrl = controllers[0];
        const MealCtrl = scope.meal;
        const date = MealCtrl.date;
        const meal = MealCtrl.meal;
        scope.confirmDelete = () => {
            MealCtrl.delete(meal, date).then(() => {
                WeekCtrl._loadMealsDataForWeekRange();
                notify.displayNotify('Meal has been deleted.', 'delete');
            });
        };
        scope.cancel = () => { //for cancel icon in modal
            MealCtrl.cancel();
        };
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '=',
            meal: '='
        },
        require: ['^^weekManager', '^^mealManager'],
        templateUrl: 'scripts/components/meal/delete/delete.modal.html',
        link: link
    };
});