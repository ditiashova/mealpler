class ShoplistCtrl {
    constructor(StorageModel, MealModel, ShopListService) {
        Object.assign(this, {StorageModel, MealModel, ShopListService});

        const today = moment();
        this.title = Mealpler.titles.shopList;
        this.rangeStart = today.startOf('week');
        this.rangeLength = 7;
        this.init();
    }
    addItem(newItem) {
        this.StorageModel.addItemToGroceryList(newItem);
        this.init();
    }

    addItems(listOfMeals) {
        let newItems = [];
        listOfMeals.map(a => a.mealList.forEach(b => b.type === 'product' ? newItems.push(b) : b.list.forEach(c => newItems.push(c))));
        this.StorageModel.addItemToGroceryList(newItems);
        this.grocery.init();
    }

    deleteItem(item) {
        this.StorageModel.deleteGroceryItem(item);
        this.grocery.init();
    }

    deleteAll() {
        this.StorageModel.deleteGrocery();
        this.grocery.init();
    }

    init(start, duration) {
        const newStart = start || this.rangeStart;
        const newDuration = duration || this.rangeLength;
        const storedItems = this.MealModel.findDateRangeMealList(newStart, newDuration);
        this.list = this.ShopListService.extractAndSortProducts(storedItems);
    }
}

Mealpler.controller('ShoplistCtrl', ShoplistCtrl);