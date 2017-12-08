Mealpler.controller('DayCtrl', DayCtrl);

function DayCtrl ($rootScope, $scope, MealModel, StorageModel) {

    this.copyFood = (name, content) => {
        StorageModel.addFoodToStored(name, content);
    };

    this.pasteMenu = (forDay) => {
        let stored = StorageModel.getStoredItem("menu");
        let dat = MealModel.createNewDay(forDay);
        stored.forEach(a => dat.mealsList.push(a));
        MealModel.updateMealsList(forDay.format("YYYY-M-D"), dat);
    };
}