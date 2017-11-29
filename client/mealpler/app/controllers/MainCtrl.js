Mealpler.controller('MainCtrl', ['request', function (request) {
    let main = this;
    main.title = Mealpler.titles;
    main.openShopList = false;

    main.toggleShopList = function () {
        main.openShopList = !main.openShopList;
    };
}]);