const WEEK_DURATION = 7;

class MainController {
    constructor ($scope, AuthService, WeekService, StorageService, $timeout) {
        Object.assign(this, {$scope, AuthService, WeekService, StorageService, $timeout});
        this.title = Mealpler.titles;
        this.isShopListOpened = false;
        this.isNewItemsAdded = false;

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
        this._setIsNewItemsAdded(true);
        return this._setCurrentWeek(date);
    }

    switchWeek(trend) {
        this._setFirstAndLastDays(trend);
        this._refreshDashboard();
        this.$scope.$broadcast(EventType.WEEKSTART, this.firstDate);
    }

    _setFirstAndLastDays(trend, date) {
        if (trend) {
            if (trend === 'past') {
                this.firstDate = moment(this.firstDate).subtract(1, 'day').startOf('week');
            } else if (trend === 'future') {
                this.firstDate = moment(this.firstDate).add(1, 'week').startOf('week');
            }
        } else if (date) {
            this.firstDate = moment(date);
        }
        this.lastDate = this.WeekService.getWeekEnd(this.firstDate, WEEK_DURATION);
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
            this._setIsShopListOpened(state);
            this._setIsNewItemsAdded(state);
        } else {
            this._setIsShopListOpened(!this.isShoplistOpened);
            this._setIsNewItemsAdded(!this.isNewItemsAdded);
        }
    }

    _setIsShopListOpened(state) {
        this.isShopListOpened = state;
    }

    _setIsNewItemsAdded(state) {
        this.isNewItemsAdded = state;
    }
}

Mealpler.controller('MainCtrl', MainController);
