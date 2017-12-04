Mealpler.controller('PortionCtrl', PortionCtrl);

function PortionCtrl (StorageModel) {
    this.copyItem = (name, content) => {
        StorageModel.addFoodToStored(name, content);
    };
}