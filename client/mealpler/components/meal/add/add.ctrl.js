class AddMealModalController  {
    constructor () {
        this.addProduct = true;
        this.newProducts = new Dish(1);
        this.newRecipe = new Dish(2);
        [this.newProducts, this.newRecipe].forEach(a => this.createNewItem(a));
    }

    toggleMealModal() {
        this.addProduct = !this.addProduct;
    }

    createNewItem(forItems)  {
        if (forItems.type === DishType.RECIPE) {
            forItems.components.push(new Ingredient());
        } else if (forItems.type === DishType.PRODUCT) {
            forItems.components.push(new Dish());
        }
    };
}

Mealpler.controller('AddMealModalCtrl', AddMealModalController);