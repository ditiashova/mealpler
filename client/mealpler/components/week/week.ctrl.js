class WeekController {
    constructor($scope, MealModel, DayModel, MealService, WeekService) {
        Object.assign(this, {$scope, MealModel, DayModel, MealService, WeekService});
        this.todayFullDate = moment().format('YYYY-M-D');
        this.weekDuration = 7;
        this.weekDaysFoodInfo = [];
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
        this.MealService.findDateRangeMealList(this.weekFirstDay, this.weekDuration, this.userId).then((response) => {
            this.weekDaysFoodInfo = angular.copy(response);
            this.$scope.$apply();
        }, (error) => {
            console.log(error);
        });
    }
}

Mealpler.controller('WeekCtrl', WeekController);
