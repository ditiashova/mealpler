class DishCtrl {
    constructor(CopyService, NotifyService, DishService, IngredientService) {
        Object.assign(this, {CopyService, NotifyService, DishService, IngredientService})
    }

    copySingleDish(content) {
        this.CopyService.copyFood('meal', content);
    }

    deleteDish(item, mealType, day) {
        //const userId = this.MainCtrl.uid;
        this.DishService.deleteDish(item, mealType, day.date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.NotifyService.show('Food has been deleted.', 'delete'))
            .catch((e) => console.log('Dish deleting failed due to: '+ e.message));
    }

    deleteIngredient(ingredient, itemName, mealType, day) {
        //const userId = this.MainCtrl.uid;
        this.IngredientService.deleteIngredient(ingredient, itemName, mealType, day.date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .catch((e) => console.log('Ingredient deleting failed due to: '+ e.message));
    };
}

Mealpler.controller('DishCtrl', DishCtrl);