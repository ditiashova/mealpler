class WeekController {
    constructor($scope, MealModel, DayModel, MealService, WeekService) {
        Object.assign(this, {$scope, MealModel, DayModel, MealService, WeekService});
        this.today = moment();

        this.todayFullDate = moment().format('YYYY-M-D');
        this.weekDuration = 7;
        this.weekDaysFoodInfo = [];
    }

    init(data, forDate, id) {
        //this._setNewWeekStart(forDate);
        this._setWeekStartAndLastDays(forDate);
        this.setWeekDaysFoodInfo(data, id);
    }

    _setNewWeekStart(date) {
        const newDate = date ? date : this.today;
        this.weekStartDate = this.WeekService._getWeekStart(newDate);
    }

    _setWeekStartAndLastDays(date) {
        const newDate = date ? date : this.today;
        this.weekStartDate = this.WeekService._getWeekStart(newDate);
        this.weekLastDay = this.WeekService._getWeekEnd(newDate, this.weekDuration);
    }

    setWeekDaysFoodInfo(data, id) {
        if (data) {
            this.weekDaysFoodInfo = this.MealService.organizeDataForWeek(this.weekStartDate.fullDate, this.weekDuration, data);
        } else if (id) {
            this.MealService.findDateRangeMealList(this.weekStartDate.fullDate, this.weekDuration, id).then((response) => {
                this.weekDaysFoodInfo = angular.copy(response);
                this.$scope.$apply();
            }, (error) => {
                console.log(error);
            });
        }
        this.$scope.$apply();
    }
}

Mealpler.controller('WeekCtrl', WeekController);
