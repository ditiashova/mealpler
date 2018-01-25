class UserService {
    constructor(StorageService) {
        Object.assign(this, {StorageService});
    }

    createNewUserInDatabase(userData) {
        const newUser = new User(userData.uid, userData.email, userData.displayName);
        const localStoredData = this.StorageService.getLocalStorageData("Mealpler");

        if (localStoredData) newUser.food = angular.copy(localStoredData);

        this.StorageService.setNewFirebaseUserData(newUser, userData.uid)
            .then(() => this.cleanLocalData())
            .catch(console.log);
    }

    cleanLocalData() {
        return Promise.resolve(this.StorageService.removeLocalStorageData("Mealpler"));
    }

    removeFirebaseEvent(userId) {
        return firebase.database().ref(`users/${userId}/food`).off("value");
    }
}
Mealpler.service('UserService', UserService);