class MealController {
    constructor ($scope, StorageService, openModal, $document, copy, DayService) {
        Object.assign(this, {$scope, StorageService, openModal, $document, copy, DayService});
        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent'));
    }

    copyFood(name, content) {
        this.copy.copyFood(name, content);
    }

    openModalAddNewMeal(mealType, day) {
        const templatePath = 'scripts/components/meal/add/add.tmpl.html';
        this.mealNo = mealType;
        this.date = day.date.format("YYYY-M-D");
        const newMealCtrl = ($scope, $uibModalInstance) => {
            this.modalInstance = $uibModalInstance;
            /*this.save = function (type, newItems, forMeal, forDate, userId) {
                return this.DayService.updateDayInfo(newItems, forDate, userId, type, forMeal).then(() => {
                    $uibModalInstance.close();
                });
            };
            this.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };*/
        };
        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, newMealCtrl);
    };

    openModalDeleteOldMeal(mealType, day) {
        const templatePath = 'scripts/components/meal/delete/delete.tmpl.html';
        this.mealNo = mealType;
        this.date = day.date.format("YYYY-M-D");
        const deleteMealCtrl = ($scope, $uibModalInstance) => {
            this.modalInstance = $uibModalInstance;
            /*this.delete = function (forMeal, forDay, userId) {
                return this.DayService.deleteMealFromDay(forMeal, forDay, userId).then(() => {
                    $uibModalInstance.close();
                })
            };
            this.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }*/
        };
        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, deleteMealCtrl);
    };
}

Mealpler.controller('MealCtrl', MealController);