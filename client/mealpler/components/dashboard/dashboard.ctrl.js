class DashboardController {
    constructor ($scope, WeekService, StorageService, $timeout) {
        Object.assign(this, {$scope, WeekService, StorageService, $timeout});

        this.handlers = {
            shopListLoadingDataHandlers: [],
            weekMealsLoadingDataHandlers: [],
            datePickerHandlers: []
        };

        this.firstDate = this.WeekService.getWeekStart(moment());
        this.weekDuration = 7;
        this.currentWeek = [];

        this.StorageService.addHandler((date) => this.refresh(date)
        );

        this.refresh = this._refreshDashboard.bind(this);
    }

    $onInit() {
        this._setWeekStartAndWeekLastDates();
        this._setCurrentWeek();
        this.MainCtrl.addIsShopListOpenedHandler((state) => this.setIsShopListOpened(state));
    }

    _refreshDashboard(date) {
        this._setWeekStartAndWeekLastDates(date);
        this._runDatePickerHandlers(date);
        return this._setCurrentWeek(date);
    }

    _setWeekStartAndWeekLastDates(date = this.firstDate) {
        this.weekStartDate = this.WeekService.getWeekStart(date);
        this.weekLastDate = this.WeekService.getWeekEnd(date, this.weekDuration);
    };

    _setCurrentWeek(start = this.firstDate) {
        return this.WeekService.findDateRangeMealList(start, this.weekDuration).then((response) => {
            this.$timeout (() => {
                this.currentWeek = angular.copy(response);
            })
        });
    }

    switchWeek(trend) {
        this._setFirstDay(trend);
        this._refreshDashboard();
    }

    /*setRangeDuration(d) {
        this.rangeDuration = d;
    }*/

    _setFirstDay(trend, date) {
        if (trend) {
            if (trend === 'past') {
                this.firstDate = moment(this.firstDate).subtract(1, 'day').startOf('week');
            } else if (trend === 'future') {
                this.firstDate = moment(this.firstDate).add(1, 'week').startOf('week');
            }
        } else if (date) {
            this.firstDate = moment(date);
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

    /*addShopListHandlers(handler) {
        this.handlers.shopListLoadingDataHandlers.push(handler);
    };

    addWeekMealDataHandlers(handler) {
        this.handlers.weekMealsLoadingDataHandlers.push(handler);
    };*/

    _runDatePickerHandlers(start = this.firstDate, end) {
        this.handlers.datePickerHandlers.forEach((handler) => handler(start, end));
    };

    /**
     *
     * @param {Moment} date
     * @param {number} duration
     */

    /*runShopListHandlers(date, duration) {
        this.handlers.shopListLoadingDataHandlers.forEach((handler) => handler(date, duration));
    };*/

    /**
     *
     * @param {null || {}} data
     * @param {Moment} startDate
     */
    /*runWeekMealsHandlers(data, startDate) {
        /!*in WeekCtrl.init we expect data, date and id. if we don't have any data, we expect null to be passed*!/
        this.handlers.weekMealsLoadingDataHandlers.forEach((handler) => handler(data, startDate));
    };*/
}

Mealpler.controller('DashboardCtrl', DashboardController);