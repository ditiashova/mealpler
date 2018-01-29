class NewFoodCtrl  {
    constructor () {}

    removeItem(index, obj) {
        [].slice.call(obj.components);
        obj.components.splice(index, 1);
    };

    createNewItem(form, forItems)  {
        if (form) form.$submitted = false;
        this.onCreateNew(forItems);
    };

    save(form, newItems) {
        if (newItems.components.length === 0) form.$valid = false;

        if (form.$valid) {
            const type = newItems.type === DishType.RECIPE ? 'recipe' : 'list';
            this.onSave(type, newItems);
        }
    };
}

Mealpler.controller('NewFoodCtrl', NewFoodCtrl);