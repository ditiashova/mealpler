Mealpler.controller('ShoplistCtrl', ShoplistCtrl);

function ShoplistCtrl ($rootScope, $scope, StorageModel, MealModel) {
    const today = moment();
    const dateRangePicker = $("#dateRangePicker");
    const localization = {
        "format": "DD/MM/YYYY",
        "firstDay": 1
    };

    this.rangeStart = today.startOf('week');
    this.rangeLength = 7;

    //settings for Date Range Picker
    dateRangePicker.daterangepicker({
        "locale": localization,
        "dateLimit": {
            "days": 14
        },
        "showDropdowns": true,
        "startDate": this.rangeStart
    }, (start, end, label) => {
        this.rangeStart = start;
        this.rangeLength = end.diff(start, 'days')+1;
        this.init(this.rangeStart, this.rangeLength);
        $scope.$apply();
    });

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
        this.init(date, this.rangeLength);
    });
}