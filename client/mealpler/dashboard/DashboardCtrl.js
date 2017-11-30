Mealpler.controller('DashboardCtrl', DashboardController);

function DashboardController ($rootScope, $scope, MealModel, StorageModel) {
    const dateRangePicker = $('input[name="daterangepicker"]');
    this.grocery = {};
    this.defaultRangeStart = moment().startOf('week');
    this.defaultRangeLength = 7;

    //settings for Date Range Picker
    dateRangePicker.daterangepicker({
        "dateLimit": {
            "days": 14
        },
        "showDropdowns": true,
        "startDate": moment().startOf('week')
    }, () => {});

    dateRangePicker.on('apply.daterangepicker', (e, picker) => {
        this.defaultRangeStart = picker.startDate;
        this.defaultRangeLength = picker.endDate.diff(picker.startDate, 'days')+1;
        this.grocery.init();
        $scope.$apply();
    });

    this.grocery.addItem = (newItem) => {
        StorageModel.addItemToGroceryList(newItem);
        this.grocery.init();
    };

    this.grocery.addItems = (listOfMeals) => {
        let newItems = [];
        listOfMeals.map(a => a.mealList.forEach(b => b.type === 'product' ? newItems.push(b) : b.list.forEach(c => newItems.push(c))));
        StorageModel.addItemToGroceryList(newItems);
        this.grocery.init();
    };

    this.grocery.deleteItem = (item) => {
        StorageModel.deleteGroceryItem(item);
        this.grocery.init();
    };

    this.grocery.deleteAll = () => {
        StorageModel.deleteGrocery();
        this.grocery.init();
    };

    this.grocery.init = () => {
        const storedItems = MealModel.findDateRangeMealList(this.defaultRangeStart, this.defaultRangeLength);
        this.grocery.list = MealModel.extractAndSortProducts(storedItems);
        //this.grocery.newItem = angular.copy(MealModel.createDefaultProduct());
    };

    $rootScope.$on('newItemAdded', () => this.grocery.init());

    this.grocery.init();

}