class MealController {
    constructor ($scope, openModal, $document, CopyService, PasteService, DayService, NotifyService) {
        Object.assign(this, {$scope, openModal, $document, CopyService, PasteService, DayService, NotifyService});
        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent'));
    }

    pasteMeal(mealNo, date) {
        this.PasteService.pasteMeal(mealNo, date)
            .then(() => this.NotifyService.show('Food has been pasted successfully.', 'add'))
            .catch((e) => console.log('Pasting meal failed due to: '+ e.message));
    };

    deleteMeal(mealNo, date) {
        this.DayService.deleteMealFromDay(mealNo, date.format("YYYY-M-D"))
            .then(() => this.NotifyService.show('Meal has been deleted.', 'delete'))
            .catch((e) => console.log('Meal deleting failed due to: '+ e.message));
    };

    copyMeal(content) {
        this.CopyService.copyFood('meal', content);
    }

    openModalAddNewMeal(mealType, date) {
        const templatePath = 'scripts/components/meal/add/add.tmpl.html';

        this.mealNo = +mealType;
        this.date = date;
        const newMealCtrl = ($scope, $uibModalInstance) => {
            this.modalInstance = $uibModalInstance;
        };

        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, newMealCtrl);
    };
}

Mealpler.controller('MealCtrl', MealController);