class IngredientService {
    constructor(DayService, StorageService) {
        Object.assign(this, {DayService, StorageService})
    }

    /** @return Promise<void> */
    deleteIngredient(item, recipeName, mealNo, date) {
        const fullDateName = moment(date).format("YYYY-M-D");

        return this.StorageService.getSingleDateMealsList(fullDateName).then((response) => {
            const currentRecipe = response
                .meals.find(meal => meal.type === mealNo)
                .dishes.find(dish => dish.name === recipeName && dish.components && dish.components.length > 0);
            const i = _.findIndex(currentRecipe.components, ingredient => ingredient.name === item.name);
            currentRecipe.components.splice(i, 1);

            return this.DayService.cleanAndSetDayMealsList(fullDateName, response);
        });
    };
}

Mealpler.service('IngredientService', IngredientService);