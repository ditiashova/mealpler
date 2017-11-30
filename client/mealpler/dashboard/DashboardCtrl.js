Mealpler.controller('DashboardCtrl', DashboardController);

function DashboardController ($rootScope, $scope, MealModel, StorageModel) {
    const dateRangePicker = $('input[name="daterangepicker"]');
    this.grocery = {};
    this.grocery.rangeStart = moment().startOf('week');
    this.grocery.rangeLength = 7;

    //settings for Date Range Picker
    dateRangePicker.daterangepicker({
        "dateLimit": {
            "days": 14
        },
        "showDropdowns": true,
        "startDate": moment().startOf('week')
    }, () => {});

    dateRangePicker.on('apply.daterangepicker', (e, picker) => {
        /*const newStartDate = picker.startDate;
        this.init(newStartDate);
        $scope.$apply();*/
    });

    this.grocery.addItem = (newItem) => {
        StorageModel.addItemToGroceryList(newItem);
        this.init();
    };

    this.grocery.addItems = (listOfMeals) => {
        let newItems = [];
        listOfMeals.map(a => a.mealList.forEach(b => b.type === 'product' ? newItems.push(b) : b.list.forEach(c => newItems.push(c))));
        StorageModel.addItemToGroceryList(newItems);
        this.init();
    };

    this.grocery.deleteItem = (item) => {
        StorageModel.deleteGroceryItem(item);
        this.init();
    };

    this.grocery.deleteAll = () => {
        StorageModel.deleteGrocery();
        this.init();
    };

    this.init = () => {
        const storedItems = MealModel.findDateRangeMealList(this.grocery.rangeStart, this.grocery.rangeLength);
        this.grocery.list = MealModel.extractAndSortProducts(storedItems);
        //this.grocery.newItem = angular.copy(MealModel.createDefaultProduct());
    };

    $rootScope.$on('newItemAdded', () => this.init());

    this.init();

}