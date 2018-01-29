class MealController {
    constructor ($scope, StorageService, openModal, $document, copy, DayService) {
        Object.assign(this, {$scope, StorageService, openModal, $document, copy, DayService});
        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent'));
    }

    copyMeal(content) {
        this.copy.copyFood('meal', content);
    }

    openModalAddNewMeal(mealType, day) {
        const templatePath = 'scripts/components/meal/add/add.tmpl.html';

        this.mealNo = +mealType;
        this.date = day.date.format("YYYY-M-D");
        const newMealCtrl = ($scope, $uibModalInstance) => {
            this.modalInstance = $uibModalInstance;
        };

        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, newMealCtrl);
    };
}

Mealpler.controller('MealCtrl', MealController);