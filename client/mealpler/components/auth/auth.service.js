class AuthService {
    constructor (FirebaseAuth, Firebase, Local) {
        Object.assign(this, {FirebaseAuth, Firebase, Local});
        window.addEventListener('load', () => this.init());
    }

    init() {
        this.FirebaseAuth.$onAuthStateChanged((user) => {
            this._setLoginStatus(!!user);
            if (user) {
                // User is signed in.
                this.Firebase.getUserProfile(user.uid)
                    .then(data => {
                        if (!data.val()) {
                            this.registerNewUser(user);
                        } else {
                            //if user is logged and it's not a new user, it's better to keep localStorages clean
                            this.Local.removeLocalStorageData('Mealpler');
                        }
                        this._setUserProfile(user);
                    });
                    //.then(() => this.Firebase.subscribeToUpdates(user.uid));
            } else {
                //remove listeners from firebase
            }
        });
    }

    registerNewUser(user) {
        const localData = this.Local.getLocalStorageData("Mealpler");
        this.Firebase.createNewUserInDatabase(user, localData)
            .then(() => this.Local.removeLocalStorageData("Mealpler"))
            .catch(console.log);
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
        return this.FirebaseAuth.$signOut();
    }
}

Mealpler.service('Auth', AuthService);