class DashboardController {
    constructor () {
        this.defaultWeekDuration = 7;
        this.defaultWeekStartDate = moment().startOf('week');

        this.handlers = {
            shopListLoadingDataHandlers: [],
            weekMealsLoadingDataHandlers: [],
            datePickerHandlers: []
        };
    }

    /**
     *
     * @param {Boolean} state
     */
    setIsShopListOpened(state) {
        this.isShopListOpened = state;
    }

    addDatePickerHandlers(handler) {
        this.handlers.datePickerHandlers.push(handler);
    };

    addShopListHandlers(handler) {
        this.handlers.shopListLoadingDataHandlers.push(handler);
    };

    addWeekMealDataHandlers(handler) {
        this.handlers.weekMealsLoadingDataHandlers.push(handler);
    };

    runDatePickerHandlers(startDate, endDate) {
        this.handlers.datePickerHandlers.forEach((handler) => handler(startDate, endDate));
    };

    runShopListHandlers(date, duration, id) {
        this.handlers.shopListLoadingDataHandlers.forEach((handler) => handler(date, duration, id));
    };

    runWeekMealsHandlers(data, startDate, id) {
        /*in WeekCtrl.init we expect data, date and id. if we don't have any data, we expect null to be passed*/
        this.handlers.weekMealsLoadingDataHandlers.forEach((handler) => handler(data, startDate, id));
    };
}

Mealpler.controller('DashboardCtrl', DashboardController);