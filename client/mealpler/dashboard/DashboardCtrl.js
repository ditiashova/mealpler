Mealpler.controller('DashboardCtrl', DashboardController);

function DashboardController () {
    this.handlers = {
        shopListDataHandlers: [],
        weekMealDataHandlers: []
    };
    this.defaultWeekDuration = 7;
}

DashboardController.prototype.saveWeekStartDate = function (date) {
    this.weekStartDate = date;
};

DashboardController.prototype.getWeekStartDate = function () {
    return this.weekStartDate;
};

DashboardController.prototype.refreshShopList = function (date, duration) {
    this.handlers.shopListDataHandlers.forEach(function (handler) {
        handler(date, duration);
    })
};

DashboardController.prototype.setShopListActions = function(handler) {
    this.handlers.shopListDataHandlers.push(handler);
};

DashboardController.prototype.refreshMealDataForWeek = function (startDate) {
    this.handlers.weekMealDataHandlers.forEach(function (handler) {
        handler(startDate);
    })
};

DashboardController.prototype.setMealDataForWeekActions = function(handler) {
    this.handlers.weekMealDataHandlers.push(handler);
};