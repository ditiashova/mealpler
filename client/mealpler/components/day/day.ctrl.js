class DayCtrl {
    constructor(LocalStorageService, notify) {
        Object.assign(this, {LocalStorageService, notify});
    }

    copyFood(name, content) {
        this.LocalStorageService.setDataToLocalStorage(name, content);
        this.notify.displayNotify('Food has been copied successfully.', 'copy');
    }
}

Mealpler.controller('DayCtrl', DayCtrl);