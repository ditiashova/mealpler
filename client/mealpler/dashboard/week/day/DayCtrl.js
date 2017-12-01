Mealpler.controller('DayCtrl', DayCtrl);

function DayCtrl ($rootScope, $scope, MealModel, StorageModel) {
    this.activeTab = 'product';

    this.copyFood = (name, content) => {
        StorageModel.addFoodToStored(name, content);
    };

    this.deleteItem = (item, mealName, date) => {
        MealModel.deleteItemMeal(item, mealName, date);
        $rootScope.$broadcast('refreshDataForWeek');
        //this._loadMealsDataForWeek(); //emit event for updating week data
    };



    this.createNewProduct = (forMeal) => {
        forMeal.list.push(angular.copy(MealModel.createDefaultProduct()));
    };

    this.refreshNewItems = () => {
        this.newProducts = {};
        this.newProducts.list = [];
        this.newProducts.list.push(angular.copy(MealModel.createDefaultProduct()));
        this.newRecipe = angular.copy(MealModel.createDefaultRecipe());
        this.newRecipe.list.push(angular.copy(MealModel.createDefaultProduct()));
    };

    this.refreshCurrentMeal = () => {
        this.currentMeal = {}; this.currentDate = '';
    };

    this.setCurrentMeal = (meal, date) => { //when modal opens
        this.refreshCurrentMeal();
        this.refreshNewItems();
        this.currentMeal = angular.copy(meal);
        this.currentDate = date;
        //this.createNewProduct(this.newProducts);
        //this.createNewProduct(this.newRecipe);
        console.log(this.newProducts.list);
    };

    this.deleteIngredient = (item, recipe, mealName, date) => {
        MealModel.deleteIngredient(item, recipe, mealName, date);
        $rootScope.$broadcast('refreshDataForWeek');
        //this._loadMealsDataForWeek(); //emit event for updating week data
    };

    this.deleteMeal = (meal, date) => {
        MealModel.deleteAllMeal(meal, date);
        this.refreshCurrentMeal();
        $rootScope.$broadcast('refreshDataForWeek');
        //this._loadMealsDataForWeek();
    };

    this.addNewItems = (type, forMeal, forDay, newItems) => {
        if (type === 'list') {
            forMeal.mealList = forMeal.mealList.concat(newItems.list);
        } else if (type === 'recipe') {
            forMeal.mealList.push(newItems);
        } else if (type === 'stored') {
            forMeal.mealList = forMeal.mealList.concat(newItems.mealList);
        }
        MealModel.saveMealInfo(forMeal,forDay);
        this.refreshCurrentMeal();
        $rootScope.$broadcast('refreshDataForWeek');
        //this._loadMealsDataForWeek(); //emit event for updating week data
    };

    this.pasteFood = (name, forMeal, forDay) => {
        let stored = StorageModel.getStoredItem(name);
        this.addNewItems('stored', forMeal, forDay, stored);
    };

    this.pasteMenu = (forDay) => {
        let stored = StorageModel.getStoredItem("menu");
        let dat = MealModel.createNewDay(forDay);
        stored.forEach(a => dat.mealsList.push(a));
        MealModel.updateMealsList(forDay.format("YYYY-M-D"), dat);
        $rootScope.$broadcast('refreshDataForWeek');
        //this._loadMealsDataForWeek(); //emit event for updating week data
    };

    this.setMealModal = (tab) => {
        this.activeTab = tab;
    };

    this.refreshNewItems();

    $rootScope.$on("refreshCurrentMeal", () => this.refreshCurrentMeal());




    /*let day = this;
    let defaultProduct = {
        /!*"id": Math.random(),*!/
        "name": "",
        "type": "product",
        "quantity": 1,
        "hasIngredients": false
    };

    day.setCurrentMeal = function (meal, date) {
        day.currentMeal = angular.copy(meal);
        day.currentDate = moment(date);
        day.createNewProduct();
    };
    day.saveCurrentMeal = function () {
        day.mealsList.map(function (a) {
            if (a.id === day.currentMeal.id) {
                day.currentMeal.mealList.forEach(m => a.mealList.push(m));
            }
        });
        MealModel.updateMealInfo(day);
        day.refreshCurrentMeal();
    };

    day.createNewProduct = function () {
        day.currentMeal.mealList.push(angular.copy(defaultProduct));
    };

    day.refreshCurrentMeal = function () {
        day.currentMeal = {}; day.currentDate = '';
    };

    day.init = function () {
        let list = MealModel.findMealList(day.date);
        day.mealsList = list != null ? list : angular.copy(MealModel.emptyMealsList());
    };

    day.init();*/
}