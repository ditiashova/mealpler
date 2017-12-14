Mealpler.controller('MainCtrl', MainController);
Mealpler.directive( 'mainBlock', function () {
    const link = (scope, el, attrs, controller) => {

    };
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'scripts/tmpl/mainBlock.tmpl.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        link: link
    };
});

function MainController () {
    this.title = Mealpler.titles;
    this.handlers = {
        showShopListHandlers: []
    };
    this.isShopListOpened = false;
    this.toggleShopListState = () => {
        this.isShopListOpened = !this.isShopListOpened;
        this.runIsShopListOpenedHandlers();
    };


    this.runIsShopListOpenedHandlers = function () {
        this.handlers.showShopListHandlers.forEach(function (handler) {
            handler();
        })
    };

    this.setIsShopListOpenedHandlers = function(handler) {
        this.handlers.showShopListHandlers.push(handler);
    };
}
