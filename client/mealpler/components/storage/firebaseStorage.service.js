class FirebaseStorageService {
    constructor () {

    }


    saveUserPlannerData(date, data, id) {
        if (id) {
            firebase.database().ref('users/' + id + '/meals/' + date).set(data);
        }  else {
            localStorage.setItem(date, JSON.stringify(data));
        }
    }

    getAllDatesMealsList(id) {
        let all = [];
        return new Promise((resolve, reject) => {
            firebase.database().ref('users/' + id + '/meals').on("value", (data) => {
                all = data.val();
                resolve(all);
            }, function (errorObject) {
                reject(errorObject);
                console.log("The read failed: " + errorObject.code);
            });
        })
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

    getAllMealsForUser(id) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('users/' + id + '/meals').on("value", (data) => {
                const all = data.val();
                resolve(all);
            }, function (errorObject) {
                reject(errorObject);
                console.log("The read failed: " + errorObject.code);
            });
        });
    }

    getSingleDateMealsList(date, id) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('users/' + id + '/meals/' + date).on("value", (data) => {
                resolve(data.val());
            }, function (errorObject) {
                reject(errorObject);
                console.log("The read failed: " + errorObject.code);
            });
        })
    }

    setSingleDateMealsList(date, data, id) {
        return new Promise(() => {
            firebase.database().ref('users/' + id + '/meals/' + date).set(data);
        });
    }


    addFoodToLocalStore(name, content) {
        localStorage.setItem(name, JSON.stringify(content));
    };

    getLocalyStoredItem(name) {
        let storedItem = [];
        try {
            storedItem = JSON.parse(localStorage.getItem(name));
        } catch (error) {
            console.log(error);
        }
        return storedItem != null ? storedItem : [];
    };
}

Mealpler.service('FirebaseStorageService', FirebaseStorageService);