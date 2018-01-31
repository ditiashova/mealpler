class DayCtrl {
    constructor(CopyService, PasteService, NotifyService, StorageService) {
        Object.assign(this, {CopyService, PasteService, NotifyService, StorageService});
    }

    copyDay(content) {
        this.CopyService.copyFood('day', content);
    }

    pasteDay(date) {
        //const userId = this.MainCtrl.uid;
        this.PasteService.pasteDay(date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.NotifyService.show('Menu has been pasted successfully.', 'add'))
            .catch((e) => console.log(e.message));
    }

    deleteDay(date) {
        //const userId = this.MainCtrl.uid;
        this.StorageService.removeSingleDateMealsList(date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.NotifyService.show('Day has been cleaned.', 'delete'))
            .catch((e) => console.log(e.message));
    }
}

Mealpler.controller('DayCtrl', DayCtrl);