class DishService {
    constructor(MealModel) {
        Object.assign(this, {MealModel});
    }

    deleteDish(item, mealName, date) {
        const fullDate = date.dateObj.format("YYYY-M-D");
        const availableItem = this.MealModel.getMealsList(fullDate);
        const currentMeals = availableItem.mealsList.find(b => b.mealName === mealName).mealList;
        const i = currentMeals.findIndex(b => b.name === item.name);
        currentMeals.splice(i, 1);
        this.MealModel.updateMealsList(fullDate, availableItem);
    };
}
Mealpler.service('DishService', DishService);