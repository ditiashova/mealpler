class MealService {
    constructor(DayModel, MealModel) {
        Object.assign(this, {DayModel, MealModel});
        this.meals = this.MealModel.emptyMealsList();
    }

    saveMealInfo(dayMeal, date) {
        const storedDayName = date;
        const storedDay = this.getMealsList(storedDayName);

        //check if there is smth. for this day
        if (storedDay === null) {
            const itemContent = this.DayModel.createNewDay(moment(date));
            itemContent.mealsList.push(angular.copy(dayMeal));
            this.updateMealsList(storedDayName,itemContent);
        } else {
            //check if we already have smth. for this MEAL
            const oldItemContent = storedDay.mealsList.filter(old => old.mealNo === dayMeal.mealNo);

            if (oldItemContent.length === 0) {
                storedDay.mealsList.push(dayMeal);
                this.updateMealsList(storedDayName,storedDay);
            } else {
                storedDay.mealsList.find(old => old.mealNo === dayMeal.mealNo).mealList = dayMeal.mealList;
                this.updateMealsList(storedDayName,storedDay);
            }
        }
    }

    deleteMeal(mealName, date) {
        const storedDayName = date.format("YYYY-M-D");
        let availableItem = this.getMealsList(storedDayName);
        let i = availableItem.mealsList.findIndex(b => b.mealName === mealName);
        availableItem.mealsList.splice(i, 1);
        this.updateMealsList(storedDayName,availableItem);
    };

    findDateRangeMealList(start, q) {
        const dayNames = [];
        const results = [];

        for (let i = 0; i < q; i++) {
            dayNames.push(moment(start).add(i, 'days').format("YYYY-M-D"));
        }

        dayNames.forEach((a) => {
            results.push({
                fullDate: a,
                list: this.findMealList(a)
            });
        });

        return results;
    };

    findMealList(forDate) {
        let data = this.getMealsList(forDate);
        if (data === null) return this.meals;
        if (data != null) {
            if (data.mealsList === undefined) {
                return this.meals; //empty meals
            } else {
                for (let i = 0; i < this.meals.length; i++) {
                    let k = data.mealsList.filter(b => b.mealNo === this.meals[i].mealNo);
                    if (k.length === 0) {
                        data.mealsList.push(this.meals[i]);
                        data.mealsList.push(this.meals[i]);
                    } else {
                        //just leave as it is
                    }
                }
                return data.mealsList;
            }
        }
    };

    getMealsList(forDate) {
        let all = [];
        try {
            all = JSON.parse(localStorage.getItem(forDate));
        } catch (error) {
            console.log(error);
        }
        return all;
    }

    updateMealsList(date, newData) {
        localStorage.setItem(date, JSON.stringify(newData));
    }
}

Mealpler.service('MealService', MealService);