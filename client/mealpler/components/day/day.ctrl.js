class DayCtrl {
    constructor(LocalStorageService, notify, DayService) {
        Object.assign(this, {LocalStorageService, notify, DayService});
    }

    copyFood(name, content) {
        this.LocalStorageService.setDataToLocalStorage(name, content);
        this.notify.displayNotify('Food has been copied successfully.', 'copy');
    }

    pasteMenu(date, id) {
        return this.DayService.pasteMenuForDay(date, id)
    }
}

Mealpler.controller('DayCtrl', DayCtrl);