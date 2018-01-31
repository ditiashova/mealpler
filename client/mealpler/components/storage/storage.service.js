class StorageService {
    constructor (UserService, Firebase, Local) {
        Object.assign(this, {UserService, Firebase, Local});
        this.handlers = [];
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
            return this.Local.getSingleDateMeals("Mealpler", date);
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

    addHandler(handler) {
        this.handlers.push(handler);
    };

    runHandlers(startDate, endDate) {
        this.handlers.datePickerHandlers.forEach((handler) => handler(startDate, endDate));
    };
}

Mealpler.service('StorageService', StorageService);