Mealpler.controller('DashboardCtrl', function (MealModel, StorageModel) {
    let dashboard = this;
    //dashboard.pantry = {};
    dashboard.fridge = {};
    dashboard.grocery = {};

    dashboard.fridge.addItem = function (newItem) {
        StorageModel.addItemToFridgeList(newItem);
        dashboard.init();
    };

    dashboard.grocery.addItem = function (newItem) {
        StorageModel.addItemToGroceryList(newItem);
        dashboard.init();
    };

    dashboard.fridge.deleteItem = function (item) {
        StorageModel.deleteFridgeItem(item);
        dashboard.init();
    };



    dashboard.fridge.changeQuantity = function (oldItem) {
        StorageModel.updateFridgeItem(oldItem);
        dashboard.init();
    };

    dashboard.fridge.deleteAll = function () {
        StorageModel.deleteFridge();
        dashboard.init();
    };

    dashboard.init = function () {
        dashboard.fridge.list = StorageModel.getFridgeList();
        dashboard.grocery.list = StorageModel.getGroceryList();
        dashboard.fridge.newItem = angular.copy(MealModel.createDefaultMeal());
        dashboard.grocery.newItem = angular.copy(MealModel.createDefaultMeal());
    };

    dashboard.init();

});