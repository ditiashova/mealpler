class StorageService {
    constructor () {

    }

    addItemToGroceryList(item) {
        let list = this.getStoredItem("grocery").concat(item);
        this.addFoodToStored("grocery", list);
    }

    updateGroceryItem(oldItem) {
        let list = this.getStoredItem("grocery");
        list.find(a => a.name === oldItem.name).quantity = oldItem.quantity;
        this.addFoodToStored("grocery", list);
    }

    deleteGroceryItem(itemToDelete) {
        let list = this.getStoredItem("grocery");
        let i = list.findIndex(a => a.name === itemToDelete.name && a.quantity === itemToDelete.quantity);
        list.splice(i, 1);
        this.addFoodToStored("grocery", list);
    }

    deleteGrocery() {
        localStorage.removeItem("grocery");
    };

    addFoodToStored(name, content) {
        localStorage.setItem(name, JSON.stringify(content));
    };

    getStoredItem(name) {
        let storedItem = [];
        try {
            storedItem = JSON.parse(localStorage.getItem(name));
        } catch (error) {
            console.log(error);
        }
        return storedItem != null ? storedItem : [];
    };
}

Mealpler.service('StorageService', StorageService);