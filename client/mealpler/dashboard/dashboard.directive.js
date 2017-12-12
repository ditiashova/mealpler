Mealpler.directive( 'dashboard', function () {
    const link = (scope, el, attrs, controller) => {
        let dashboardCtrl = scope.dashboardCtrl;
        //controller.showSideBar();
        dashboardCtrl.showShopList = controller.openedShopList;

        controller.setShopListShowActions(() => {
            dashboardCtrl.showShopList = controller.openedShopList;
        });
    };
    return {
        restrict: 'E',
        scope: {},
        require: '^^mainBlock',
        templateUrl: 'scripts/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboardCtrl',
        link: link
    };
});