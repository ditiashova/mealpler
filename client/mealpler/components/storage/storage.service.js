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
            return Promise.resolve(this.Local.getLocalStorageData("Mealpler"));
        }
    }

    /** @return Promise<void> */
    getSingleDateMealsList(date) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.Firebase.getSingleDateMeals(date, id);
        } else {
            return Promise.resolve(this.Local.getSingleDateMeals("Mealpler", date));
        }
    }

    /** @return Promise<void> */
    setSingleDateMealsList(date, data) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            this.Firebase.setSingleDateMeals(id, date, data);
        } else {
            let storedData = this.Local.getLocalStorageData("Mealpler");

            if (!storedData) storedData = {};
            storedData[date] = data;

            this.Local.setDataToLocalStorage("Mealpler", storedData);
        }

        return this.runHandlers();

    }

    removeSingleDateMealsList(date) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            this.Firebase.removeDate(id, date);
        } else {
            const storedData = this.Local.getLocalStorageData("Mealpler");
            delete storedData[date];

            this.Local.setDataToLocalStorage("Mealpler", storedData);
        }
        return this.runHandlers(date);
    }

    addHandler(handler) {
        this.handlers.push(handler);
    };

    runHandlers(startDate, endDate) {
        return this.handlers.forEach((handler) => handler(startDate, endDate));
    };
}

Mealpler.service('StorageService', StorageService);