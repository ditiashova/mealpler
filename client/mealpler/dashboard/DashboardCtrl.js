Mealpler.controller('DashboardCtrl', function (MealModel, StorageModel) {
    let dashboard = this;
    dashboard.pantry = {};

    dashboard.pantry.shoppingList = StorageModel.getShoppingList();

    dashboard.pantry.addItemToFridge = function (newItem) {
        StorageModel.addItemToFridgeList(newItem);
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
        dashboard.pantry.shoppingList = StorageModel.getShoppingList();
        dashboard.pantry.newFridgeItem = angular.copy(MealModel.createDefaultMeal());
    };

    dashboard.init();

});