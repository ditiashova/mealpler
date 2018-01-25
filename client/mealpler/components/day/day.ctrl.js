class DayCtrl {
    constructor(copy) {
        Object.assign(this, {copy});
    }

    copyMenu(content) {
        this.copy.copyFood('menu', content);
    }

}

Mealpler.controller('DayCtrl', DayCtrl);