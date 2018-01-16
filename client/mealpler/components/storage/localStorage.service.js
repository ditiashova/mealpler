class LocalStorageService {
    constructor () {

    }

    setDataToLocalStorage(name, content) {
        localStorage.setItem(name, JSON.stringify(content));
    };

    getLocalStorageData(name) {
        let storedItem = [];
        try {
            storedItem = JSON.parse(localStorage.getItem(name));
        } catch (error) {
            console.log(error);
        }
        return storedItem != null ? storedItem : [];
    };

}

Mealpler.service('LocalStorageService', LocalStorageService);