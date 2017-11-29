Mealpler.service('StorageModel', function () {
    let service = this;

    service.addItemToGroceryList = function (item) {
        let list = service.getStoredItem("grocery").concat(item);
        service.addFoodToStored("grocery", list);
    };

    service.updateGroceryItem = function (oldItem) {
        let list = service.getStoredItem("grocery");
        list.filter(a => a.name === oldItem.name)[0].quantity = oldItem.quantity;
        service.addFoodToStored("grocery", list);
    };

    service.deleteGroceryItem = function (itemToDelete) {
        let list = service.getStoredItem("grocery");
        let i = list.findIndex(a => a.name === itemToDelete.name && a.quantity === itemToDelete.quantity);
        list.splice(i, 1);
        service.addFoodToStored("grocery", list);
    };

    service.deleteGrocery = function () {
        localStorage.removeItem("grocery");
    };

    service.addFoodToStored = function (name, content) {
        localStorage.setItem(name, JSON.stringify(content));
    };

    service.getStoredItem = function (name) {
        let storedItem = [];
        try {
            storedItem = JSON.parse(localStorage.getItem(name));
        } catch (error) {
            console.log(error);
        }
        return storedItem != null ? storedItem : [];
    };
});