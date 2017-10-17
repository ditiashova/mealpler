Mealpler.controller('DayCtrl', [function (MealModel) {
    let day = this;
    day.meals = MealModel.mealsList();
}]);