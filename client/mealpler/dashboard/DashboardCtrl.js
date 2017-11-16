Mealpler.controller('DashboardCtrl', function (MealModel, StorageModel) {
    let dashboard = this;
    dashboard.pantry = {};

    dashboard.pantry.addItemToFridge = function (newItem) {
        StorageModel.addItemToFridgeList(newItem);
        dashboard.init();
    };

    dashboard.pantry.addItemToGroceryList = function (newItem) {
        StorageModel.addItemToGroceryList(newItem);
        dashboard.init();
    };

    dashboard.pantry.deleteItemFromFridge = function (item) {
        StorageModel.deleteFridgeItem(item);
        dashboard.init();
    };

    dashboard.pantry.changeFridgeItemQuantity = function (oldItem) {
        StorageModel.updateFridgeItem(oldItem);
        dashboard.init();
    };

    dashboard.pantry.deleteAllFridge = function () {
        StorageModel.deleteFridge();
        dashboard.init();
    };

    dashboard.init = function () {
        dashboard.pantry.fridgeList = StorageModel.getFridgeList();
        dashboard.pantry.groceryList = StorageModel.getGroceryList();
        dashboard.pantry.newFridgeItem = angular.copy(MealModel.createDefaultMeal());
        dashboard.pantry.newGroceryItem = angular.copy(MealModel.createDefaultMeal());
    };

    dashboard.init();

});