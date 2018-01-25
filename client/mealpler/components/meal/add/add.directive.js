Mealpler.directive('addModal', function (notify, DayService) {
    const link = (scope, el, attrs, [WeekCtrl, DashboardCtrl, MainCtrl]) => {
        const MealCtrl = scope.mealCtrl;
        const AddMealCtrl = scope.addMeal;
        const date = attrs.date;
        const mealNo = +attrs.mealNo;

        AddMealCtrl.saveNew = (type, newItems) => {
            const userId = MainCtrl.uid;
            DayService.updateDayInfo(newItems, date, userId, type, mealNo)
                .then(() => MealCtrl.modalInstance.close())
                .then(() => {
                    if (!userId) return MainCtrl.runDatabaseHandlers();
                })
                .then(() => notify.show('New food has been added.', 'add'))
                .catch((e) => console.log(e.message));
        };

        AddMealCtrl.cancel = () => MealCtrl.modalInstance.dismiss('cancel');
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '@',
            mealNo: '@',
            mealCtrl: '='
        },
        require: ['^^weekManager', '^^dashboard', '^^mainBlock'],
        controller: 'AddMealModalCtrl',
        controllerAs: 'addMeal',
        templateUrl: 'scripts/components/meal/add/add.modal.html',
        link: link
    };
});