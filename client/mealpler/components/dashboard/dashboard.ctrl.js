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

    runShopListHandlers(date, duration) {
        this.handlers.shopListLoadingDataHandlers.forEach((handler) => handler(date, duration));
    };

    runWeekMealsHandlers(startDate) {
        this.handlers.weekMealsLoadingDataHandlers.forEach((handler) => handler(startDate));
    };
}

Mealpler.controller('DashboardCtrl', DashboardController);