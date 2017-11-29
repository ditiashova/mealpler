Mealpler.service('StorageModel', StorageModel);

function StorageModel () {
    this.addItemToGroceryList = (item) => {
        let list = this.getStoredItem("grocery").concat(item);
        this.addFoodToStored("grocery", list);
    };

    this.updateGroceryItem = (oldItem) => {
        let list = this.getStoredItem("grocery");
        list.filter(a => a.name === oldItem.name)[0].quantity = oldItem.quantity;
        this.addFoodToStored("grocery", list);
    };

    this.deleteGroceryItem = (itemToDelete) => {
        let list = this.getStoredItem("grocery");
        let i = list.findIndex(a => a.name === itemToDelete.name && a.quantity === itemToDelete.quantity);
        list.splice(i, 1);
        this.addFoodToStored("grocery", list);
    };

    this.deleteGrocery = () => {
        localStorage.removeItem("grocery");
    };

    this.addFoodToStored = (name, content) => {
        localStorage.setItem(name, JSON.stringify(content));
    };

    this.getStoredItem = (name) => {
        let storedItem = [];
        try {
            storedItem = JSON.parse(localStorage.getItem(name));
        } catch (error) {
            console.log(error);
        }
        return storedItem != null ? storedItem : [];
    };
}