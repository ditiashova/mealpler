class MainController {
    constructor ($scope, AuthService) {
        Object.assign(this, {$scope, AuthService});
        this.title = Mealpler.titles;

        this.handlers = {
            showShopListHandlers: [],
            databaseHandlers: [],
            authHandlers: []
        };

        this.isShopListOpened = false;

        this.$scope.$on(EventType.AUTH, () => this.setUserProfileAndLoginStatus());
        this.$scope.$on(EventType.SHOPLIST_CLOSED, () => this.toggleShopListState());

    }
    setUserProfileAndLoginStatus() {
        this.userIsLogged = this.AuthService.isLogged();
        this.user = this.AuthService.getUser();
        this.$scope.$apply();
    }

    /*addDatabaseHandlers(handler) {
        this.handlers.databaseHandlers.push(handler);
    }

    runDatabaseHandlers(response, date) {
        //if id is undefined, handlers will be run without any data = localStorage is used
        //!undefined -> true
        //if (!id)
            this.handlers.databaseHandlers.forEach((handler) => handler(response, date));
    };*/

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
        this.AuthService.signOut().then(() => {
            //this.setUserProfileAndLoginStatus();
        //this.userName = null;
        //this.userPhoto = null;
        //this.uid = false;
            //this.runDatabaseHandlers();
        }).catch((e) => console.log('Sign out failed due to: ' + e.message));

    }

    toggleShopListState() {
        this.isShopListOpened = !this.isShopListOpened;
        //this.runIsShopListOpenedHandlers(this.isShopListOpened);
        this.$scope.$broadcast(EventType.SHOPLIST_TOGGLED, this.isShopListOpened)
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
