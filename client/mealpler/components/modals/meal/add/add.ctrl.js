class AddMealModalController  {
    constructor ($scope, MealModel) {
        Object.assign(this, {$scope, MealModel});
        this.addProduct = true;
        this.newProducts = {};
        this.newProducts.productsList = [];
        this.newRecipe = angular.copy(MealModel.createDefaultRecipe());
        [this.newProducts, this.newRecipe].forEach(a => this.createNewProduct(a));
    }

    toggleMealModal() {
        this.addProduct = !this.addProduct;
    }

    createNewProduct(forMeal) {
        let defaultProduct = angular.copy(this.MealModel.createDefaultProduct());
        forMeal.productsList.push(defaultProduct);
    }
}

Mealpler.controller('AddMealModalCtrl', AddMealModalController);