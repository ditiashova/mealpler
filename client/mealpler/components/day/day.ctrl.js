class DayCtrl {
    constructor(StorageModel) {
        Object.assign(this, {StorageModel});
    }

    copyFood(name, content) {
        this.StorageModel.addFoodToStored(name, content);
    }
}

Mealpler.controller('DayCtrl', DayCtrl);