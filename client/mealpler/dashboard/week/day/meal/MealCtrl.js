Mealpler.controller('MealCtrl', MealController);

function MealController ($scope, MealModel, StorageModel, openModal, $document) {

    this.addNewItems = (type, newItems, forMeal, forDay) => {
        const formattedDay = moment(forDay).format("YYYY-M-D"); //in case nonformatted day was passed
        let oldMealList = MealModel.findMealList(formattedDay).filter(a => a.mealName === forMeal)[0];
        if (type === 'list') {
            oldMealList.mealList = oldMealList.mealList.concat(newItems.list);
        } else if (type === 'recipe') {
            oldMealList.mealList.push(newItems);
        } else if (type === 'stored') {
            oldMealList.mealList = oldMealList.mealList.concat(newItems.mealList);
        }
        MealModel.saveMealInfo(oldMealList,formattedDay);
    };

    this.pasteFood = (name, forMeal, forDay) => {
        let stored = StorageModel.getStoredItem(name);
        this.addNewItems('stored', stored, forMeal, forDay);
    };

    this.addNewMeal = (mealName, date) => {
        const templateContent = '<add-modal date="' + date.format("YYYY-M-D") + '" meal="' + mealName + '"></add-modal>';
        const parentDiv = angular.element($document[0].querySelector('.modal-parent'));
        openModal.open(templateContent, parentDiv, $scope, controller);
    }
}