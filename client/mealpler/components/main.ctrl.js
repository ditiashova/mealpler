class MainController {
    constructor ($scope, Auth) {
        Object.assign(this, {$scope, Auth});
        this.title = Mealpler.titles;

        this.handlers = {
            showShopListHandlers: []
        };

        this.isShopListOpened = false;

        this.userName = null;
        this.userPhoto = null;
        this.userIsLogged = null;
        this.Auth.$onAuthStateChanged((firebaseUserData) => {
            this.userIsLogged = !!firebaseUserData;
            if (!!firebaseUserData) this.setUserData(firebaseUserData);
        });
    }

    setUserData(data) {
        this.userName = data.displayName;
        this.userPhoto = data.photoURL;
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
        this.runIsShopListOpenedHandlers();
    }

    runIsShopListOpenedHandlers() {
        this.handlers.showShopListHandlers.forEach((handler) => handler());
    }

    addIsShopListOpenedHandler(handler) {
        this.handlers.showShopListHandlers.push(handler);
    }
}

Mealpler.controller('MainCtrl', MainController);
