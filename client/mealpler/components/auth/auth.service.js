class AuthService {
    constructor ($rootScope, FirebaseAuth, FirebaseData, Local) {
        Object.assign(this, {$rootScope, FirebaseAuth, FirebaseData, Local});
        //window.addEventListener('load', () => this.init());
        this.init();
        this.handlers = [];
    }

    init() {
        this.FirebaseAuth.$onAuthStateChanged((user) => {
            this._setLoginStatus(!!user);
            if (user) {
                // User is signed in.
                this.FirebaseData.getUserProfile(user.uid)
                    .then(data => {
                        if (!data.val()) {
                            this.registerNewUser(user);
                        } else {
                            //if user is logged and it's not a new user, it's better to keep localStorages clean
                            this.Local.removeLocalStorageData('Mealpler');
                        }
                        this._setUserProfile(user);
                        //this._runHandlers();
                    });
                    //.then(() => this.FirebaseData.subscribeToUpdates(user.uid));
            } else {
                this._setUserProfile();
                //this._runHandlers();
                //remove listeners from firebase
            }

        });
    }

    registerNewUser(user) {
        const localData = this.Local.getLocalStorageData("Mealpler");
        this.FirebaseData.createNewUserInDatabase(user, localData)
            .then(() => this.Local.removeLocalStorageData("Mealpler"))
            .catch((e) => console.log('Failed to register new user due to: '+ e.message));
    }

    getUserId() {
        return this.User.id;
    }

    getUserProfile() {
        return this.User;
    }

    _setUserProfile(user) {
        if (user) {
            this.User = new User(user.uid, user.email, user.displayName, user.photoURL)
        }
        else this.User = new User();

        this.$rootScope.$broadcast('authUpdated');
    }
    getLoginStatus() {
        return this.isLogged;
    }

    _setLoginStatus(status) {
        this.isLogged = status;
    }

    signOut() {
        //this.FirebaseData.removeFirebaseEvents(this.User.id);
        return this.FirebaseAuth.$signOut();
    }
}

Mealpler.service('AuthService', AuthService);