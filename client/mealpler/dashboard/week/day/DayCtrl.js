Mealpler.controller('DayCtrl', DayCtrl);

function DayCtrl ($rootScope, $scope, MealModel, StorageModel) {
    /*this.activeTab = 'product';*/

    this.copyFood = (name, content) => {
        StorageModel.addFoodToStored(name, content);
    }; /*!!!*/

    /*this.createNewProduct = (forMeal) => {
        forMeal.list.push(angular.copy(MealModel.createDefaultProduct()));
    };*/

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

    //when modal opens
    this.setCurrentMeal = (meal, date) => {
        this.refreshCurrentMeal();
        this.refreshNewItems();
        this.currentMeal = angular.copy(meal);
        this.currentDate = date;
    };

    this.deleteIngredient = (item, recipe, mealName, date) => {
        MealModel.deleteIngredient(item, recipe, mealName, date);
        $rootScope.$broadcast('refreshMealsForWeek');
    };

    this.deleteMeal = (meal, date) => {
        MealModel.deleteAllMeal(meal, date);
        this.refreshCurrentMeal();
        $rootScope.$broadcast('refreshMealsForWeek');
    };

    this.pasteMenu = (forDay) => {
        let stored = StorageModel.getStoredItem("menu");
        let dat = MealModel.createNewDay(forDay);
        stored.forEach(a => dat.mealsList.push(a));
        MealModel.updateMealsList(forDay.format("YYYY-M-D"), dat);
        $rootScope.$broadcast('refreshMealsForWeek');
    };

    /*this.setMealModal = (tab) => {
        this.activeTab = tab;
    };*/

    this.refreshNewItems();

    $rootScope.$on("refreshCurrentMeal", () => this.refreshCurrentMeal());
}