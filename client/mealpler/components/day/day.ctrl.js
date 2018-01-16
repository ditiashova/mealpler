class DayCtrl {
    constructor(LocalStorageService, notify, Auth, DayService) {
        Object.assign(this, {LocalStorageService, notify, Auth, DayService});
        this.Auth.$onAuthStateChanged((firebaseUserData) => {
            const userIsLogged = !!firebaseUserData;
            if (userIsLogged) {
                this.userPlannerId = firebaseUserData.uid;
            }
        });
    }

    copyFood(name, content) {
        this.LocalStorageService.setDataToLocalStorage(name, content);
        this.notify.displayNotify('Food has been copied successfully.', 'copy');
    }

    pasteMenu(date) {
        return new Promise((resolve, reject)=> {
            resolve(this.DayService.pasteMenuForDay(date, this.userPlannerId));
        });
    }
}

Mealpler.controller('DayCtrl', DayCtrl);