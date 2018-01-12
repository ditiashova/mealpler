class MealService {
    constructor(DayModel, MealModel, FirebaseStorageService) {
        Object.assign(this, {DayModel, MealModel, FirebaseStorageService});
        this.meals = this.MealModel.emptyMealsList(); //useless
    }

    updateMealInfo(mealContent, date, userId, mealType, mealNo) {
        const fullDateName = moment(date).format("YYYY-M-D"); //in case nonformatted date were passed
        this.FirebaseStorageService.getSingleDateMealsList(fullDateName, userId).then((response) => {
            const newDayContent = this._resolveNewDayData(response, date, mealContent, mealType, mealNo);
            this.cleanAndSetMealsList(fullDateName, newDayContent, userId);
        });
    }

    cleanAndSetMealsList(date, rawData, id) {
        const cleanData = MealService._cleanEmptyRecipes(angular.copy(rawData));
        this.FirebaseStorageService.setSingleDateMealsList(date, cleanData, id);
    }

    _resolveNewDayData(oldDayContent, date, mealContent, mealType, mealNo)  {
        //check if there is smth. for this DAY
        if (oldDayContent === null) {
            return this._createNewDayWithNewContent(date, mealContent, mealType, mealNo);
        } else {
            //check if we already have smth. for this MEAL
            const oldMealContent = oldDayContent.mealsList.find(meal => meal.mealNo === mealNo);

            if (!!oldMealContent) {
                MealService._editMeal(oldMealContent, mealContent, mealType);
                return oldDayContent;
            } else {
                const meal = this._createNewMealWithNewContent(mealContent, mealNo, mealType);
                oldDayContent.mealsList.push(meal);
                return oldDayContent;
            }
        }
    }

    _createNewMealWithNewContent(mealContent, mealNo, mealType) {
        const newMeal = this.MealModel.createNewMeal(mealNo);
        return MealService._editMeal(newMeal, mealContent, mealType);
    }

    _createNewDayWithNewContent(date, mealContent, mealType, mealNo) {
        const day = this.DayModel.createNewDay(moment(date));
        const meal = this._createNewMealWithNewContent(mealContent, mealNo, mealType);
        day.mealsList.push(meal);
        return day;
    }

    static _editMeal(meal, newContent, mealType) {
        if (mealType === 'list') {
            meal.dishesList = meal.dishesList.concat(newContent.productsList);
        } else if (mealType === 'recipe') {
            meal.dishesList.push(newContent);
        } else if (mealType === 'stored') {
            meal.dishesList = meal.dishesList.concat(newContent.dishesList);
        }

        return meal;
    }

    static _cleanEmptyRecipes(data) {
        data.mealsList.forEach(a => a.dishesList.map((b, i) => {
            if (b.type === 'recipe' && b.productsList.length === 0) {
                a.dishesList.splice(i, 1);
            }
        }));
        return data;
    }


    deleteMeal(mealName, date) {
        const storedDayName = date.format("YYYY-M-D");
        let availableItem = this.getMealsList(storedDayName);
        let i = availableItem.mealsList.findIndex(b => b.mealName === mealName);
        availableItem.mealsList.splice(i, 1);
        this.updateCleanMealsList(storedDayName,availableItem);
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

}

Mealpler.service('MealService', MealService);