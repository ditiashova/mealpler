Mealpler.controller('DashboardCtrl', function (MealModel, StorageModel) {
    let dashboard = this;
    //dashboard.pantry = {};
    dashboard.grocery = {};

    dashboard.grocery.addItem = function (newItem) {
        StorageModel.addItemToGroceryList(newItem);
        dashboard.init();
    };

    dashboard.grocery.addItems = function (listOfMeals) {
        let newItems = [];
        listOfMeals.map(a => a.mealList.forEach(b => b.type === 'product' ? newItems.push(b) : b.list.forEach(c => newItems.push(c))));
        StorageModel.addItemToGroceryList(newItems);
        dashboard.init();
    };

    dashboard.grocery.deleteItem = function (item) {
        StorageModel.deleteGroceryItem(item);
        dashboard.init();
    };

    dashboard.grocery.deleteAll = function () {
        StorageModel.deleteGrocery();
        dashboard.init();
    };

    dashboard.init = function () {
        dashboard.grocery.list = StorageModel.getStoredItem("grocery");
        dashboard.grocery.newItem = angular.copy(MealModel.createDefaultProduct());
    };

    dashboard.init();

});