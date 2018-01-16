class DishCtrl {
    constructor(StorageService, Auth, DishService, IngredientService) {
        Object.assign(this, {StorageService, Auth, DishService, IngredientService});
        this.Auth.$onAuthStateChanged((firebaseUserData) => {
            const userIsLogged = !!firebaseUserData;
            if (userIsLogged) {
                this.userPlannerId = firebaseUserData.uid;
            }
        });
    }

    copyDish(name, content) {
        this.StorageService.addFoodToLocalStore(name, content);
    }

    deleteDish(item, mealName, date) {
        return new Promise((resolve, reject)=> {
            resolve(this.DishService.deleteDish(item, mealName, date, this.userPlannerId));
        });
    }

    deleteIngredient(ingredient, itemName, mealName, date) {
        return new Promise((resolve, reject)=> {
            resolve(this.IngredientService.deleteIngredient(ingredient, itemName, mealName, date, this.userPlannerId));
        });
    }
}

Mealpler.controller('DishCtrl', DishCtrl);