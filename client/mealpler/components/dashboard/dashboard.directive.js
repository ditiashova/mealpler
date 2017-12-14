Mealpler.directive( 'dashboard', function () {
    const link = (scope, el, attrs, controller) => {
        const dashboardCtrl = scope.dashboardCtrl;
        const mainCtrl = controller;

        setIsShopListOpened();

        //todo rename setIsShoplistActive
        mainCtrl.setIsShopListOpenedHandlers(() => setIsShopListOpened());

        function setIsShopListOpened() {
            dashboardCtrl.isShopListOpened = mainCtrl.isShopListOpened;
        }
    };
    return {
        restrict: 'E',
        scope: {},
        require: '^^mainBlock',
        templateUrl: 'scripts/components/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboardCtrl',
        link: link
    };
});