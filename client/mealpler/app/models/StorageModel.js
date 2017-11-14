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

    service.getShoppingList = function () {
        return [];
    }

});