class DishCtrl {
    constructor(StorageService, DishService, IngredientService) {
        Object.assign(this, {StorageService, DishService, IngredientService});
    }

    copyDish(name, content) {
        this.StorageService.setDataToLocalStorage(name, content);
    }

    /** @return Promise<void> */
    deleteDish(item, mealName, date) {
        return this.DishService.deleteDish(item, mealName, date, this.userId)
    }

    /** @return Promise<void> */
    deleteIngredient(ingredient, itemName, mealName, date) {
        return this.IngredientService.deleteIngredient(ingredient, itemName, mealName, date, this.userId)
    }
}

Mealpler.controller('DishCtrl', DishCtrl);