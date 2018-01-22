class FirebaseStorageService {
    constructor () {

    }

    /** @return Promise<void> */
    getAllMealsForUser(id) {
        return firebase.database().ref(`users/${id}/food`).once('value').then(data => data.val());
    }

    /** @return Promise<void> */
    getSingleDateMealsList(date, id) {
        return firebase.database().ref('users/' + id + '/food/' + date).once('value').then(function(data) {
            return data.val();
        });
    }

    /** @return Promise<void> */
    setSingleDateMealsList(date, data, id) {
        return firebase.database().ref('users/' + id + '/food/' + date).set(data);
    }
}

Mealpler.service('FirebaseStorageService', FirebaseStorageService);