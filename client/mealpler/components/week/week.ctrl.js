class WeekController {
    constructor($scope, MealModel, DayModel, MealService, Auth) {
        Object.assign(this, {$scope, MealModel, DayModel, MealService, Auth});
        PNotify.prototype.options.delay = 2000;
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
        //this._calculateWeekRange(this.weekStartDate);
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
        this.MealService.findDateRangeMealList(this.weekFirstDay, this.weekDuration, this.userPlannerId).then((response) => {
            this.weekDaysFoodInfo = angular.copy(response);
            this.weekDaysFoodInfo.map(day => {
                //day.mealsList = angular.copy(storedMeals.find(a => a.fullDate === day.fullDate).mealsList);
                day.mealsList.forEach(a => a.hasMeals = a.dishesList.length > 0);
            });
            this.$scope.$apply();
        }, (error) => {
            console.log(error);
        });
    }
}

Mealpler.controller('WeekCtrl', WeekController);
