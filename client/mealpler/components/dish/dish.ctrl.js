class DishCtrl {
    constructor(copy) {
        Object.assign(this, {copy})
    }

    copySingleDish(name, content) {
        this.copy.copyFood(name, content);
    }
}

Mealpler.controller('DishCtrl', DishCtrl);