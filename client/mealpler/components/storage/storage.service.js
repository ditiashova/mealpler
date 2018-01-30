class StorageService {
    constructor (UserService, Firebase, Local) {
        Object.assign(this, {UserService, Firebase, Local});
    }

    /** @return Promise<void> */
    getAllMealsForUser() {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.Firebase.getAllMeals(id);
        } else {
            return this.Local.getLocalStorageData("Mealpler");
        }
    }

    /** @return Promise<void> */
    getSingleDateMealsList(date) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.Firebase.getSingleDateMeals(date, id);
        } else {
            const storedData = this.Local.getLocalStorageData("Mealpler");
            return (storedData && storedData[date]) ? storedData[date] : null;
        }
    }

    /** @return Promise<void> */
    setSingleDateMealsList(date, data) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.Firebase.setSingleDateMeals(id, date, data);
        } else {
            let storedData = this.Local.getLocalStorageData("Mealpler");

            if (!storedData) storedData = {};
            storedData[date] = data;

            return this.Local.setDataToLocalStorage("Mealpler", storedData);
        }
    }

    removeSingleDateMealsList(date) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.Firebase.removeDate(id, date);
        } else {
            const storedData = this.Local.getLocalStorageData("Mealpler");
            delete storedData[date];

            return this.Local.setDataToLocalStorage("Mealpler", storedData);
        }
    }
}

Mealpler.service('StorageService', StorageService);