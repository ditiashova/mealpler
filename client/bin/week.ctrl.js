class WeekController {
    constructor($scope, MealService, WeekService, $timeout) {
        Object.assign(this, {$scope, MealService, WeekService, $timeout});
        //this.today = moment();
        //this.$onInit();

        this.todayFullDate = this.startDate.format('YYYY-M-D');
        //this.weekDuration = 7;
        this.weekDaysFoodInfo = [];

        if (!this.MainCtrl.uid) {
            //manually initialize week ctrl if user is not signed in
            this.init(void 0, this.startDate);
        }

        this.MainCtrl.addDatabaseHandlers((data, date) => {
            const id = this.MainCtrl.uid;
            return this.init(data, date, id);
        });
    }

    $onInit() {
        console.log('DialogController $onInit');  // nothing in CodePen console
    }

    init(data, forDate, id) {
        this._setWeekStartAndLastDays(forDate);
        return this.setWeekDaysFoodInfo(data, id);
    }

    _setWeekStartAndLastDays(date) {
        const newDate = date ? date : this.startDate;
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

    switchWeek(time) {
        const id = this.MainCtrl.uid;
        let newStartDate = {};

        if (time === 'past') {
            newStartDate = moment(this.weekStartDate.date).subtract(1, 'day').startOf('week');
        } else if (time === 'future') {
            newStartDate = moment(this.weekStartDate.date).add(this.weekDuration + 1, 'day');
        }

        this.Dashboard.startDate = newStartDate;
        this.MainCtrl.newWeekStartDate = newStartDate;

        this.init(void 0, newStartDate, id).then(() => {
            this._runShopListAndDatePickerEvents(newStartDate, this.weekDuration, id);
        });
    }

    _runShopListAndDatePickerEvents() {
        this.Dashboard.runShopListHandlers(start, duration, id);
        this.Dashboard.runDatePickerHandlers(start);
    }

}

Mealpler.controller('WeekCtrl', WeekController);
