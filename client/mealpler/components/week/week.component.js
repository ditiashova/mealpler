Mealpler.component('weekManager', {
    bindings: {
        week: '<'
    },
    require: {
        MainCtrl: '^^mainBlock',
        Dashboard: '^^dashboard'
    },
    transclude: true,
    controller: function ($scope, MealService, WeekService, $timeout) {
        this.today = moment();

        /*this.$onInit = () => {

            this.weekDays = [];
            this.MainCtrl.addDatabaseHandlers((data, date) => this.init(data, date));

            this.Dashboard.addWeekMealDataHandlers((data, startDate) => this.init(data, startDate));

            //manually initialize week ctrl if user is not signed in
            this.init(void 0, this.startDate);
        };

        this.switchWeek = (trend) => {
            this.onSwitchWeek(trend);
            this.init(void 0, this.startDate);
        };


        this.init = (data, forDate) => {
            this._setWeekStartAndLastDays(forDate);
            return this.setWeekDays(data);
        };

        this._setWeekStartAndLastDays = (date) => {
            const newDate = date ? date : this.startDate;
            this.weekStartDate = WeekService.getWeekStart(newDate);
            this.weekLastDay = WeekService.getWeekEnd(newDate, this.weekDuration);
        };

        this.setWeekDays = (data) => {
            if (data || data === null) {
                //data could be null if there is no data for user, but undefined data means no data from database
                $timeout(() => {
                    return Promise.resolve(this.weekDays = WeekService.organizeDataForWeek(this.weekStartDate.date, this.weekDuration, data));
                });
            } else {
                //in cases when we whether have id => we'll get data from database; if id = false, service will return value from LocalStorage
                return WeekService.findDateRangeMealList(this.weekStartDate.date, this.weekDuration).then((response) => {
                    $timeout(() => {
                        this.weekDays = angular.copy(response);
                    })
                });
            }
        };*/
    },
    templateUrl: 'scripts/components/week/week.tmpl.html',
});