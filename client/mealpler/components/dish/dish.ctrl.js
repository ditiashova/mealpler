class DishCtrl {
    constructor(copy) {
        Object.assign(this, {copy})
    }

    copySingleDish(content) {
        this.copy.copyFood('meal', content);
    }
}

Mealpler.controller('DishCtrl', DishCtrl);