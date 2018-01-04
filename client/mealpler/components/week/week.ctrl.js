class WeekController {
    constructor(MealModel, DayModel, MealService, $mdToast) {
        Object.assign(this, {MealModel, DayModel, MealService, $mdToast});

        this.todayFullDate = moment().format('YYYY-M-D');
        this.weekDuration = 7;

        const today = moment();
        this.init(today);
    }

    init(forDate) {
        this._setNewWeekStart(forDate);
        this._calculateWeekRange(this.weekStartDate);
        this._setWeekFirstAndLastDays(forDate);
        this._loadMealsDataForWeekRange();
    }

    _getWeekStart(date) {
        return moment(date).startOf('week');
    };

    _setNewWeekStart(date) {
        this.weekStartDate = this._getWeekStart(date);
    }

    _calculateWeekRange(firstDay) {
        this.weekDaysFoodInfo = [];

        for (let i = 0; i < this.weekDuration; i++) {
            const newDay = this.DayModel.createNewDay(moment(firstDay).add(i, 'day'), i);
            this.weekDaysFoodInfo.push(newDay);
        }
    }

    _setWeekFirstAndLastDays(date) {
        this.weekFirstDay = this._getWeekStart(date);
        this.weekLastDay = this._getWeekStart(date).add(this.weekDuration, 'day');
    }

    _loadMealsDataForWeekRange() {
        const storedMeals = this.MealService.findDateRangeMealList(this.weekFirstDay, this.weekDuration);
        this.weekDaysFoodInfo.map(day => {
            day.mealsList = angular.copy(storedMeals.find(a => a.fullDate === day.fullDate).mealsList);
            day.mealsList.forEach(a => a.hasMeals = a.dishesList.length > 0);
        });
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent('Simple Toast!')
                .position('top right')
                .hideDelay(999999999)
        );
    }
}

Mealpler.controller('WeekCtrl', WeekController);
