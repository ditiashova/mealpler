class MainController {
    constructor ($scope) {
        Object.assign(this, {$scope});
        this.title = Mealpler.titles;
        this.handlers = {
            showShopListHandlers: []
        };
        this.isShopListOpened = false;
        this.setUserData();
    }

    setUserData() {
        this.userData = this.getUserData();
    }

    signOut() {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('userData');
            this.setUserData();
            this.$scope.$apply();
        }, null);
    }

    getUserData() {
        let userData = null;
        try {
            userData = JSON.parse(localStorage.getItem('userData'));
        } catch (error) {
            console.log(error);
        }
        return userData;
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
