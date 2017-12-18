class DishService {
    constructor(MealService) {
        Object.assign(this, {MealService});
    }

    deleteDish(item, mealName, date) {
        const fullDate = date.dateObj.format("YYYY-M-D");
        const availableItem = this.MealService.getMealsList(fullDate);
        const currentMeals = availableItem.mealsList.find(b => b.mealName === mealName).dishesList;
        const i = currentMeals.findIndex(b => b.name === item.name);
        currentMeals.splice(i, 1);
        this.MealService.updateMealsList(fullDate, availableItem);
    };
}
Mealpler.service('DishService', DishService);