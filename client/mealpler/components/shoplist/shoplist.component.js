Mealpler.component('shopList', {
    bindings: {
        week: '<'
    },
    require: {},
    transclude: true,
    controller: function ($scope, WeekService, ShopListService) {
        this.title = Mealpler.titles.shopList;

        this.$onChanges = () => {
            this.shoplist = ShopListService.extractAndSortProducts(this.week);
        };

        this.closeShopList = () => {
            $scope.$emit(EventType.SHOPLIST_CLOSED);
        }
    },
    templateUrl: 'scripts/components/shoplist/shopList.tmpl.html',
});