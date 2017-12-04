Mealpler.controller('MealCtrl', MealController);

function MealController ($scope,$uibModal, MealModel, StorageModel,  $document) {

    this.addNewItems = (type, forMeal, forDay, newItems) => {
        if (type === 'list') {
            forMeal.mealList = forMeal.mealList.concat(newItems.list);
        } else if (type === 'recipe') {
            forMeal.mealList.push(newItems);
        } else if (type === 'stored') {
            forMeal.mealList = forMeal.mealList.concat(newItems.mealList);
        }
        MealModel.saveMealInfo(forMeal,forDay);
    };

    this.pasteFood = (name, forMeal, forDay) => {
        let stored = StorageModel.getStoredItem(name);
        this.addNewItems('stored', forMeal, forDay, stored);
    };

    this.openModal = (modalName, parentSelector) => {
        const temp = '<' + modalName + '>'+'</' + modalName + '>';
        $uibModal.open({
            appendTo: angular.element($document[0].querySelector(parentSelector)),
            template: temp, //paste simple directive resolved
            animation: true,
            controller: ($scope, $uibModalInstance) => {
                this.ok = function () {
                    $uibModalInstance.close();
                };

                this.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        })
    };


}