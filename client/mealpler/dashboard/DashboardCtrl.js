Mealpler.controller('DashboardCtrl', DashboardController);

function DashboardController ($rootScope, $scope, MealModel, StorageModel) {
    const dateRangePicker = $("#dateRangePicker");
    const datePicker = $("#datePicker");
    const localization = {
        "format": "DD/MM/YYYY",
        "firstDay": 1
    };
    const today = moment();

    this.grocery = {};

    this.weekStartDate = today.startOf('week');
    this.weekLength = 7;

    this.defaultRangeStart = this.weekStartDate;
    this.defaultRangeLength = 7;

    //settings for Date Range Picker
    dateRangePicker.daterangepicker({
        "locale": localization,
        "dateLimit": {
            "days": 14
        },
        "showDropdowns": true,
        "startDate": this.defaultRangeStart
    }, (start, end, label) => {
        this.defaultRangeStart = start;
        this.defaultRangeLength = end.diff(start, 'days')+1;
        this.grocery.init();
        $scope.$apply();
    });

    /*dateRangePicker.on('apply.daterangepicker', (e, picker) => {
    });*/

    //settings for Date Picker
    datePicker.daterangepicker({
        "locale": localization,
        "singleDatePicker": true,
        "showDropdowns": true,
        "startDate": this.weekStartDate
    }, (start, end, label) => {
        this.weekStartDate = start;
        this.defaultRangeStart = this.weekStartDate;
        $scope.$broadcast('refreshDataForWeek', this.weekStartDate);
        $scope.$apply();
    });

    /*datePicker.on('apply.daterangepicker', (e, picker) => {
        this.weekStartDate = picker.startDate;
        this.defaultRangeStart = this.weekStartDate;
        $scope.$broadcast('refreshDataForWeek', this.weekStartDate);
        //this.init(newStartDate);
        $scope.$apply();
    });*/

    this.switchWeek = (time) => {
        if (time === 'past') {
            const newStartDate = this.weekStartDate.subtract(1, 'day');
            this.weekStartDate = this.setNewWeekStart(newStartDate);
            this.defaultRangeStart = this.weekStartDate;
            $scope.$broadcast('refreshDataForWeek', newStartDate);
        } else if (time === 'future') {
            const newStartDate = this.weekStartDate.add(this.weekLength, 'day').add(1, 'day');
            this.weekStartDate = this.setNewWeekStart(newStartDate);
            this.defaultRangeStart = this.weekStartDate;
            $scope.$broadcast('refreshDataForWeek', newStartDate);
            //broadcast
        }
    };

    this.setNewWeekStart = (randomDate) => {
        return randomDate.startOf('week');
    };

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

    $rootScope.$on('updateShopList', () => this.grocery.init());

    this.grocery.init();

}