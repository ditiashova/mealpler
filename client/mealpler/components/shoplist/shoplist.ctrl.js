class ShoplistCtrl {
    constructor(StorageService, MealModel, ShopListService, MealService, $timeout) {
        Object.assign(this, {StorageService, MealModel, ShopListService, MealService, $timeout});

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
            this.MealService.findDateRangeMealList(newStart, newDuration, userId).then((response) => {
                const storedItems = angular.copy(response);
                this.$timeout(() => {
                    this.list = this.ShopListService.extractAndSortProducts(storedItems);
                })
            });
        } else {
            const storedItems = this.MealService.organizeDataForWeek(newStart, newDuration, data);
            this.$timeout(() => {
                this.list = this.ShopListService.extractAndSortProducts(storedItems);
            });
        }


        /*this.MealService.findDateRangeMealList(newStart, newDuration, userId).then((response) => {
            const storedItems = angular.copy(response);
            this.$timeout(() => {
                this.list = this.ShopListService.extractAndSortProducts(storedItems);
            })
        });   */
    }
}

Mealpler.controller('ShoplistCtrl', ShoplistCtrl);