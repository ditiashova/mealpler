class MealController {
    constructor ($scope, StorageService, openModal, $document, MealService) {
        Object.assign(this, {$scope, StorageService, openModal, $document, MealService});
        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent'));
    }

    addNewItems(type, newItems, forMeal, forDay) {
        const formattedDay = moment(forDay).format("YYYY-M-D"); //in case nonformatted day was passed
        let oldMealList = angular.copy(this.MealService.findMealList(formattedDay).find(a => a.mealName === forMeal));
        if (type === 'list') {
            oldMealList.mealList = oldMealList.mealList.concat(newItems.list);
        } else if (type === 'recipe') {
            oldMealList.mealList.push(newItems);
        } else if (type === 'stored') {
            oldMealList.mealList = oldMealList.mealList.concat(newItems.mealList);
        }
        this.MealService.saveMealInfo(oldMealList,formattedDay);
    };

    pasteFood(name, forMeal, forDay) {
        let storedOld = this.StorageService.getStoredItem(name);
        this.addNewItems('stored', storedOld, forMeal, forDay);
    };

    addNewMeal(mealName, date) {
        const templatePath = 'scripts/components/modals/meal/add/add.tmpl.html';
        const newMealCtrl = ($scope, $uibModalInstance) => {
            this.meal = mealName;
            this.date = date.dateObj.format("YYYY-M-D");
            this.save = function (type, newItems, forMeal, forDay) {
                this.addNewItems(type, newItems, forMeal, forDay);
                $uibModalInstance.close();
            };
            this.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }};
        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, newMealCtrl);
    };

    deleteOldMeal(mealName, date) {
        const templatePath = 'scripts/components/modals/meal/delete/delete.tmpl.html';
        const deleteMealCtrl = ($scope, $uibModalInstance) => {
            this.meal = mealName;
            this.date = date.dateObj.format("YYYY-M-D");
            this.delete = function (forMeal, forDay) {
                this.confirmMealDelete(forMeal, forDay);
                $uibModalInstance.close();
            };
            this.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }};
        this.openModal.open(templatePath, this.parentDivForMealModals, this.$scope, deleteMealCtrl);
    };

    confirmMealDelete(meal, date) {
        this.MealService.deleteMeal(meal, date);
    };
}

Mealpler.controller('MealCtrl', MealController);