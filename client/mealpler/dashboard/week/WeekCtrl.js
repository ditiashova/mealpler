Mealpler.controller('WeekCtrl', WeekController);

function WeekController ($rootScope, $scope, WeekModel, MealModel, DayModel) {
    const today = moment();

    this.todayFullDate = moment().format('YYYY-M-D');
    this.weekDuration = 7;

    this.init = (forDate) => {
        this._setNewWeekStart(forDate);
        this._calculateWeekRange(this.weekStartDate);
        this._setWeekFirstAndLastDays(forDate);
        this._loadMealsDataForWeekRange();
    };

    this._getWeekStart = (date) => {
        return moment(date).startOf('week');
    };

    this._setNewWeekStart = (date) => {
        this.weekStartDate = this._getWeekStart(date);
    };

    this._calculateWeekRange = (firstDay) => {
        this.weekDaysFoodInfo = [];

        for (let i = 0; i < this.weekDuration; i++) {
            let newDay = DayModel.createNewDay(moment(firstDay).add(i, 'day'), i);
            this.weekDaysFoodInfo.push(newDay);
        }
    };

    this._setWeekFirstAndLastDays = (date) => {
        this.weekFirstDay = this._getWeekStart(date);
        this.weekLastDay = this._getWeekStart(date).add(this.weekDuration, 'day');
    };

    this._loadMealsDataForWeekRange = () => {
        const storedMeals = MealModel.findDateRangeMealList(this.weekFirstDay, this.weekDuration);
        this.weekDaysFoodInfo.map(day => {
            day.mealsList = angular.copy(storedMeals.filter(a => a.fullDate === day.fullDate)[0].list);
            day.mealsList.map(a => a.hasMeals = a.mealList.length > 0);
        });
    };

    this.init(today);
}
