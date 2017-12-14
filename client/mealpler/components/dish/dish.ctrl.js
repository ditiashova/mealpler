Mealpler.controller('DishCtrl', DishCtrl);

function DishCtrl (StorageModel) {
    this.copyItem = (name, content) => {
        StorageModel.addFoodToStored(name, content);
    };
}