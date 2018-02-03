class DayCtrl {
    constructor(CopyService, PasteService, NotifyService, StorageService) {
        Object.assign(this, {CopyService, PasteService, NotifyService, StorageService});
    }

    copyDay(content) {
        this.CopyService.copyFood('day', content);
    }

    pasteDay(date) {
        this.PasteService.pasteDay(date)
            .then(() => this.NotifyService.show('Menu has been pasted successfully.', 'add'))
            .catch((e) => console.log('Pasting menu failed due to: ' + e.message));
    }

    deleteDay(date) {
        this.StorageService.removeSingleDateMealsList(date)
            .then(() => this.NotifyService.show('Day has been cleaned.', 'delete'))
            .catch((e) => console.log('Deleting day failed due to: ' + e.message));
    }
}

Mealpler.controller('DayCtrl', DayCtrl);