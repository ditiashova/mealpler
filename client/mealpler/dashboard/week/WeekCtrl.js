Mealpler.controller('WeekCtrl', WeekController);

function WeekController ($rootScope, $scope, WeekModel, MealModel, StorageModel) {
    const today = moment();
    const datePicker = $('input[name="datepicker"]');

    this.day = {}; // here goes all methods for the day events
    this.activeTab = 'product';
    this.today = moment().format('YYYY-M-D');
    this._weekDuration = 7;

    //settings for Date Picker
    datePicker.daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        "startDate": new Date()
    }, (start, end, label) => {

    });

    datePicker.on('apply.daterangepicker', (e, picker) => {
        const newStartDate = picker.startDate;
        this.init(newStartDate);
        $scope.$apply();
    });

    //day settings
    this.day.setCurrentMeal = (meal, date) => {
        this.day.refreshCurrentMeal();
        this.currentMeal = angular.copy(meal);
        this.currentDate = date;
        this.day.createNewProduct(this.newProducts);
        this.day.createNewProduct(this.newRecipe);
    };

    this.day.addNewItems = (type, forMeal, forDay, newItems) => {
        if (type === 'list') {
            forMeal.mealList = forMeal.mealList.concat(newItems.list);
        } else if (type === 'recipe') {
            forMeal.mealList.push(newItems);
        } else if (type === 'stored') {
            forMeal.mealList = forMeal.mealList.concat(newItems.mealList);
        }
        MealModel.saveMealInfo(forMeal,forDay);
        this.day.refreshCurrentMeal();
        this._loadMealsDataForWeek();
    };

    this.day.deleteMeal = (meal, date) => {
        MealModel.deleteAllMeal(meal, date);
        this.day.refreshCurrentMeal();
        this._loadMealsDataForWeek();
    };

    this.day.deleteItem = (item, mealName, date) => {
        MealModel.deleteItemMeal(item, mealName, date);
        this._loadMealsDataForWeek();
    };

    this.day.deleteIngredient = (item, recipe, mealName, date) => {
        MealModel.deleteIngredient(item, recipe, mealName, date);
        this._loadMealsDataForWeek();
    };

    this.day.createNewProduct = (forMeal) => {
        forMeal.list.push(angular.copy(MealModel.createDefaultProduct()));
    };

    this.day.refreshCurrentMeal = () => {
        this.currentMeal = {}; this.currentDate = '';
        this.day.refreshNewItems();
    };

    this.day.refreshNewItems = () => {
        this.newProducts = {};
        this.newProducts.list = [];
        this.newRecipe = angular.copy(MealModel.createDefaultRecipe());
    };

    this.day.copyFood = (name, content) => {
        StorageModel.addFoodToStored(name, content);
    };

    this.day.pasteMenu = (forDay) => {
        let stored = StorageModel.getStoredItem("menu");
        let dat = MealModel.createNewDay(forDay);
        stored.forEach(a => dat.mealsList.push(a));
        MealModel.updateMealsList(forDay.format("YYYY-M-D"), dat);
        this._loadMealsDataForWeek();
    };

    this.day.pasteFood = (name, forMeal, forDay) => {
        let stored = StorageModel.getStoredItem(name);
        this.day.addNewItems('stored', forMeal, forDay, stored);
    };

    this.day.mealModal = (tab) => {
        this.activeTab = tab;
        //this.day.addProduct = tab === 0;
        //this.day.addRecipe = !this.day.addProduct;
    };

    this.switchWeek = (time) => {
        if (time === 'past') {
            this.init(this.range[0].subtract(1, 'day'));
        } else if (time === 'future') {
            this.init(this.range[6].add(1, 'day'));
        }
    };

    this.init = (forDate) => {
        this.range = []; //dates for 7 days
        this._calculateWeekRange(moment(forDate).startOf('week'));
        //get meal's list for each day of week range
        this._loadMealsDataForWeek();
        this.day.refreshCurrentMeal();
    };



    this._calculateWeekRange = (firstDay) => {
        for (let i = 0; i < this._weekDuration; i++) {
            let nextDay = moment(firstDay).add(i, 'day');
            nextDay.id = i;
            nextDay.dayName = moment(nextDay).format("YYYY-M-D");
            this.range.push(nextDay);
        }

        this.firstDay = this.range[0];
        this.lastDay = this.range[this._weekDuration - 1];
    };

    this._loadMealsDataForWeek = () => {
        const storedMeals = MealModel.findDateRangeMealList(this.firstDay, this._weekDuration);
        this.range.map(d => {
            d.mealsList = angular.copy(storedMeals.filter(s => s.dayName === d.dayName)[0].list);
            d.mealsList.map(a => a.mealList.length > 0 ? a.hasMeals = true : a.hasMeals = false);
        });
        $rootScope.$emit('updateShopList');
    };

    this.init(today);
}
