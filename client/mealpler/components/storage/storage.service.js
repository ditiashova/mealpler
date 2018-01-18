class StorageService {
    constructor () {

    }


    saveUserPlannerData(date, data, id) {
        if (id) {
            firebase.database().ref('users/' + id + '/meals/' + date).set(data);
        }  else {
            localStorage.setItem(date, JSON.stringify(data));
        }
    }

    getMealsList(forDate, id) {
        let all = [];
        if (id) {
            return new Promise((resolve, reject) => {
                firebase.database().ref('users/' + id + '/meals/' + forDate).on("value", (data) => {
                    all = data.val();
                    resolve(all);
                }, function (errorObject) {
                    reject(errorObject);
                    console.log("The read failed: " + errorObject.code);
                });
            })
        } else {
            try {
                all = JSON.parse(localStorage.getItem(forDate));
            } catch (error) {
                console.log(error);
            }
            return all;
        }
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

Mealpler.service('StorageService', StorageService);