Mealpler.controller('MainCtrl', MainController);
Mealpler.directive( 'mainBlock', function () {
    const link = (scope, el, attrs, controller) => {
        let a = scope.main;
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
        showShopList: []
    };
    this.openedShopList = false;
    this.toggleShopListState = () => {
        this.openedShopList = !this.openedShopList;
        this.executeShopListActions();
    };
    /*this.setShopListState = (bool) => {
        this.openShopList = bool;
    };*/
}


MainController.prototype.executeShopListActions = function () {
    this.handlers.showShopList.forEach(function (handler) {
        handler();
    })
};

MainController.prototype.setShopListShowActions = function(handler) {
    this.handlers.showShopList.push(handler);
};
