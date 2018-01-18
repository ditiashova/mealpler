Mealpler.directive('addModal', function (notify) {
    const link = (scope, el, attrs, [WeekCtrl, DashboardCtrl, MainCtrl]) => {
        const MealCtrl = scope.meal;
        const AddMealCtrl = scope.addMeal;
        const date = MealCtrl.date;
        const meal = MealCtrl.meal;
        scope.cancel = () => { //for cancel icon in modal
            MealCtrl.cancel();
        };
        AddMealCtrl.saveNew = (type, newItems) => {
            const id = MainCtrl.uid;
            MealCtrl.save(type, newItems, meal, date, id).then(() => {
                notify.displayNotify('New food has been added.', 'add');
            });
        };

        AddMealCtrl.cancelModal = scope.cancel;

        /*MainCtrl.addAuthHandlers((uid) => {
            AddMealCtrl.userId = uid;
        });*/
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '=',
            meal: '='
        },
        require: ['^^weekManager', '^^dashboard', '^^mainBlock'],
        controller: 'AddMealModalCtrl',
        controllerAs: 'addMeal',
        templateUrl: 'scripts/components/meal/add/add.modal.html',
        link: link
    };
});