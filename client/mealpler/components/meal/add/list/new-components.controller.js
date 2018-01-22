class NewComponentsController  {
    constructor () {

    }

    removeItem(index, obj) {
        [].slice.call(obj.components);
        obj.components.splice(index, 1);
    };
}

Mealpler.controller('NewComponentsCtrl', NewComponentsController);