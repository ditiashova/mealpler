Mealpler.controller('WeekCtrl', WeekController);

function WeekController ($rootScope, $scope, WeekModel, MealModel) {
    const today = moment();

    this.today = moment().format('YYYY-M-D');
    this._weekDuration = 7;

    this.init = (forDate) => {
        this.range = []; //dates for 7 days
        this._calculateWeekRange(moment(forDate).startOf('week'));
        //get meal's list for each day of week range
        this._loadMealsDataForWeek();
        $rootScope.$broadcast('refreshCurrentMeal');
    };

    this._calculateWeekRange = (firstDay) => {
        for (let i = 0; i < this._weekDuration; i++) {
            let nextDay = moment(firstDay).add(i, 'day');
            nextDay.id = i;
            nextDay.dayName = moment(nextDay).format("YYYY-M-D");
            this.range.push(nextDay);
        }

        this.firstDay = this.range[0];
        this.lastDay = this.range[this._weekDuration - 1];
    };

    this._loadMealsDataForWeek = () => {
        const storedMeals = MealModel.findDateRangeMealList(this.firstDay, this._weekDuration);
        this.range.map(d => {
            d.mealsList = angular.copy(storedMeals.filter(s => s.dayName === d.dayName)[0].list);
            d.mealsList.map(a => a.mealList.length > 0 ? a.hasMeals = true : a.hasMeals = false);
        });
        $rootScope.$emit('updateShopList');
    };

    this.init(today);

    $scope.$on('refreshMealsForWeek', () => this._loadMealsDataForWeek());
    $scope.$on('refreshDataForWeek', (e, newWeekStart) => this.init(newWeekStart));

}
