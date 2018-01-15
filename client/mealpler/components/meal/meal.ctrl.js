class MealController {
    constructor ($scope, StorageService, openModal, $document, MealService, Auth) {
        Object.assign(this, {$scope, StorageService, openModal, $document, MealService, Auth});
        this.parentDivForMealModals = angular.element($document[0].querySelector('.modal-parent'));
        this.Auth.$onAuthStateChanged((firebaseUserData) => {
            const userIsLogged = !!firebaseUserData;
            if (userIsLogged) {
                this.userPlannerId = firebaseUserData.uid;
            }
        });
    }

    addNewItems(type, newItems, forMeal, forDay) {
        const formattedDay = moment(forDay).format("YYYY-M-D"); //in case nonformatted day was passed
        let oldMealList = angular.copy(this.MealService.findMealList(formattedDay).find(a => a.mealName === forMeal));
        if (type === 'list') {
            oldMealList.dishesList = oldMealList.dishesList.concat(newItems.productsList);
        } else if (type === 'recipe') {
            oldMealList.dishesList.push(newItems);
        } else if (type === 'stored') {
            oldMealList.dishesList = oldMealList.dishesList.concat(newItems.dishesList);
        }
        this.MealService.saveMealInfo(oldMealList,formattedDay);
    };

    pasteFood(name, forMeal, forDay) {
        let storedOld = this.StorageService.getLocalyStoredItem(name);
        this.addNewItems('stored', storedOld, forMeal, forDay);
    };

    addNewMeal(mealNo, date) {
        const templatePath = 'scripts/components/meal/add/add.tmpl.html';
        const newMealCtrl = ($scope, $uibModalInstance) => {
            this.meal = mealNo;
            this.date = date.dateObj.format("YYYY-M-D");
            this.save = function (type, newItems, forMeal, forDay) {
                return new Promise((resolve) => {
                    resolve(this.MealService.updateMealInfo(newItems, forDay, this.userPlannerId, type, forMeal));
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