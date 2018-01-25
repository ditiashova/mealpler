class StorageService {
    constructor () {}

    /** @return Promise<void> */
    getAllMealsForUser(id) {
        if (id) {
            return firebase.database().ref(`users/${id}/food`).once('value').then(data => data.val());
        } else {
            return Promise.resolve(this.getLocalStorageData("Mealpler"));
        }
    }

    /** @return Promise<void> */
    getSingleDateMealsList(date, id) {
        if (id) {
            return firebase.database().ref('users/' + id + '/food/' + date).once('value').then((data) => data.val())
        } else {
            const storedData = this.getLocalStorageData("Mealpler");
            return Promise.resolve((storedData && storedData[date]) ? storedData[date] : null);
        }
    }

    /** @return Promise<void> */
    setSingleDateMealsList(date, data, id) {
        if (id) {
            return firebase.database().ref('users/' + id + '/food/' + date).set(data);
        } else {
            let storedData = this.getLocalStorageData("Mealpler");

            if (!storedData) storedData = {};
            storedData[date] = data;

            return Promise.resolve(this.setDataToLocalStorage("Mealpler", storedData));
        }
    }

    removeSingleDateMealsList(date, id) {
        if (id) {
            return firebase.database().ref('users/' + id + '/food/' + date).remove();
        } else {
            const storedData = this.getLocalStorageData("Mealpler");
            delete storedData[date];

            return Promise.resolve(this.setDataToLocalStorage("Mealpler", storedData))
        }
    }

    setDataToLocalStorage(name, content) {
        localStorage.setItem(name, angular.toJson(content));
    };

    /** @return [] || {Object} */
    getLocalStorageData(name) {
        let storedItem = [];
        try {
            storedItem = JSON.parse(localStorage.getItem(name));
        } catch (error) {
            console.log(error);
        }
        return storedItem/* != null ? storedItem : []*/;
    };

    /** @return Promise<void> */
    setNewFirebaseUserData(data, id) {
        return firebase.database().ref('users/' + id).set(data);
    }

    removeLocalStorageData(name) {
        localStorage.removeItem(name);
    }
}

Mealpler.service('StorageService', StorageService);