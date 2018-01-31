class MealController {
    constructor ($scope, openModal, $document, CopyService, PasteService, DayService, NotifyService) {
        Object.assign(this, {$scope, openModal, $document, CopyService, PasteService, DayService, NotifyService});
        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent'));
    }

    pasteMeal(mealNo, date) {
        //const userId = this.MainCtrl.uid;
        this.PasteService.pasteMeal(mealNo, date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.NotifyService.show('Food has been pasted successfully.', 'add'))
            .catch((e) => console.log(e.message));
    };

    deleteMeal(mealNo, date) {
        //const userId = this.MainCtrl.uid;
        this.DayService.deleteMealFromDay(mealNo, date.format("YYYY-M-D"))
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.NotifyService.show('Meal has been deleted.', 'delete'))
            .catch((e) => console.log(e.message));
    };

    copyMeal(content) {
        this.CopyService.copyFood('meal', content);
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