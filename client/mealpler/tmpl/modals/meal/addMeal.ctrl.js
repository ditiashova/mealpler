Mealpler.controller('AddMealModalCtrl', AddMealModalController);

function AddMealModalController (MealModel, StorageModel) {
    this.addProduct = true;

    this.newProducts = {};
    this.newProducts.list = [];
    this.newProducts.list.push(angular.copy(MealModel.createDefaultProduct()));
    this.newRecipe = angular.copy(MealModel.createDefaultRecipe());
    this.newRecipe.list.push(angular.copy(MealModel.createDefaultProduct()));

    this.createNewProduct = (forMeal) => {
        forMeal.list.push(angular.copy(MealModel.createDefaultProduct()));
    };

    this.toggleMealModal = () => {
        this.addProduct = !this.addProduct;
    };
}