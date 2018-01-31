class MainController {
    constructor ($scope, Auth, UserService) {
        Object.assign(this, {$scope, Auth, UserService});
        this.title = Mealpler.titles;

        this.handlers = {
            showShopListHandlers: [],
            databaseHandlers: [],
            authHandlers: []
        };

        this.isShopListOpened = false;

        this.$scope.$on('userUpdated', () => this.setUserProfileAndLoginStatus());

        //this.UserService.addHandler(() => this.setUserProfileAndLoginStatus());

    }

    $onInit() {

    }

    setUserProfileAndLoginStatus() {
        this.userIsLogged = this.UserService.getIsLogged();
        this.user = this.UserService.getUserProfile();
        this.$scope.$apply();
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
        }).catch((e) => console.log('Sign out failed due to: ' + e.message));

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
