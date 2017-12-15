Mealpler.controller('MealCtrl', MealController);

function MealController ($scope, MealModel, StorageModel, openModal, $document, MealService) {
    const parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent'));

    this.addNewItems = (type, newItems, forMeal, forDay) => {
        const formattedDay = moment(forDay).format("YYYY-M-D"); //in case nonformatted day was passed
        let oldMealList = angular.copy(MealService.findMealList(formattedDay).filter(a => a.mealName === forMeal)[0]);
        if (type === 'list') {
            oldMealList.mealList = oldMealList.mealList.concat(newItems.list);
        } else if (type === 'recipe') {
            oldMealList.mealList.push(newItems);
        } else if (type === 'stored') {
            oldMealList.mealList = oldMealList.mealList.concat(newItems.mealList);
        }
        MealService.saveMealInfo(oldMealList,formattedDay);
    };

    this.pasteFood = (name, forMeal, forDay) => {
        let storedOld = StorageModel.getStoredItem(name);
        this.addNewItems('stored', storedOld, forMeal, forDay);
    };

    this.addNewMeal = (mealName, date) => {
        const templatePath = 'scripts/components/modals/meal/add/modal.tmpl.html';
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
        openModal.open(templatePath, parentDivForMealModals, $scope, newMealCtrl);
    };

    this.deleteOldMeal = (mealName, date) => {
        const templatePath = 'scripts/components/modals/meal/delete/modal.tmpl.html';
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
        openModal.open(templatePath, parentDivForMealModals, $scope, deleteMealCtrl);
    };

    this.confirmMealDelete = (meal, date) => {
        MealService.deleteMeal(meal, date);
    };
}