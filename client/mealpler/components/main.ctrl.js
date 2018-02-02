const WEEK_DURATION = 7;

class MainController {
    constructor ($scope, AuthService, WeekService, StorageService, $timeout) {
        Object.assign(this, {$scope, AuthService, WeekService, StorageService, $timeout});
        this.title = Mealpler.titles;
        this.isShopListOpened = false;

        this.$scope.$on(EventType.AUTH, (e) => this.init());
        this.$scope.$on(EventType.MEALS, (e) => this.refresh());

        this.currentWeek = [];
        this.targetDatePicker = 'datePicker';

        this.firstDate = this.WeekService.getWeekStart(moment());
        this.lastDate = this.WeekService.getWeekEnd(moment(), WEEK_DURATION);

        this.refresh = this._refreshDashboard.bind(this);
        this.toggleShopList = this._toggleShopList.bind(this);
    }

    init() {
        this.setUserProfileAndLoginStatus();
        this._setCurrentWeek();
    }

    _setCurrentWeek(start = this.firstDate) {
        return this.WeekService.findDateRangeMealList(start, WEEK_DURATION).then((response) => {
            this.$timeout (() => {
                this.currentWeek = angular.copy(response);
            })
        });
    }

    _refreshDashboard(date) {
        if (date) this.firstDate = this.WeekService.getWeekStart(moment(date));
        return this._setCurrentWeek(date);
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

    setUserProfileAndLoginStatus() {
        this.userIsLogged = this.AuthService.isLogged();
        this.user = this.AuthService.getUser();
        this.$scope.$apply();
    }

    signOut() {
        this.AuthService.signOut()
            .then(() => {})
            .catch((e) => console.log('Sign out failed due to: ' + e.message));
    }

    _toggleShopList(state) {
        if (typeof state != undefined) {
            this.setIsShopListOpened(state);
        } else {
            this.setIsShopListOpened(!this.isShoplistOpened);
        }
    }

    setIsShopListOpened(state) {
        this.isShopListOpened = state;
    }
}

Mealpler.controller('MainCtrl', MainController);
