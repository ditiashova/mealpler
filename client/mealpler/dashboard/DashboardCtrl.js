Mealpler.controller('DashboardCtrl', DashboardController);

function DashboardController () {
    this.handlers = {
        shopListDataHandlers: [],
        weekMealDataHandlers: [],
        datePickerEvents: []
    };
    this.defaultWeekDuration = 7;
    this.defaultWeekStartDate = moment().startOf('week');
}

DashboardController.prototype.setDatePickerEvents = function (handler) {
    this.handlers.datePickerEvents.push(handler);
};

DashboardController.prototype.setMealDataForWeekActions = function(handler) {
    this.handlers.weekMealDataHandlers.push(handler);
};

DashboardController.prototype.setShopListActions = function(handler) {
    this.handlers.shopListDataHandlers.push(handler);
};

DashboardController.prototype.callDatePickerEvents = function (startDate, endDate) {
    this.handlers.datePickerEvents.forEach(function (handler) {
        handler(startDate, endDate);
    })
};

DashboardController.prototype.refreshShopList = function (date, duration) {
    this.handlers.shopListDataHandlers.forEach(function (handler) {
        handler(date, duration);
    })
};

DashboardController.prototype.refreshMealDataForWeek = function (startDate) {
    this.handlers.weekMealDataHandlers.forEach(function (handler) {
        handler(startDate);
    })
};