class AuthService {
    constructor ($rootScope, FirebaseAuth, FirebaseData, LocalStorageData) {
        Object.assign(this, {$rootScope, FirebaseAuth, FirebaseData, LocalStorageData});
        this._init();
    }

    isLogged() {
        return this.userIsLogged;
    }

    getUser() {
        return this.user;
    }

    getUserId() {
        return this.user.id;
    }

    signOut() {
        return this.FirebaseAuth.$signOut();
    }

    _setUser(user) {
        if (user) {
            this.user = new User(user.uid, user.email, user.displayName, user.photoURL)
        }
        else this.user = new User();

        this.$rootScope.$broadcast(EventType.AUTH);
    }

    _setUserIsLogged(status) {
        this.userIsLogged = status;
    }

    _registerNewUser(user) {
        const localData = this.LocalStorageData.getLocalStorageData("Mealpler");
        this.FirebaseData.registerNewUserInDatabase(user, localData)
            .then(() => this.LocalStorageData.removeLocalStorageData("Mealpler"))
            .catch((e) => console.log('Failed to register new user due to: '+ e.message));
    }

    _init() {
        this.FirebaseAuth.$onAuthStateChanged((user) => {
            this._setUserIsLogged(!!user);
            if (user) {
                // User is signed in.
                this.FirebaseData.getUserProfile(user.uid)
                    .then(data => {
                        if (!data.val()) {
                            this._registerNewUser(user);
                        } else {
                            //if user is logged and it's not a new user, it's better to keep localStorages clean
                            this.LocalStorageData.removeLocalStorageData('Mealpler');
                        }
                        this._setUser(user);
                    });
            } else {
                this._setUser();
            }
        });
    }
}

Mealpler.service('AuthService', AuthService);