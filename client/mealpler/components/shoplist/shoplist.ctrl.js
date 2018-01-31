class ShoplistCtrl {
    constructor(ShopListService, $timeout, WeekService) {
        Object.assign(this, {ShopListService, $timeout, WeekService});

        this.title = Mealpler.titles.shopList;
        this.rangeStart = moment().startOf('week');
        this.rangeLength = 7;
    }

    init(start = this.rangeStart, duration = this.rangeLength, userId, data) {
        if ((data || data === null) && !userId) {
            //data could be null if there is no data for user, but undefined data means no data from database
            const storedItems = this.WeekService.organizeDataForWeek(start, duration, data);
            this.$timeout(() => {
                return Promise.resolve(this.componentsList = this.ShopListService.extractAndSortProducts(storedItems));
            });
        } else {
            return this.WeekService.findDateRangeMealList(start, duration).then((response) => {
                const storedItems = angular.copy(response);
                this.$timeout(() => {
                    this.componentsList = this.ShopListService.extractAndSortProducts(storedItems);
                })
            });
        }
    }
}

Mealpler.controller('ShoplistCtrl', ShoplistCtrl);