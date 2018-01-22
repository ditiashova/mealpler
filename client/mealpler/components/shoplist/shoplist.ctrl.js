class ShoplistCtrl {
    constructor(ShopListService, MealService, $timeout, WeekService) {
        Object.assign(this, {ShopListService, MealService, $timeout, WeekService});

        const today = moment();
        this.title = Mealpler.titles.shopList;
        this.rangeStart = today.startOf('week');
        this.rangeLength = 7;
        //this.init();
    }

    init(start, duration, userId, data) {
        const newStart = start || this.rangeStart;
        const newDuration = duration || this.rangeLength;
        if (userId) {
            this.WeekService.findDateRangeMealList(newStart, newDuration, userId).then((response) => {
                const storedItems = angular.copy(response);
                this.$timeout(() => {
                    this.componentsList = this.ShopListService.extractAndSortProducts(storedItems);
                })
            });
        } else {
            const storedItems = this.WeekService.organizeDataForWeek(newStart, newDuration, data);
            this.$timeout(() => {
                this.componentsList = this.ShopListService.extractAndSortProducts(storedItems);
            });
        }
    }
}

Mealpler.controller('ShoplistCtrl', ShoplistCtrl);