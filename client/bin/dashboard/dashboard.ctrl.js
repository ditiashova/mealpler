class DashboardController {
    constructor ($rootScope, $scope, WeekService, StorageService, $timeout) {
        Object.assign(this, {$rootScope, $scope, WeekService, StorageService, $timeout});


        //this.$scope.$on(EventType.AUTH, (e) => this.init());
        //this.$scope.$on(EventType.MEALS, (e) => this.refresh());
        //this.$scope.$on(EventType.SHOPLIST_TOGGLED, (e, state) => this.setIsShopListOpened(state));


        this.weekDuration = 7;
        this.currentWeek = [];
        this.targetDatePicker = 'datePicker';

        this.firstDate = this.WeekService.getWeekStart(moment());
        this.lastDate = this.WeekService.getWeekEnd(moment(), this.weekDuration);

        //this.refresh = this._refreshDashboard.bind(this);
    }

    init() {
        //this._setWeekStartAndWeekLastDates();
        this._setCurrentWeek();
        //this.MainCtrl.addIsShopListOpenedHandler((state) => this.setIsShopListOpened(state));
    }

    _refreshDashboard(date) {
        if (date) this.firstDate = this.WeekService.getWeekStart(moment(date));
        //this._setWeekStartAndWeekLastDates(date);
        return this._setCurrentWeek(date);
    }

    /*_setWeekStartAndWeekLastDates(date = this.firstDate) {
        this.weekStartDate = this.WeekService.getWeekStart(date);
        this.weekLastDate = this.WeekService.getWeekEnd(date, this.weekDuration);
    };*/

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
        this.$scope.$broadcast(EventType.WEEKSTART, this.firstDate);
    }

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
}

Mealpler.controller('DashboardCtrl', DashboardController);