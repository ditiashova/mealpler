Mealpler.controller('DashboardCtrl', DashboardController);

function DashboardController (MealModel, StorageModel) {
    this.grocery = {};

    this.grocery.addItem = (newItem) => {
        StorageModel.addItemToGroceryList(newItem);
        this.init();
    };

    this.grocery.addItems = (listOfMeals) => {
        let newItems = [];
        listOfMeals.map(a => a.mealList.forEach(b => b.type === 'product' ? newItems.push(b) : b.list.forEach(c => newItems.push(c))));
        StorageModel.addItemToGroceryList(newItems);
        this.init();
    };

    this.grocery.deleteItem = (item) => {
        StorageModel.deleteGroceryItem(item);
        this.init();
    };

    this.grocery.deleteAll = () => {
        StorageModel.deleteGrocery();
        this.init();
    };

    this.init = () => {
        this.grocery.list = StorageModel.getStoredItem("grocery");
        this.grocery.newItem = angular.copy(MealModel.createDefaultProduct());
    };

    this.init();

};