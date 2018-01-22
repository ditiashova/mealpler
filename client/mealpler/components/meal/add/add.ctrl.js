class AddMealModalController  {
    constructor ($scope) {
        Object.assign(this, {$scope});
        this.addProduct = true;
        this.newProducts = angular.copy(new Dish(1));
        this.newRecipe = angular.copy(new Dish(2));
        this.createNewDish(this.newProducts);
        this.createNewIngredient(this.newRecipe);
    }

    toggleMealModal() {
        this.addProduct = !this.addProduct;
    }

    createNewDish(forMeal) {
        let defaultProduct = angular.copy(new Dish());
        forMeal.components.push(defaultProduct);
    }

    createNewIngredient(forMeal) {
        let defaultIngredient = angular.copy(new Ingredient());
        forMeal.components.push(defaultIngredient);
    }
}

Mealpler.controller('AddMealModalCtrl', AddMealModalController);