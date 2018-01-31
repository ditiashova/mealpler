class StorageService {
    constructor ($rootScope, FirebaseData, LocalStorageData, AuthService) {
        Object.assign(this, {$rootScope, FirebaseData, LocalStorageData, AuthService});
    }

    /** @return Promise<void> */
    getAllMealsForUser() {
        if (this.AuthService.isLogged()) {
            const id = this.AuthService.getUserId();
            return this.FirebaseData.getAllMeals(id);
        } else {
            return Promise.resolve(this.LocalStorageData.getLocalStorageData("Mealpler"));
        }
    }

    /** @return Promise{Meals} */
    getSingleDateMealsList(date) {
        if (this.AuthService.isLogged()) {
            const id = this.AuthService.getUserId();
            return this.FirebaseData.getSingleDateMeals(id, date);
        } else {
            return Promise.resolve(this.LocalStorageData.getSingleDateMeals("Mealpler", date));
        }
    }

    /** @return Promise<void> */
    setSingleDateMealsList(date, data) {
        if (this.AuthService.isLogged()) {
            const id = this.AuthService.getUserId();
            return this.FirebaseData.setSingleDateMeals(id, date, data).then(() => {
                this.$rootScope.$broadcast('newMealsData');
            });
        } else {
            let storedData = this.LocalStorageData.getLocalStorageData("Mealpler");

            if (!storedData) storedData = {};
            storedData[date] = data;

            return this.LocalStorageData.setDataToLocalStorage("Mealpler", storedData).then(() => {
                this.$rootScope.$broadcast('newMealsData');
            });
        }
    }

    removeSingleDateMealsList(date) {
        if (this.AuthService.isLogged()) {
            const id = this.AuthService.getUserId();
            return this.FirebaseData.removeDate(id, date).then(() => {
                this.$rootScope.$broadcast('newMealsData');
            });
        } else {
            const storedData = this.LocalStorageData.getLocalStorageData("Mealpler");
            delete storedData[date];

            return this.LocalStorageData.setDataToLocalStorage("Mealpler", storedData).then(() => {
                this.$rootScope.$broadcast('newMealsData');
            });
        }
    }
}

Mealpler.service('StorageService', StorageService);