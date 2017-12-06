Mealpler.controller('MealCtrl', MealController);

function MealController ($scope, MealModel, StorageModel) {

    this.addNewItems = (type, newItems, forMeal, forDay) => {
        let oldMealList = MealModel.findMealList(forDay).filter(a => a.mealName === forMeal)[0];
        if (type === 'list') {
            oldMealList.mealList = oldMealList.mealList.concat(newItems.list);
        } else if (type === 'recipe') {
            oldMealList.mealList.push(newItems);
        } else if (type === 'stored') {
            oldMealList.mealList = oldMealList.mealList.concat(newItems.mealList);
        }
        MealModel.saveMealInfo(oldMealList,forDay);
    };

    this.pasteFood = (name, forMeal, forDay) => {
        let stored = StorageModel.getStoredItem(name);
        this.addNewItems('stored', forMeal, forDay, stored);
    };
}