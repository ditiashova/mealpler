//const WEEK_DURATION

class DashboardController {
    constructor ($rootScope, $scope, WeekService, StorageService, $timeout) {
        Object.assign(this, {$rootScope, $scope, WeekService, StorageService, $timeout});
        this.firstDate = this.WeekService.getWeekStart(moment());

        this.$scope.$on('userUpdated', (e) => this.init());
        this.$scope.$on('newMealsData', (e) => this.refresh());
        this.$scope.$on('shoplistIsToggled', (e, state) => this.setIsShopListOpened(state));


        this.weekDuration = 7;
        this.currentWeek = [];

        //this.refresh = this._refreshDashboard.bind(this);
    }

    init() {
        this._setWeekStartAndWeekLastDates();
        this._setCurrentWeek();
        //this.MainCtrl.addIsShopListOpenedHandler((state) => this.setIsShopListOpened(state));
    }

    //todo does it work?
    refresh() {
        return this._refreshDashboard.bind(this);
    }

    _refreshDashboard(date) {
        if (date) this.firstDate = this.WeekService.getWeekStart(moment(date));
        this._setWeekStartAndWeekLastDates(date);
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
        //this.$scope.$broadcast('newFirstDate', this.firstDate);
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