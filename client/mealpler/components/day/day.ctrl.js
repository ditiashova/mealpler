class DayCtrl {
    constructor(copy, paste, notify, StorageService) {
        Object.assign(this, {copy, paste, notify, StorageService});
    }

    copyDay(content) {
        this.copy.copyFood('day', content);
    }

    pasteDay(date) {
        //const userId = this.MainCtrl.uid;
        this.paste.pasteDay(date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.notify.show('Menu has been pasted successfully.', 'add'))
            .catch((e) => console.log(e.message));
    }

    deleteDay(date) {
        //const userId = this.MainCtrl.uid;
        this.StorageService.removeSingleDateMealsList(date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.notify.show('Day has been cleaned.', 'delete'))
            .catch((e) => console.log(e.message));
    }
}

Mealpler.controller('DayCtrl', DayCtrl);