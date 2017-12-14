class DishCtrl {
    constructor(StorageModel) {
        Object.assign(this, {StorageModel});
    }

    copyDish(name, content) {
        this.StorageModel.addFoodToStored(name, content);
    }
}

Mealpler.controller('DishCtrl', DishCtrl);