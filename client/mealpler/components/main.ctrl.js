class MainController {
    constructor () {
        this.title = Mealpler.titles;
        this.handlers = {
            showShopListHandlers: []
        };
        this.isShopListOpened = false;
    }

    toggleShopListState() {
        this.isShopListOpened = !this.isShopListOpened;
        this.runIsShopListOpenedHandlers();
    }

    runIsShopListOpenedHandlers() {
        this.handlers.showShopListHandlers.forEach((handler) => handler());
    }

    setIsShopListOpenedHandlers(handler) {
        this.handlers.showShopListHandlers.push(handler);
    }
}

Mealpler.controller('MainCtrl', MainController);
