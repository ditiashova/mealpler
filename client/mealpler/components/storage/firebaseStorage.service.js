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
        /*return new Promise((resolve, reject) => {
            firebase.database().ref('users/' + id + '/meals').on("value", (data) => {
                const all = data.val();
                resolve(all);
            }, function (errorObject) {
                reject(errorObject);
                console.log("The read failed: " + errorObject.code);
            });
        });*/
        return firebase.database().ref('users/' + id + '/meals').once('value').then(function(data) {
            return data.val();
        });
    }

    /** @return Promise<void> */
    getSingleDateMealsList(date, id) {
        return firebase.database().ref('users/' + id + '/meals/' + date).once('value').then(function(data) {
            return data.val();
        });
    }

    /** @return Promise<void> */
    setSingleDateMealsList(date, data, id) {
        return firebase.database().ref('users/' + id + '/meals/' + date).set(data);
    }
}

Mealpler.service('FirebaseStorageService', FirebaseStorageService);