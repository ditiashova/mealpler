Mealpler.controller('DashboardCtrl', DashboardController);

function DashboardController () {
    this.defaultWeekDuration = 7;
    this.defaultWeekStartDate = moment().startOf('week');

    this.handlers = {
        shopListLoadingDataHandlers: [],
        weekMealsLoadingDataHandlers: [],
        datePickerHandlers: []
    };

    this.setDatePickerHandlers = function (handler) {
        this.handlers.datePickerHandlers.push(handler);
    };

    this.setShopListHandlers = function(handler) {
        this.handlers.shopListLoadingDataHandlers.push(handler);
    };

    this.setWeekMealDataHandlers = function(handler) {
        this.handlers.weekMealsLoadingDataHandlers.push(handler);
    };

    this.runDatePickerHandlers = function (startDate, endDate) {
        this.handlers.datePickerHandlers.forEach(function (handler) {
            handler(startDate, endDate);
        })
    };

    this.runShopListHandlers = function (date, duration) {
        this.handlers.shopListLoadingDataHandlers.forEach(function (handler) {
            handler(date, duration);
        })
    };

    this.runWeekMealsHandlers = function (startDate) {
        this.handlers.weekMealsLoadingDataHandlers.forEach(function (handler) {
            handler(startDate);
        })
    };
}