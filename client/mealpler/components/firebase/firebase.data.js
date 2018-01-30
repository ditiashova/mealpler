class FirebaseData {
    constructor (Local) {
        Object.assign(this, {Local});
    }

    getUserProfile(id) {
        return firebase.database().ref(`users/${id}`).once("value", (snapshot) => snapshot, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
        });
    }

    getAllMeals(id) {
        return firebase.database().ref(`users/${id}/food`).once('value').then(data => data.val());
    }

    getSingleDateMeals(id, date) {
        return firebase.database().ref(`users/${id}/food/${date}`).once('value').then((data) => data.val())
    }

    setSingleDateMeals(id, date, data) {
        return firebase.database().ref(`users/${id}/food/${date}`).set(data);
    }

    removeDate(id, date) {
        return firebase.database().ref(`users/${id}/food/${date}`).remove();
    }

    subscribeToUpdates(id) {
        return firebase.database().ref(`users/${id}/food`).on("value", (data) => data.val(), (errorObject) => {
            console.log("The read failed: " + errorObject.code);
        })
    }

    createNewUserInDatabase(user, localData) {
        const newUser = new User(user.uid, user.email, user.displayName, user.photoURL);
        //const localStoredData = this.Local.getLocalStorageData("Mealpler");

        if (localData) newUser.food = angular.copy(localData);

        return this._setNewFirebaseUserData(newUser, user.uid);
            //.then(() => this.Local.removeLocalStorageData("Mealpler"))
            //.catch(console.log);
    }

    /** @return Promise<void> */
    _setNewFirebaseUserData(data, id) {
        return firebase.database().ref(`users/${id}`).set(data);
    }

    removeFirebaseEvents(id) {
        return firebase.database().ref(`users/${id}/food`).off("value");
    }


}

Mealpler.service('Firebase', FirebaseData);