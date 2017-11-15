Mealpler.service('StorageModel', function () {
    let service = this;

    service.getFridgeList = function () {
        let fridgeList = [];
        try {
            fridgeList = JSON.parse(localStorage.getItem("fridge"));
        } catch (error) {
            console.log(error);
        }
        return fridgeList != null ? fridgeList : [];
    };

    service.addItemToFridgeList = function (item) {
        let list = service.getFridgeList();
        list.push(item);
        service.updateFridgeList(list);
    };

    service.updateFridgeItem = function (oldItem) {
        let list = service.getFridgeList();
        list.filter(a => a.name === oldItem.name)[0].quantity = oldItem.quantity;
        service.updateFridgeList(list);
    };

    service.deleteFridgeItem = function (itemToDelete) {
      let list = service.getFridgeList();
      let i = list.findIndex(a => a.name === itemToDelete.name && a.quantity === itemToDelete.quantity);
      list.splice(i, 1);
      service.updateFridgeList(list);
    };

    service.deleteFridge = function () {
        localStorage.removeItem("fridge");
    };

    service.updateFridgeList = function (newItem) {
        localStorage.setItem("fridge", JSON.stringify(newItem));
    };

    service.getShoppingList = function () {
        return [];
    }

});