Mealpler.controller('AddMealModalCtrl', AddMealModalController);

function AddMealModalController (MealModel, StorageModel) {
    this.activeTab = true;

    this.newProducts = {};
    this.newProducts.list = [];
    this.newProducts.list.push(angular.copy(MealModel.createDefaultProduct()));
    this.newRecipe = angular.copy(MealModel.createDefaultRecipe());
    this.newRecipe.list.push(angular.copy(MealModel.createDefaultProduct()));

    this.toggleMealModal = () => {
        this.addProduct = !this.addProduct;
    };
}