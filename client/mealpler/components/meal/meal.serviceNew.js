class MealService {
    constructor(DayModel, MealModel, FirebaseStorageService) {
        Object.assign(this, {DayModel, MealModel, FirebaseStorageService});
        this.meals = this.MealModel.emptyMealsList(); //useless
    }

    findDateRangeMealList(start, q, userId) {
        const dayNames = [];
        //let results = [];

        for (let i = 0; i < q; i++) {
            dayNames.push(moment(start).add(i, 'days').format("YYYY-M-D"));
        }

        return this.FirebaseStorageService.getAllMealsForUser(userId).then((response) =>
            this._resolveExistingMealData(response, dayNames)
        );
    };

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



    _resolveExistingMealData(data, datesList) {
        const resolved = [];
        if (data === null) {
            datesList.forEach((singleDate) => {
                resolved.push(getEmptyDay.call(this, singleDate));
            })
        } else {
            datesList.forEach((singleDate) => {
                let existingDay = null;
                for (const storedDay in data) {
                    if (storedDay === singleDate) {
                        existingDay = data[storedDay];
                    }
                }
                if (existingDay === null) {
                    resolved.push(getEmptyDay.call(this, singleDate));
                } else {
                    if (existingDay.mealsList === undefined) {
                        existingDay.mealsList = this.MealModel.emptyMealsList();
                    } else {
                        for (let i = 0; i < this.meals.length; i++) {
                            let k = existingDay.mealsList.filter(b => b.mealNo === this.meals[i].mealNo);
                            if (k.length === 0) {
                                existingDay.mealsList.push(this.meals[i]);
                            } else {
                                //just leave as it is if all meals are there
                            }
                        }
                    }
                    resolved.push(existingDay);
                }
            })
        }

        return resolved;

        function getEmptyDay(date) {
            const newDay = this.DayModel.createNewDay(moment(date));
            newDay.mealsList = this.MealModel.emptyMealsList();
            return newDay;
        }
    }


    findMealList(data) {
        //let data = this.getMealsList(forDate);
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