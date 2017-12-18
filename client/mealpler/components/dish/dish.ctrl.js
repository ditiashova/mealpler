class DishCtrl {
    constructor(StorageService) {
        Object.assign(this, {StorageService});
    }

    copyDish(name, content) {
        this.StorageService.addFoodToStored(name, content);
    }
}

Mealpler.controller('DishCtrl', DishCtrl);