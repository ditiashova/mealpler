Mealpler.controller('DayCtrl', function (MealModel) {
    let day = this;
    let defaultMeal = {
        /*"id": Math.random(),*/
        "name": "",
        "type": "product",
        "quantity": 1,
        "hasIngredients": false
    };

    day.setCurrentMeal = function (meal, date) {
        day.currentMeal = angular.copy(meal);
        day.currentDate = moment(date);
        day.createNewMealItem();
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

    day.createNewMealItem = function () {
        day.currentMeal.mealList.push(angular.copy(defaultMeal));
    };

    day.refreshCurrentMeal = function () {
        day.currentMeal = {}; day.currentDate = '';
    };

    day.init = function () {
        let list = MealModel.findMealList(day.date);
        day.mealsList = list != null ? list : angular.copy(MealModel.mealsList());
    };

    day.init();
});