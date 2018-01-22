const DishType = {
    PRODUCT: 1,
    RECIPE: 2
};

class Dish {

    /**
     * @param {string} name
     * @param {number} type
     * @param {Ingredient[]} components
     */
    constructor(type = DishType.PRODUCT, name = '',  components = []) {
        Object.assign(this, {type, name, components});
    }
}
