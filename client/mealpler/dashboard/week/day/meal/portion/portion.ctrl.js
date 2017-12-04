Mealpler.controller('PortionCtrl', PortionCtrl);

function PortionCtrl ($rootScope, $scope, WeekModel, MealModel) {
    this.copyFood = (name, content) => {
        StorageModel.addFoodToStored(name, content);
    };
}