class DayCtrl {
    constructor(copy) {
        Object.assign(this, {copy});
    }

    copyDay(content) {
        this.copy.copyFood('day', content);
    }

}

Mealpler.controller('DayCtrl', DayCtrl);