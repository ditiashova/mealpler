Mealpler.controller('WeekCtrl', function (WeekModel, MealModel) {
    let week = this;
    week.range = []; //dates for 7 days
    week.day = {};

    const datePicker = $('input[name="daterange"]');
    const defaultMeal = {
        /*"id": Math.random(),*/
        "name": "",
        "type": "product",
        "quantity": 1,
        "hasIngredients": false
    };

    //settings for Date Range Picker
    datePicker.daterangepicker({
        "dateLimit": {
            "days": 7
        },
        "startDate": new Date()
    }, function(start, end, label) {

    });

    datePicker.on('apply.daterangepicker', function (e, picker) {
        const startDate = picker.startDate._d.getDay();
        week.viewDate = new Date(startDate);
    });

    //moment
    week.firstDayOfWeek = moment(); //today

    //day settings
    week.day.setCurrentMeal = function (meal, date) {
        week.currentMeal = angular.copy(meal);
        week.currentDate = moment(date);
        week.day.createNewMealItem(week.newMealItems);
    };

    week.day.saveMeal = function (meal,date,newMeal) {
        meal.mealList = meal.mealList.concat(newMeal.mealList);
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

    week.day.createNewMealItem = function (forMeal) {
        forMeal.mealList.push(angular.copy(defaultMeal));
    };

    week.day.refreshCurrentMeal = function () {
        week.currentMeal = {}; week.currentDate = '';
        week.day.refreshNewMealItems();
    };

    week.day.refreshNewMealItems = function () {
        week.newMealItems = {};
        week.newMealItems.mealList = [];
    };

    week.init = function () {
        calculateWeekRange();
        //get meal's list for each day of week range
        loadMealsDataForWeek();
        week.day.refreshCurrentMeal();
    };

    week.init();

    function calculateWeekRange() {
        for (let i = 0; i < 7; i++) {
            let nextDay = moment().add(i, 'day');
            nextDay.id = i;
            week.range.push(nextDay);
        }
        week.range.map(function(d) {
            d.dayName = moment(d).format('dddd');
            d.shortDate = moment(d).format('dddd, Do');
            d.fullDate = moment(d).format('YYYY-M-D')});
    }

    function loadMealsDataForWeek() {
        week.range.map(function (d) {
            d.mealsList = angular.copy(MealModel.findMealList(d.fullDate));
            d.mealsList.map(a => a.mealList.length > 0 ? a.hasMeals = true : a.hasMeals = false);
        });
    }
});

