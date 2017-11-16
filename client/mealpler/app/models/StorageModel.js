Mealpler.service('StorageModel', function () {
    let service = this;

    service.addItemToFridgeList = function (item) {
        let list = service.getFridgeList();
        list.push(item);
        service.updateFridgeList(list);
    };

    service.addItemToGroceryList = function () {
        let list = service.getGroceryList();
        list.push(item);
        service.updateGroceryList(list);
    };

    service.updateFridgeItem = function (oldItem) {
        let list = service.getFridgeList();
        list.filter(a => a.name === oldItem.name)[0].quantity = oldItem.quantity;
        service.updateFridgeList(list);
    };

    service.updateGroceryItem = function (oldItem) {
        let list = service.getGroceryList();
        list.filter(a => a.name === oldItem.name)[0].quantity = oldItem.quantity;
        service.updateGroceryList(list);
    };

    service.deleteFridgeItem = function (itemToDelete) {
      let list = service.getFridgeList();
      let i = list.findIndex(a => a.name === itemToDelete.name && a.quantity === itemToDelete.quantity);
      list.splice(i, 1);
      service.updateFridgeList(list);
    };

    service.deleteGroceryItem = function (itemToDelete) {
        let list = service.getGroceryList();
        let i = list.findIndex(a => a.name === itemToDelete.name && a.quantity === itemToDelete.quantity);
        list.splice(i, 1);
        service.updateGroceryList(list);
    };

    service.deleteFridge = function () {
        localStorage.removeItem("fridge");
    };

    service.deleteGrocery = function () {
        localStorage.removeItem("grocery");
    };

    service.updateFridgeList = function (newItem) {
        localStorage.setItem("fridge", JSON.stringify(newItem));
    };

    service.updateGroceryList = function (newItem) {
        localStorage.setItem("grocery", JSON.stringify(newItem));
    };

    service.getFridgeList = function () {
        let fridgeList = [];
        try {
            fridgeList = JSON.parse(localStorage.getItem("fridge"));
        } catch (error) {
            console.log(error);
        }
        return fridgeList != null ? fridgeList : [];
    };

    service.getGroceryList = function () {
        let groceryList = [];
        try {
            groceryList = JSON.parse(localStorage.getItem("fridge"));
        } catch (error) {
            console.log(error);
        }
        return groceryList != null ? groceryList : [];
    };
});