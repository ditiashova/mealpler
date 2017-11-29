Mealpler.controller('WeekCtrl', function ($rootScope, $scope, WeekModel, MealModel, StorageModel) {
    const today = moment();
    let week = this;
    week.day = {}; // here goes all methods for the day events
    week.activeTab = 'product';
    week.today = moment().format('YYYY-M-D');
    //week.day.addProduct = true;

    const datePicker = $('input[name="daterange"]');

    //settings for Date Range Picker
    datePicker.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        "startDate": new Date()
    }, function(start, end, label) {

    });

    datePicker.on('apply.daterangepicker', function (e, picker) {
        const newStartDate = picker.startDate;
        week.init(newStartDate);
        $scope.$apply();
    });

    //day settings
    week.day.setCurrentMeal = function (meal, date) {
        week.day.refreshCurrentMeal();
        week.currentMeal = angular.copy(meal);
        week.currentDate = date;
        week.day.createNewProduct(week.newProducts);
        week.day.createNewProduct(week.newRecipe);
    };

    week.day.addNewProducts = function (meal,date,newProduct) {
        meal.mealList = meal.mealList.concat(newProduct.list);
        MealModel.saveMealInfo(meal,date);
        week.day.refreshCurrentMeal();
        loadMealsDataForWeek();
    };

    week.day.addNewRecipe = function (meal, date, newRecipe) {
        meal.mealList.push(newRecipe);
        MealModel.saveMealInfo(meal,date);
        week.day.refreshCurrentMeal();
        loadMealsDataForWeek();
    };

    week.day.deleteMeal = function (meal, date) {
        MealModel.deleteAllMeal(meal, date);
        week.day.refreshCurrentMeal();
        loadMealsDataForWeek();
    };

    week.day.deleteItem = function (item, mealName, date) {
        MealModel.deleteItemMeal(item, mealName, date);
        loadMealsDataForWeek();
    };

    week.day.createNewProduct = function (forMeal) {
        forMeal.list.push(angular.copy(MealModel.createDefaultProduct()));
    };

    week.day.refreshCurrentMeal = function () {
        week.currentMeal = {}; week.currentDate = '';
        week.day.refreshNewItems();
    };

    week.day.refreshNewItems = function () {
        week.newProducts = {};
        week.newProducts.list = [];
        week.newRecipe = angular.copy(MealModel.createDefaultRecipe());
    };

    week.day.copyDayMenu = function (menu) {
        StorageModel.addMenuToStarred(menu);
    };

    week.day.pasteDayMenu = function (forThisDay) {
        let star = StorageModel.getStarredMenu();
        let dat = MealModel.createNewDay(forThisDay);
        star.forEach(a => dat.mealsList.push(a));
        MealModel.updateMealsList(forThisDay.format("YYYY-M-D"), dat);
        loadMealsDataForWeek();
    };

    week.day.mealModal = function (tab) {
        week.activeTab = tab;
        //week.day.addProduct = tab === 0;
        //week.day.addRecipe = !week.day.addProduct;
    };

    week.switchWeek = function (time) {
        if (time === 'past') {
            week.init(week.range[0].subtract(1, 'day'));
        } else if (time === 'future') {
            week.init(week.range[6].add(1, 'day'));
        }
    };

    week.init = function (forDate) {
        week.range = []; //dates for 7 days
        calculateWeekRange(moment(forDate).startOf('week'));
        //get meal's list for each day of week range
        loadMealsDataForWeek();
        week.day.refreshCurrentMeal();
    };

    week.init(today);

    function calculateWeekRange(firstDay) {
        for (let i = 0; i < 7; i++) {
            let nextDay = moment(firstDay).add(i, 'day');
            nextDay.id = i;
            week.range.push(nextDay);
        }

        week.firstDay = week.range[0];
        week.lastDay = week.range[6];
    }

    function loadMealsDataForWeek() {
        week.range.map(function (d) {
            d.mealsList = angular.copy(MealModel.findMealList(d));
            d.mealsList.map(a => a.mealList.length > 0 ? a.hasMeals = true : a.hasMeals = false);
        });
    }
});

