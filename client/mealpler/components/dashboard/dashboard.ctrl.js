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

    setDatePickerHandlers(handler) {
        this.handlers.datePickerHandlers.push(handler);
    };

    setShopListHandlers(handler) {
        this.handlers.shopListLoadingDataHandlers.push(handler);
    };

    setWeekMealDataHandlers(handler) {
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