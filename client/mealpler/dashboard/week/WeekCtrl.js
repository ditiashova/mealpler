Mealpler.controller('WeekCtrl', function (WeekModel, MealModel, StorageModel) {
    let week = this;
    week.range = []; //dates for 7 days
    week.day = {};
    week.activeTab = 'product';
    //week.day.addProduct = true;

    const datePicker = $('input[name="daterange"]');

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
        week.day.refreshCurrentMeal();
        week.currentMeal = angular.copy(meal);
        week.currentDate = date;
        week.day.createNewProduct(week.newProducts);
        //week.day.createNewProduct(week.newRecipe);
    };

    week.day.addNewProducts = function (meal,date,newProducts) {
        if (!newProducts.hasIngredients) {
            meal.mealList = meal.mealList.concat(newProducts.list);
        } else if (newProducts.hasIngredients) {
            let recipe = angular.copy(MealModel.createDefaultRecipe());
            recipe.list = recipe.list.concat(newProducts.list);
            recipe.name = newProducts.mealName;
            recipe.quantity = newProducts.portionQuantity;
            meal.mealList.push(recipe);
        }
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
        week.newProducts.hasIngredients = false;
        week.newProducts.portionQuantity = 1;
        //week.newProducts.list.push(angular.copy(MealModel.createDefaultProduct()));
        //week.newRecipe = angular.copy(MealModel.createDefaultRecipe());
    };

    week.day.starMenu = function (menu) {
        StorageModel.addMenuToStarred(menu);
    };

    week.day.pasteStarredMenu = function (forThisDay) {
        let star = StorageModel.getStarredMenu();
        let dat = MealModel.createNewDay(forThisDay);
        star.forEach(a => dat.mealsList.push(a));
        MealModel.updateMealsList(forThisDay.fullDate, dat);
        loadMealsDataForWeek();
    };

    week.day.mealModal = function (tab) {
        week.activeTab = tab;
        //week.day.addProduct = tab === 0;
        //week.day.addRecipe = !week.day.addProduct;
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
            d.mealsList = angular.copy(MealModel.findMealList(d));
            d.mealsList.map(a => a.mealList.length > 0 ? a.hasMeals = true : a.hasMeals = false);
        });
    }
});

