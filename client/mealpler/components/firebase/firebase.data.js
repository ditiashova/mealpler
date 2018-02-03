class FirebaseData {
    constructor () {}

    /** @return Promise<void> */
    getUserProfile(id) {
        return firebase.database().ref(`users/${id}`).once("value", (snapshot) => snapshot, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
        });
    }

    /** @return Promise<void> */
    getAllMeals(id) {
        return firebase.database().ref(`users/${id}/food`).once('value').then(data => data.val());
    }

    /** @return Promise<void> */
    getSingleDateMeals(id, date) {
        return firebase.database().ref(`users/${id}/food/${date}`).once('value').then((data) => data.val());
    }

    /** @return Promise<void> */
    setSingleDateMeals(id, date, data) {
        return firebase.database().ref(`users/${id}/food/${date}`).set(data);
    }

    /** @return Promise<void> */
    removeDate(id, date) {
        return firebase.database().ref(`users/${id}/food/${date}`).remove();
    }

    /** @return Promise<void> */
    registerNewUserInDatabase(user, localData) {
        const newUser = new User(user.uid, user.email, user.displayName, user.photoURL);

        if (localData) newUser.food = angular.copy(localData);

        return this._setNewFirebaseUserData(newUser, user.uid);
    }

    /** @return Promise<void> */
    _setNewFirebaseUserData(data, id) {
        return firebase.database().ref(`users/${id}`).set(data);
    }

}

Mealpler.service('FirebaseData', FirebaseData);