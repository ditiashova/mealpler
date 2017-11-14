Mealpler.controller('DashboardCtrl', function (MealModel, StorageModel) {
    let dashboard = this;
    dashboard.pantry = {};
    dashboard.pantry.fridgeList = StorageModel.getFridgeList();
    dashboard.pantry.shoppingList = StorageModel.getShoppingList();

    dashboard.init = function () {
        if (dashboard.pantry.fridgeList.length === 0) {
            dashboard.pantry.fridgeList.push(angular.copy(MealModel.createDefaultMeal()));
        }
    };

    dashboard.init();

});