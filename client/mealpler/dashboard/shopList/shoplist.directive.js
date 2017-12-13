Mealpler.directive('shopList', function () {
    const link = (scope, el, attrs, controllers) => {
        const mainCtrl = controllers[0];
        const dashboardCtrl = controllers[1];
        const listCtrl = scope.listCtrl;
        //controller.showSideBar();
        listCtrl.closeShopList = () => {
            mainCtrl.toggleShopListState();
            //controller.showSideBar();
        };

        dashboardCtrl.setShopListActions((date, duration) => listCtrl.init(date, duration));
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        require: ['^^mainBlock', '^^dashboard'],
        templateUrl: 'scripts/dashboard/shopList/shopList.tmpl.html',
        controller: 'ShoplistCtrl',
        controllerAs: 'listCtrl',
        link: link
    };
});