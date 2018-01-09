class DayCtrl {
    constructor(StorageService, notify) {
        Object.assign(this, {StorageService, notify});
    }

    copyFood(name, content) {
        this.StorageService.addFoodToStored(name, content);
        this.notify.displayNotify('Food has been copied successfully.', 'copy');
    }
}

Mealpler.controller('DayCtrl', DayCtrl);