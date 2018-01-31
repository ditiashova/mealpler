class StorageService {
    constructor ($rootScope, UserService, FirebaseData, Local) {
        Object.assign(this, {$rootScope, UserService, FirebaseData, Local});
    }

    /** @return Promise<void> */
    getAllMealsForUser() {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.FirebaseData.getAllMeals(id);
        } else {
            return Promise.resolve(this.Local.getLocalStorageData("Mealpler"));
        }
    }

    /** @return Promise{Meals} */
    getSingleDateMealsList(date) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.FirebaseData.getSingleDateMeals(id, date);
        } else {
            return Promise.resolve(this.Local.getSingleDateMeals("Mealpler", date));
        }
    }

    /** @return Promise<void> */
    setSingleDateMealsList(date, data) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.FirebaseData.setSingleDateMeals(id, date, data).then(() => {
                this.$rootScope.$broadcast('newMealsData');
            });
        } else {
            let storedData = this.Local.getLocalStorageData("Mealpler");

            if (!storedData) storedData = {};
            storedData[date] = data;

            return this.Local.setDataToLocalStorage("Mealpler", storedData).then(() => {
                this.$rootScope.$broadcast('newMealsData');
            });
        }
    }

    removeSingleDateMealsList(date) {
        if (this.UserService.getIsLogged()) {
            const id = this.UserService.getUserId();
            return this.FirebaseData.removeDate(id, date).then(() => {
                this.$rootScope.$broadcast('newMealsData');
            });
        } else {
            const storedData = this.Local.getLocalStorageData("Mealpler");
            delete storedData[date];

            return this.Local.setDataToLocalStorage("Mealpler", storedData).then(() => {
                this.$rootScope.$broadcast('newMealsData');
            });
        }
    }
}

Mealpler.service('StorageService', StorageService);