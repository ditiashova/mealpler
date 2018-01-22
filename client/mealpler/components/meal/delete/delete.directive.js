Mealpler.directive('deleteModal', function (notify, DayService) {
    const link = (scope, el, attrs, [MainCtrl]) => {
        const MealCtrl = scope.mealCtrl;
        const DeleteMealCtrl = scope.deleteMealCtrl;
        const date = attrs.date;
        const mealNo = attrs.mealNo;

        DeleteMealCtrl.confirmDelete = () => {
            const userId = MainCtrl.uid;
            DayService.deleteMealFromDay(mealNo, date, userId)
                .then(() => MealCtrl.modalInstance.close())
                .then(() => notify.show('Meal has been deleted.', 'delete'));
        };

        DeleteMealCtrl.cancel = () => MealCtrl.modalInstance.dismiss('cancel');
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            date: '@',
            mealNo: '@',
            mealCtrl: '='
        },
        require: ['^^mainBlock'],
        templateUrl: 'scripts/components/meal/delete/delete.modal.html',
        controller: () => {},
        controllerAs: 'deleteMealCtrl',
        link: link
    };
});