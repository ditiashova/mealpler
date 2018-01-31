class WeekService {
    constructor(MealService, StorageService, DayService) {
        Object.assign(this, {MealService, StorageService, DayService});
    }

    /**
     * Used for modifying data when we have an id and can get user's data by id
     * @return {Promise<Meal[]>}
     */
    findDateRangeMealList(start, q) {
        const rangeList = this.getWeekList(start, q);

        return this.StorageService.getAllMealsForUser().then(response =>
            this._resolveExistingMealData(response, rangeList)
        );
    }

    //used for modifying data when we already have data
    organizeDataForWeek(start, q, data) {
        const weekList = this.getWeekList(start, q);

        return this._resolveExistingMealData(data, weekList);
    }

    _resolveExistingMealData(data, datesList) {
        const resolved = [];
        const emptyMeals = this.MealService.getEmptyMeals();

        if (data === null) {
            datesList.forEach((singleDate) => {
                resolved.push(this.DayService.createNewDayWithEmptyContent(singleDate));
            })
        } else {
            datesList.forEach((singleDate) => {
                const currentDay = new Day(moment(singleDate));

                if (data[singleDate] && data[singleDate].meals) {
                    currentDay.meals = angular.copy(data[singleDate].meals);
                }
                if (currentDay === null) {
                    resolved.push(this.DayService.createNewDayWithEmptyContent(singleDate));
                } else {
                    if (currentDay.meals === undefined || currentDay.meals.length === 0) {
                        currentDay.meals = angular.copy(emptyMeals);
                    } else {
                        for (let i = 0; i < emptyMeals.length; i++) {
                            let k = currentDay.meals.filter(b => b.type === emptyMeals[i].type);
                            if (k.length === 0) {
                                currentDay.meals.push(emptyMeals[i]);
                            } else if (k[0].dishes === undefined ) {
                                const j = currentDay.meals.findIndex(b => b.mealNo === emptyMeals[i].mealNo);
                                currentDay.meals.splice(j, 1, angular.copy(emptyMeals[i]));
                            } else {
                                //just leave as it is if all meals are there
                            }
                        }
                    }
                    resolved.push(currentDay);
                }
            })
        }
        return resolved;
    }

    getWeekStart(date) {
        const startOfWeek = moment(date).startOf('week');
        return new Day(startOfWeek);
    };

    getWeekEnd(date, weekDuration) {
        const endOfWeek = moment(date).startOf('week').add(weekDuration - 1, 'day');
        return new Day(endOfWeek);
    }

    getWeekList(start, duration) {
        const weekList = [];

        for (let i = 0; i < duration; i++) {
            weekList.push(moment(start).add(i, 'days').format("YYYY-M-D"));
        }

        return weekList;
    }
}
Mealpler.service('WeekService', WeekService);