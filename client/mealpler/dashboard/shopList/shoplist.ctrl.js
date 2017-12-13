Mealpler.controller('ShoplistCtrl', ShoplistCtrl);

function ShoplistCtrl ($rootScope, $scope, StorageModel, MealModel) {
    const today = moment();

    this.title = Mealpler.titles.shopList;

    this.rangeStart = today.startOf('week');
    this.rangeLength = 7;

    this.addItem = (newItem) => {
        StorageModel.addItemToGroceryList(newItem);
        this.init();
    };

    this.addItems = (listOfMeals) => {
        let newItems = [];
        listOfMeals.map(a => a.mealList.forEach(b => b.type === 'product' ? newItems.push(b) : b.list.forEach(c => newItems.push(c))));
        StorageModel.addItemToGroceryList(newItems);
        this.grocery.init();
    };

    this.deleteItem = (item) => {
        StorageModel.deleteGroceryItem(item);
        this.grocery.init();
    };

    this.deleteAll = () => {
        StorageModel.deleteGrocery();
        this.grocery.init();
    };

    this.init = (start, duration) => {
        if (!start || !duration) {
            start = this.rangeStart;
            duration = this.rangeLength;
        }
        const storedItems = MealModel.findDateRangeMealList(start, duration);
        this.list = MealModel.extractAndSortProducts(storedItems);
    };

    this.init();

    $scope.$on('updateShopList', (e, date) => {
        this.rangeStart = date;
        this.init(date, this.rangeLength);
    });
}