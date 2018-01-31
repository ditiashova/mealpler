class DishCtrl {
    constructor(CopyService, NotifyService, DishService, IngredientService) {
        Object.assign(this, {CopyService, NotifyService, DishService, IngredientService})
    }

    copySingleDish(content) {
        this.CopyService.copyFood('meal', content);
    }

    deleteDish(item, mealNo, day) {
        //const userId = this.MainCtrl.uid;
        this.DishService.deleteDish(item, mealNo, day.date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .then(() => this.NotifyService.show('Food has been deleted.', 'delete'))
            .catch(console.log);
    }

    deleteIngredient(ingredient, itemName, mealNo, day) {
        //const userId = this.MainCtrl.uid;
        this.IngredientService.deleteIngredient(ingredient, itemName, mealNo, day.date)
            //.then(() => this.MainCtrl.runDatabaseHandlers(userId))
            .catch(console.log);
    };
}

Mealpler.controller('DishCtrl', DishCtrl);