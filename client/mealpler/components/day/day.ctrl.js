class DayCtrl {
    constructor(copy) {
        Object.assign(this, {copy});
    }

    copyFood(name, content) {
        this.copy.copyFood(name, content);
    }

}

Mealpler.controller('DayCtrl', DayCtrl);