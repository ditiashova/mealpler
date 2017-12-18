class DayCtrl {
    constructor(StorageService) {
        Object.assign(this, {StorageService});
    }

    copyFood(name, content) {
        this.StorageService.addFoodToStored(name, content);
    }
}

Mealpler.controller('DayCtrl', DayCtrl);