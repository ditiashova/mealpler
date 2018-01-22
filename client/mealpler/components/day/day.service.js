class DayService {
    constructor(StorageService, MealService) {
        Object.assign(this, {StorageService, MealService});
    }

    /**
     *
     * @param {Object} mealContent
     * @param {string} date
     * @param {string} userId
     * @param {string} mealType
     * @param {number} mealNo
     * @return {Promise<void>}
     */
    updateDayInfo(mealContent, date, userId, mealType, mealNo) {
        const fullDateName = moment(date).format("YYYY-M-D"); //in case nonformatted date were passed
        return this.StorageService.getSingleDateMealsList(fullDateName, userId).then((response) => {
            const newDayContent = this._resolveSingleDayData(response, date, mealContent, mealType, mealNo);
            return this.cleanAndSetDayMealsList(fullDateName, newDayContent, userId);
        });
    }

    deleteMealFromDay(mealNo, date, id) {
        const fullDateName = moment(date).format("YYYY-M-D");
        return this.StorageService.getSingleDateMealsList(fullDateName, id).then((response) => {
            const availableItem = response;
            let i = availableItem.meals.findIndex(b => b.type === mealNo);
            availableItem.meals.splice(i, 1);
            return this.cleanAndSetDayMealsList(fullDateName, availableItem, id);
        });
    };

    /** @return Promise<void> */
    cleanAndSetDayMealsList(date, rawData, id) {
        const cleanData = this.MealService.cleanEmptyMeals(angular.copy(rawData));
        return this.StorageService.setSingleDateMealsList(date, cleanData, id);
    }

    _resolveSingleDayData(oldDayContent, date, mealContent, contentType, mealNo)  {
        //check if there is smth. for this DAY
        if (oldDayContent === null || !oldDayContent.meals) {
            return this._createNewDayWithNewContent(date, mealContent, contentType, mealNo);
        } else {
            //check if we already have smth. for this MEAL
            const oldMealContent = oldDayContent.meals.find(meal => meal.type === mealNo);

            if (!!oldMealContent) {
                this.MealService.editMeal(oldMealContent, mealContent, contentType);
                return oldDayContent;
            } else {
                const meal = this.MealService.createNewMealWithNewContent(mealContent, mealNo, contentType);
                oldDayContent.meals.push(meal);
                return oldDayContent;
            }
        }
    }

    _createNewDayWithNewContent(date, mealContent, mealType, mealNo) {
        const day = new Day(moment(date));
        const meal = this.MealService.createNewMealWithNewContent(mealContent, mealNo, mealType);
        day.meals.push(meal);
        return day;
    }

    createNewDayWithEmptyContent(date) {
        const newDay = new Day(moment(date));
        newDay.meals = this.MealService.getEmptyMeals();
        return newDay;
    }
}

Mealpler.service('DayService', DayService);