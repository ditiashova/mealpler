class WeekController {
    constructor($scope, MealService, WeekService, $timeout) {
        Object.assign(this, {$scope, MealService, WeekService, $timeout});
        this.today = moment();

        this.todayFullDate = moment().format('YYYY-M-D');
        this.weekDuration = 7;
        this.weekDaysFoodInfo = [];
    }

    init(data, forDate, id) {
        this._setWeekStartAndLastDays(forDate);
        return this.setWeekDaysFoodInfo(data, id);
    }

    _setWeekStartAndLastDays(date) {
        const newDate = date ? date : this.today;
        this.weekStartDate = this.WeekService._getWeekStart(newDate);
        this.weekLastDay = this.WeekService._getWeekEnd(newDate, this.weekDuration);
    }

    setWeekDaysFoodInfo(data, id) {
        if (data || data === null) {
            //data could be null if there is no data for user, but undefined data means no data from database
            this.$timeout(() => {
                return Promise.resolve(this.weekDaysFoodInfo = this.WeekService.organizeDataForWeek(this.weekStartDate.date, this.weekDuration, data));
            });
        } else {
            //in cases when we whether have id => we'll get data from database; if id = false, service will return value from LocalStorage
            return this.WeekService.findDateRangeMealList(this.weekStartDate.date, this.weekDuration, id).then((response) => {
                this.$timeout(() => {
                     this.weekDaysFoodInfo = angular.copy(response);
                })
            });
        }
    }
}

Mealpler.controller('WeekCtrl', WeekController);
