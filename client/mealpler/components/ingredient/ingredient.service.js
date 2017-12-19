class IngredientService {
    constructor(MealService) {
        Object.assign(this, {MealService})
    }

    deleteIngredient(item, recipeName, mealName, date) {
        const storedDayName = date.dateObj.format("YYYY-M-D");
        const availableItem = this.MealService.getMealsList(storedDayName);
        const currentRecipe = availableItem.mealsList.find(b => b.mealName === mealName).dishesList.find(b => b.name === recipeName && b.hasIngredients);
        const i = currentRecipe.productsList.findIndex(a => a.name === item.name);
        currentRecipe.productsList.splice(i, 1);
        this.MealService.updateCleanMealsList(storedDayName, availableItem);
    };
}

Mealpler.service('IngredientService', IngredientService);