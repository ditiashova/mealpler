class LocalStorageData {
    constructor () {}

    setDataToLocalStorage(name, content) {
        return Promise.resolve(localStorage.setItem(name, angular.toJson(content)));
    };

    /** @return Promise<void> */
    getLocalStorageData(name) {
        let storedItem = [];
        try {
            storedItem = JSON.parse(localStorage.getItem(name));
        } catch (error) {
            console.log(error);
        }
        return Promise.resolve(storedItem);
    };

    removeLocalStorageData(name) {
        return Promise.resolve(localStorage.removeItem(name));
    }

}

Mealpler.service('Local', LocalStorageData);