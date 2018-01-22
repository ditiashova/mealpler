Mealpler.directive('shopList', function () {
    const link = (scope, el, attrs, [MainCtrl, DashboardCtrl]) => {
        const ListCtrl = scope.listCtrl;

        ListCtrl.closeShopList = () => {
            MainCtrl.toggleShopListState();
        };

        MainCtrl.addDatabaseHandlers((data, date, id, duration) => {
            ListCtrl.init(date, duration, id, data);
        });

        DashboardCtrl.addShopListHandlers((date, duration) => {
            const id = MainCtrl.uid;
            ListCtrl.init(date, duration, id);
        });
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        require: ['^^mainBlock', '^^dashboard'],
        templateUrl: 'scripts/components/shoplist/shopList.tmpl.html',
        controller: 'ShoplistCtrl',
        controllerAs: 'listCtrl',
        link: link
    };
});