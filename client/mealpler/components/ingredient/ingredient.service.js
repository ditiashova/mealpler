class IngredientService {
    constructor(MealModel) {
        Object.assign(this, {MealModel})
    }

    deleteIngredient(item, recipeName, mealName, date) {
        const storedDayName = date.dateObj.format("YYYY-M-D");
        const availableItem = this.MealModel.getMealsList(storedDayName);
        const currentRecipe = availableItem.mealsList.find(b => b.mealName === mealName).mealList.find(b => b.name === recipeName && b.hasIngredients);
        const i = currentRecipe.list.findIndex(a => a.name === item.name);
        currentRecipe.list.splice(i, 1);
        this.MealModel.updateMealsList(storedDayName, availableItem);
    };
}

Mealpler.service('IngredientService', IngredientService);