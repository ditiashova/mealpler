class IngredientService {
    constructor(MealService, FirebaseStorageService) {
        Object.assign(this, {MealService, FirebaseStorageService})
    }

    /** @return Promise<void> */
    deleteIngredient(item, recipeName, mealName, date, userId) {
        return this.FirebaseStorageService.getSingleDateMealsList(date, userId).then((response) => {
            const availableItem = response;
            const currentRecipe = availableItem.mealsList.find(b => b.mealName === mealName).dishesList.find(b => b.name === recipeName && b.hasIngredients);
            const i = currentRecipe.productsList.findIndex(a => a.name === item.name);
            currentRecipe.productsList.splice(i, 1);
            return this.MealService.cleanAndSetMealsList(date, availableItem, userId);
        });
    };
}

Mealpler.service('IngredientService', IngredientService);