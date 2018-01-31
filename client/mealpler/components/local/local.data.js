class LocalStorageData {
    constructor () {}

    setDataToLocalStorage(name, content) {
        return Promise.resolve(localStorage.setItem(name, angular.toJson(content)));
    };

    /** @return {Object} */
    getLocalStorageData(name) {
        let storedItem = [];
        try {
            storedItem = JSON.parse(localStorage.getItem(name));
        } catch (e) {
            console.log('Read from LocalStorage failed due to: ' + e.message);
        }
        return storedItem;
    };

    removeLocalStorageData(name) {
        return Promise.resolve(localStorage.removeItem(name));
    }

    getSingleDateMeals(name, date) {
        const storedData = this.getLocalStorageData(name);
        return (storedData && storedData[date]) ? storedData[date] : null;
    }

}

Mealpler.service('LocalStorageData', LocalStorageData);