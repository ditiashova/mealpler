Mealpler.component('shopList', {
    bindings: {
        week: '<'
    },
    require: {},
    transclude: true,
    controller: function ($scope, WeekService, ShopListService, $timeout) {
        this.title = Mealpler.titles.shopList;
        this.$onInit = () => {
            this.shoplist = ShopListService.extractAndSortProducts(this.week);
            //this.MainCtrl.addDatabaseHandlers((data, date, duration) => this.init(date, duration, data));

            //this.Dashboard.addShopListHandlers((date, duration) => this.init(date, duration));

            //this.init(this.startDate);
            this.closeShopList = () => {
                $scope.$emit('shoplistIsClosed');
                //this.MainCtrl.toggleShopListState();
            }
        };

        /*this.init = (start = this.startDate, duration = this.rangeDuration, data) => {
            if (data || data === null) {
                //data could be null if there is no data for user, but undefined data means no data from database
                const storedItems = WeekService.organizeDataForWeek(start, duration, data);
                $timeout(() => {
                    return Promise.resolve(this.componentsList = ShopListService.extractAndSortProducts(storedItems));
                });
            } else {
                return WeekService.findDateRangeMealList(start, duration).then((response) => {
                    const storedItems = angular.copy(response);
                    $timeout(() => {
                        this.componentsList = ShopListService.extractAndSortProducts(storedItems);
                    })
                });
            }
        };*/


    },
    templateUrl: 'scripts/components/shoplist/shopList.tmpl.html',
});