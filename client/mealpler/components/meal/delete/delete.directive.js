Mealpler.directive('deleteModal', function (notify) {
    const link = (scope, el, attrs, [WeekCtrl, MainCtrl]) => {
        //const WeekCtrl = controllers[0];
        const MealCtrl = scope.meal;
        const date = MealCtrl.date;
        const meal = MealCtrl.meal;
        scope.confirmDelete = () => {
            const id = MainCtrl.uid;
            MealCtrl.delete(meal, date, id).then(() => {
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
        require: ['^^weekManager', '^^mainBlock'],
        templateUrl: 'scripts/components/meal/delete/delete.modal.html',
        link: link
    };
});