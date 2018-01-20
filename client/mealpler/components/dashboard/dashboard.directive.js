Mealpler.directive( 'dashboard', function () {
    const link = (scope, el, attrs, [MainCtrl]) => {
        const dashboardCtrl = scope.dashboardCtrl;

        MainCtrl.addIsShopListOpenedHandler((state) =>
            dashboardCtrl.setIsShopListOpened(state)
        );
    };

    return {
        restrict: 'E',
        scope: {},
        require: ['^^mainBlock'],
        templateUrl: 'scripts/components/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboardCtrl',
        link: link
    };
});