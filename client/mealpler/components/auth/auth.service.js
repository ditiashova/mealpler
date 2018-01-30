class AuthService {
    constructor ($firebaseAuth, Firebase, Local) {
        Object.assign(this, {$firebaseAuth, Firebase, Local});
        window.addEventListener('load', () => this.init());
    }

    init() {
        this.$firebaseAuth.$onAuthStateChanged((user) => {
            this._setLoginStatus(!!user);
            if (user) {
                // User is signed in.
                this.Firebase.getUserProfile(user.uid)
                    .then(data => {
                        if (!data.val()) {
                            this.Firebase.createNewUserInDatabase(user);
                        } else {
                            //if user is logged and it's not a new user, it's better to keep localStorages clean
                            this.Local.removeLocalStorageData('Mealpler');
                        }
                        this._setUserProfile(user);
                    })
                    .then(() => this.Firebase.subscribeToUpdates(user.uid));
            } else {
                //remove listeners from firebase
            }
        });
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
    }
    getLoginStatus() {
        return this.isLogged;
    }

    _setLoginStatus(status) {
        this.isLogged = status;
    }

    signOut() {
        this.Firebase.removeFirebaseEvents(this.User.id);
        return this.$firebaseAuth.$signOut();
    }
}

Mealpler.service('Auth', AuthService);