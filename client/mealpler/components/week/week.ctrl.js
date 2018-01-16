class WeekController {
    constructor($scope, MealModel, DayModel, MealService, Auth, WeekService) {
        Object.assign(this, {$scope, MealModel, DayModel, MealService, Auth, WeekService});
        this.todayFullDate = moment().format('YYYY-M-D');
        this.weekDuration = 7;

        const today = moment();
        this.weekDaysFoodInfo = [];

        this.Auth.$onAuthStateChanged((firebaseUserData) => {
            const userIsLogged = !!firebaseUserData;
            if (userIsLogged) {
                this.userPlannerId = firebaseUserData.uid;
                this.init(today);
            }
        });
    }

    init(forDate) {
        this._setNewWeekStart(forDate);
        this._setWeekFirstAndLastDays(forDate);
        this._loadMealsDataForWeekRange();
    }

    _setNewWeekStart(date) {
        this.weekStartDate = this.WeekService._getWeekStart(date);
    }

    _setWeekFirstAndLastDays(date) {
        this.weekFirstDay = this.WeekService._getWeekStart(date);
        this.weekLastDay = this.WeekService._getWeekEnd(date, this.weekDuration);
    }

    _loadMealsDataForWeekRange() {
        this.MealService.findDateRangeMealList(this.weekFirstDay, this.weekDuration, this.userPlannerId).then((response) => {
            this.weekDaysFoodInfo = angular.copy(response);
            this.$scope.$apply();
        }, (error) => {
            console.log(error);
        });
    }
}

Mealpler.controller('WeekCtrl', WeekController);
