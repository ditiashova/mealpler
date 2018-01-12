class MealService {
    constructor(DayModel, MealModel, FirebaseStorageService) {
        Object.assign(this, {DayModel, MealModel, FirebaseStorageService});
        this.meals = this.MealModel.emptyMealsList();
    }

    updateMealInfo(mealContent, date, userId, mealType, mealNo) {
        const fullDateName = moment(date).format("YYYY-M-D"); //in case nonformatted day were passed
        this.FirebaseStorageService.getSingleDateMealsList(fullDateName, userId).then((response) => {
            const newDayContent = this._resolveNewDayContentData(response, date, mealContent, mealType, mealNo);
            this.cleanAndSetMealsList(fullDateName, newDayContent, userId);
        });
    }

    cleanAndSetMealsList(date, rawData, id) {
        const cleanData = this._cleanEmptyRecipes(angular.copy(rawData));
        this.FirebaseStorageService.setSingleDateMealsList(date, cleanData, id);
    }

    _resolveNewDayContentData(oldDayContent, date, mealContent, mealType, mealNo)  {
        //check if there is smth. for this DAY
        if (oldDayContent === null) {
            return this._createNewDayWithNewContent(date, mealContent, mealType, mealNo);
        } else {
            //check if we already have smth. for this MEAL
            const oldMealContent = oldDayContent.mealsList.find(meal => meal.mealNo === mealNo);

            if (!!oldMealContent) {
                const oldDishesList = oldMealContent.dishesList;
                return this._editMeal(mealContent, oldDayContent, oldDishesList, mealType);
            } else {
                const meal = this._createNewMeal(mealContent, mealNo);
                oldDayContent.mealsList.push(meal);
                return oldDayContent;
            }
        }
    }

    _editMeal(mealContent, oldDay, dishesList, mealType) {
        if (mealType === 'list') {
            dishesList = dishesList.concat(mealContent.productsList);
        } else if (mealType === 'recipe') {
            dishesList.push(mealContent);
        } else if (mealType === 'stored') {
            dishesList = dishesList.concat(mealContent.dishesList);
        }
        oldDay.mealsList.find(meal => meal.mealNo === mealNo).dishesList = dishesList;
        return oldDay;
    }

    _createNewMeal(mealContent, mealNo) {
        const newMeal = this.MealModel.createNewMeal(mealNo);
        newMeal.dishesList.push(mealContent);
        return newMeal;
    }

    _createNewDayWithNewContent(date, mealContent, mealType, mealNo) {
        const newDay = this.DayModel.createNewDay(moment(date));
        const newMeal = this._createNewMeal(mealContent, mealNo);
        return this._editMeal(mealContent, newDay, newMeal.dishesList, mealType);;
    }


    _cleanEmptyRecipes(data) {
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