class MealController {
    constructor ($scope, LocalStorageService, openModal, $document, MealService) {
        Object.assign(this, {$scope, LocalStorageService, openModal, $document, MealService});
        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent'));
    }

    pasteFood(name, mealNo, forDay, userId) {
        let storedOld = this.LocalStorageService.getLocalStorageData(name);
        return this.MealService.updateMealInfo(storedOld, forDay, userId, 'stored', mealNo);
    };

    openModalAddNewMeal(mealNo, date) {
        const templatePath = 'scripts/components/meal/add/add.tmpl.html';
        const newMealCtrl = ($scope, $uibModalInstance) => {
            this.meal = mealNo;
            this.date = date.fullDate;
            this.save = function (type, newItems, forMeal, forDay, userId) {
                //$uibModalInstance.close();
                return this.MealService.updateMealInfo(newItems, forDay, userId, type, forMeal).then(() => {
                    $uibModalInstance.close();
                });
            };
            this.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }};
        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, newMealCtrl);
    };

    deleteOldMeal(mealName, date) {
        const templatePath = 'scripts/components/meal/delete/delete.tmpl.html';
        const deleteMealCtrl = ($scope, $uibModalInstance) => {
            this.meal = mealName;
            this.date = date.fullDate;
            this.delete = function (forMeal, forDay, userId) {
                return this.MealService.deleteMeal(forMeal, forDay, userId).then(() => {
                    $uibModalInstance.close();
                })
            };
            this.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }};
        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, deleteMealCtrl);
    };
}

Mealpler.controller('MealCtrl', MealController);