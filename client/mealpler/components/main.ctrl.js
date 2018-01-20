class MainController {
    constructor ($scope, Auth) {
        Object.assign(this, {$scope, Auth});
        this.title = Mealpler.titles;

        this.handlers = {
            showShopListHandlers: [],
            databaseHandlers: [],
            authHandlers: []
        };

        this.usersRef = firebase.database().ref('users');

        this.isShopListOpened = false;

        this.userName = null;
        this.userPhoto = null;
        this.userIsLogged = null;

        this.Auth.$onAuthStateChanged((firebaseUserData) => {
            this.userIsLogged = !!firebaseUserData;
            if (this.userIsLogged) {
                this.setUserData(firebaseUserData);
                firebase.database().ref('users/' + firebaseUserData.uid).on("value", (snapshot) => {
                    if (!snapshot.val()) {
                        this.createNewUserInDatabase(firebaseUserData);
                    }
                    this.uid = firebaseUserData.uid;
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
                firebase.database().ref('users/' + firebaseUserData.uid + '/food').on("value", (data) => {
                    if (this.newWeekStartDate) {
                        this.runDatabaseHandlers(data.val(), this.newWeekStartDate);
                    } else {
                        this.runDatabaseHandlers(data.val());
                    }
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
        });
    }

    addDatabaseHandlers(handler) {
        this.handlers.databaseHandlers.push(handler);
    }

    runDatabaseHandlers(response, date, id) {
        this.handlers.databaseHandlers.forEach((handler) => handler(response, date, id));
    };

    createNewUserInDatabase(userData) {
        const newUser = {
            id: userData.uid,
            email: userData.email,
            name: userData.displayName
        };

        this.usersRef.child(userData.uid).set(newUser);
    }

    setUserData(data) {
        this.userName = data.displayName || 'Friend';
        this.userPhoto = data.photoURL || '';
    }

    signOut() {
        this.Auth.$signOut().then(function() {
            this.userName = null;
            this.userPhoto = null;
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    }

    toggleShopListState() {
        this.isShopListOpened = !this.isShopListOpened;
        this.runIsShopListOpenedHandlers(this.isShopListOpened);
    }

    /**
     *
     * @param {Boolean} state
     */
    runIsShopListOpenedHandlers(state) {
        this.handlers.showShopListHandlers.forEach((handler) => handler(state));
    }

    addIsShopListOpenedHandler(handler) {
        this.handlers.showShopListHandlers.push(handler);
    }
}

Mealpler.controller('MainCtrl', MainController);
