Mealpler.controller('MealCtrl', MealController);

function MealController (MealModel, StorageModel) {

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


}