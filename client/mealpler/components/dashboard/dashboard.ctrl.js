class DashboardController {
    constructor ($scope) {
        Object.assign(this, {$scope});
        /*this.defaultWeekDuration = 7;
        this.defaultWeekStartDate = moment().startOf('week');*/

        this.handlers = {
            shopListLoadingDataHandlers: [],
            weekMealsLoadingDataHandlers: [],
            datePickerHandlers: []
        };

        this.startDate = moment();
        this.weekDuration = 7;
        this.rangeDuration = 7;
    }

    setRangeDuration(d) {
        this.rangeDuration = d;
    }

    setStartDate(trend, date) {
        if (trend) {
            if (trend === 'past') {
                this.startDate = moment(this.startDate).subtract(1, 'day').startOf('week');
            } else if (trend === 'future') {
                this.startDate = moment(this.startDate).add(1, 'week').startOf('week');
            }
        } else if (date) {
            this.startDate = moment(this.startDate);
        }
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

    /**
     *
     * @param {Moment} date
     * @param {number} duration
     */

    runShopListHandlers(date, duration) {
        this.handlers.shopListLoadingDataHandlers.forEach((handler) => handler(date, duration));
    };

    /**
     *
     * @param {null || {}} data
     * @param {Moment} startDate
     */
    runWeekMealsHandlers(data, startDate) {
        /*in WeekCtrl.init we expect data, date and id. if we don't have any data, we expect null to be passed*/
        this.handlers.weekMealsLoadingDataHandlers.forEach((handler) => handler(data, startDate));
    };
}

Mealpler.controller('DashboardCtrl', DashboardController);