class DishCtrl {
    constructor(copy, notify, DishService, IngredientService) {
        Object.assign(this, {copy, notify, DishService, IngredientService})
    }

    copySingleDish(content) {
        this.copy.copyFood('meal', content);
    }

    deleteDish(item, mealNo, day) {
        const userId = this.MainCtrl.uid;
        this.DishService.deleteDish(item, mealNo, day.date, userId)
            .then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.notify.show('Food has been deleted.', 'delete'))
            .catch(console.log);
    }

    deleteIngredient(ingredient, itemName, mealNo, day) {
        const userId = this.MainCtrl.uid;
        this.IngredientService.deleteIngredient(ingredient, itemName, mealNo, day.date, userId)
            .then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .catch(console.log);
    };
}

Mealpler.controller('DishCtrl', DishCtrl);