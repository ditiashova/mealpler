Mealpler.directive( 'dashboard', function () {
    const link = (scope, el, attrs, controller) => {
        const dashboardCtrl = scope.dashboardCtrl;
        const mainCtrl = controller;

        dashboardCtrl.showShopList = mainCtrl.openedShopList;

        mainCtrl.setShopListShowActions(() => {
            dashboardCtrl.showShopList = mainCtrl.openedShopList;
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