class MainController {
    constructor ($scope, UserService) {
        Object.assign(this, {$scope, UserService});
        this.title = Mealpler.titles;

        this.handlers = {
            showShopListHandlers: [],
            databaseHandlers: [],
            authHandlers: []
        };

        this.isShopListOpened = false;

        this.setUserProfileAndLoginStatus();


        //this.userName = null;
        //this.userPhoto = null;
        //this.userIsLogged = null;

        /*this.Auth.$onAuthStateChanged((firebaseUserData) => {
            this.userIsLogged = !!firebaseUserData;
            this.uid = this.userIsLogged ? firebaseUserData.uid : !!firebaseUserData;
            if (this.userIsLogged) {
                this.setUserData(firebaseUserData);
                firebase.database().ref('users/' + firebaseUserData.uid).once("value", (snapshot) => {
                    if (!snapshot.val()) {
                        this.UserService.createNewUserInDatabase(firebaseUserData);
                    } else {
                        //if user is logged and it's not a new user, it's better to keep localStorages clean
                        this.UserService.cleanLocalData();
                    }

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
                firebase.database().ref('users/' + firebaseUserData.uid + '/food').on("value", (data) => {
                    /!*if (this.newWeekStartDate) {
                        this.runDatabaseHandlers(void 0, data.val(), this.newWeekStartDate);
                    } else {
                        this.runDatabaseHandlers(void 0, data.val());
                    }*!/
                    this.runDatabaseHandlers(void 0, data.val());
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            } else {
                this.runDatabaseHandlers();
            }
        });*/
    }

    setUserProfileAndLoginStatus() {
        this.userIsLogged = this.UserService.getIsLogged();
        this.user = this.UserService.getUserProfile();
    }

    addDatabaseHandlers(handler) {
        this.handlers.databaseHandlers.push(handler);
    }

    runDatabaseHandlers(response, date) {
        //if id is undefined, handlers will be run without any data = localStorage is used
        //!undefined -> true
        //if (!id)
            this.handlers.databaseHandlers.forEach((handler) => handler(response, date));
    };

    /*createNewUserInDatabase(userData) {
        const newUser = {
            id: userData.uid,
            email: userData.email,
            name: userData.displayName
        };

        this.usersRef.child(userData.uid).set(newUser);
    }*/

    /*setUserData(data) {
        this.userName = data.displayName || 'Friend';
        this.userPhoto = data.photoURL || '';
    }*/

    signOut() {
        this.Auth.signOut().then(() => {
            this.setUserProfileAndLoginStatus();
        //this.userName = null;
        //this.userPhoto = null;
        //this.uid = false;
            this.runDatabaseHandlers();
        }).catch(function(error) {
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
