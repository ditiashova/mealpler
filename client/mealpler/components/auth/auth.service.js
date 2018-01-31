class AuthService {
    constructor ($rootScope, FirebaseAuth, FirebaseData, LocalStorageData) {
        Object.assign(this, {$rootScope, FirebaseAuth, FirebaseData, LocalStorageData});
        this.init();
        this.handlers = [];
    }

    init() {
        this.FirebaseAuth.$onAuthStateChanged((user) => {
            this._setIsLogged(!!user);
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

    _registerNewUser(user) {
        const localData = this.LocalStorageData.getLocalStorageData("Mealpler");
        this.FirebaseData.registerNewUserInDatabase(user, localData)
            .then(() => this.LocalStorageData.removeLocalStorageData("Mealpler"))
            .catch((e) => console.log('Failed to register new user due to: '+ e.message));
    }

    isLogged() {
        return this.isLogged;
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

        this.$rootScope.$broadcast('authUpdated');
    }

    _setIsLogged(status) {
        this.isLogged = status;
    }
}

Mealpler.service('AuthService', AuthService);