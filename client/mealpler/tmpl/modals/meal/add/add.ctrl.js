Mealpler.controller('AddMealModalCtrl', AddMealModalController);

function AddMealModalController ($scope, MealModel) {
    this.addProduct = true;
    this.newProducts = {};
    this.newProducts.list = [];
    this.newRecipe = angular.copy(MealModel.createDefaultRecipe());

    this.toggleMealModal = () => {
        this.addProduct = !this.addProduct;
    };

    this.createNewProduct = (forMeal) => {
        forMeal.list.push(angular.copy(MealModel.createDefaultProduct()));
    };

    this.createNewProduct(this.newProducts);
    this.createNewProduct(this.newRecipe);
}