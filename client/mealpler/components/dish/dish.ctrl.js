class DishCtrl {
    constructor(StorageService, DishService, IngredientService) {
        Object.assign(this, {StorageService, DishService, IngredientService});
    }

    copyDish(name, content) {
        this.StorageService.setDataToLocalStorage(name, content);
    }

    /** @return Promise<void> */
    deleteDish(item, mealName, date, userId) {
        return this.DishService.deleteDish(item, mealName, date, userId)
    }

    /** @return Promise<void> */
    deleteIngredient(ingredient, itemName, mealName, date, userId) {
        this.IngredientService.deleteIngredient(ingredient, itemName, mealName, date, userId)
    }
}

Mealpler.controller('DishCtrl', DishCtrl);