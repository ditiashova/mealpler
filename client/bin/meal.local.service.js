class MealLocalService {
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
            this.cleanAndSetMealsList(storedDayName,itemContent);
        } else {
            //check if we already have smth. for this MEAL
            const oldItemContent = storedDay.mealsList.filter(old => old.mealNo === dayMeal.mealNo);

            if (oldItemContent.length === 0) {
                storedDay.mealsList.push(dayMeal);
                this.cleanAndSetMealsList(storedDayName,storedDay);
            } else {
                storedDay.mealsList.find(old => old.mealNo === dayMeal.mealNo).dishesList = dayMeal.dishesList;
                this.cleanAndSetMealsList(storedDayName, storedDay);
            }
        }
    }

    deleteMeal(mealName, date) {
        const storedDayName = date.format("YYYY-M-D");
        let availableItem = this.getMealsList(storedDayName);
        let i = availableItem.mealsList.findIndex(b => b.mealName === mealName);
        availableItem.mealsList.splice(i, 1);
        this.cleanAndSetMealsList(storedDayName,availableItem);
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
                mealsList: this.findMealList(a)
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

    cleanEmptyRecipes(data) {
        data.mealsList.forEach(a => a.dishesList.map((b, i) => {
            if (b.type === 'recipe' && b.productsList.length === 0) {
                a.dishesList.splice(i, 1);
            }
        }));
        return data;
    }

    cleanAndSetMealsList(date, rawData) {
        const cleanData = this.cleanEmptyRecipes(angular.copy(rawData));
        localStorage.setItem(date, JSON.stringify(cleanData));
    }
}

Mealpler.service('MealLocalService', MealLocalService);