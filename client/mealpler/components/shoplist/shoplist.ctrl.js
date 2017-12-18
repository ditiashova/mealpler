class ShoplistCtrl {
    constructor(StorageService, MealModel, ShopListService, MealService) {
        Object.assign(this, {StorageService, MealModel, ShopListService, MealService});

        const today = moment();
        this.title = Mealpler.titles.shopList;
        this.rangeStart = today.startOf('week');
        this.rangeLength = 7;
        this.init();
    }
    addItem(newItem) {
        this.StorageService.addItemToGroceryList(newItem);
        this.init();
    }

    addItems(listOfMeals) {
        let newItems = [];
        listOfMeals.map(a => a.mealList.forEach(b => b.type === 'product' ? newItems.push(b) : b.list.forEach(c => newItems.push(c))));
        this.StorageService.addItemToGroceryList(newItems);
        this.grocery.init();
    }

    deleteItem(item) {
        this.StorageService.deleteGroceryItem(item);
        this.grocery.init();
    }

    deleteAll() {
        this.StorageService.deleteGrocery();
        this.grocery.init();
    }

    init(start, duration) {
        const newStart = start || this.rangeStart;
        const newDuration = duration || this.rangeLength;
        const storedItems = this.MealService.findDateRangeMealList(newStart, newDuration);
        this.list = this.ShopListService.extractAndSortProducts(storedItems);
    }
}

Mealpler.controller('ShoplistCtrl', ShoplistCtrl);