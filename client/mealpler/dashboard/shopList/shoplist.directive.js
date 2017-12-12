Mealpler.directive('shopList', function () {
    const link = (scope, el, attrs, controller) => {
        const mainCtrl = controller;
        const listCtrl = scope.listCtrl;
        //controller.showSideBar();
        listCtrl.closeShopList = () => {
            mainCtrl.toggleShopListState();
            //controller.showSideBar();
        };

    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        require: '^^mainBlock',
        templateUrl: 'scripts/dashboard/shopList/shopList.tmpl.html',
        controller: 'ShoplistCtrl',
        controllerAs: 'listCtrl',
        link: link
    };
});