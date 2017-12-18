Mealpler.directive('deleteModal', function () {
    const link = (scope, el, attrs, controllers) => {
        const WeekCtrl = controllers[0];
        const MealCtrl = scope.meal;
        const date = MealCtrl.date;
        const meal = MealCtrl.meal;
        scope.confirmDelete = () => {
            MealCtrl.delete(meal, moment(date));
            WeekCtrl._loadMealsDataForWeekRange();
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
        templateUrl: 'scripts/components/modals/meal/delete/delete.modal.html',
        link: link
    };
});