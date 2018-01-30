Mealpler.component('weekManager', {
    bindings: {
        startDate: '=',
        weekDuration: '<',
        onSwitchWeek: '<'
    },
    require: {
        MainCtrl: '^^mainBlock'
    },
    transclude: true,
    controller: function ($scope, MealService, WeekService, $timeout) {
        this.$onInit = () => {
            this.today = moment();
            this.weekDaysFoodInfo = [];
            this.MainCtrl.addDatabaseHandlers((data, date) => this.init(data, date));

            //manually initialize week ctrl if user is not signed in
            this.init(void 0, this.startDate);
        };

        this.switchWeek = (trend) => {
            this.onSwitchWeek(trend);
            this.init(this.MainCtrl.uid, this.startDate);
        };


        this.init = (data, forDate) => {
            this._setWeekStartAndLastDays(forDate);
            return this.setWeekDaysFoodInfo(data);
        };

        this._setWeekStartAndLastDays = (date) => {
            const newDate = date ? date : this.startDate;
            this.weekStartDate = WeekService._getWeekStart(newDate);
            this.weekLastDay = WeekService._getWeekEnd(newDate, this.weekDuration);
        };

        this.setWeekDaysFoodInfo = (data) => {
            if (data || data === null) {
                //data could be null if there is no data for user, but undefined data means no data from database
                $timeout(() => {
                    return Promise.resolve(this.weekDaysFoodInfo = WeekService.organizeDataForWeek(this.weekStartDate.date, this.weekDuration, data));
                });
            } else {
                //in cases when we whether have id => we'll get data from database; if id = false, service will return value from LocalStorage
                return WeekService.findDateRangeMealList(this.weekStartDate.date, this.weekDuration).then((response) => {
                    $timeout(() => {
                        this.weekDaysFoodInfo = angular.copy(response);
                    })
                });
            }
        };
    },
    templateUrl: 'scripts/components/week/week.tmpl.html',
});