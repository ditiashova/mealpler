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
        const cleanData = MealService._cleanEmptyData(angular.copy(rawData));
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
        if (!meal.dishesList) meal.dishesList = [];

        if (mealType === 'list') {
            meal.dishesList = meal.dishesList.concat(newContent.productsList);
        } else if (mealType === 'recipe') {
            meal.dishesList.push(newContent);
        } else if (mealType === 'stored') {
            meal.dishesList = meal.dishesList.concat(newContent.dishesList);
        }

        return meal;
    }

    static _cleanEmptyData(data) {
        data.mealsList.forEach((a, index, array) => {
            if (!a.dishesList) {
                //if dishes list is empty
                array.splice(index, 1);
            } else {
                a.dishesList.map((b, i) => {
                    if (b.type === 'recipe' && b.productsList.length === 0) {
                        a.dishesList.splice(i, 1);
                    }
                })
            }
        });
        return data;
    }


    deleteMeal(mealName, date, id) {
        this.FirebaseStorageService.getSingleDateMealsList(date, id).then((response) => {
            const availableItem = response;
            let i = availableItem.mealsList.findIndex(b => b.mealName === mealName);
            availableItem.mealsList.splice(i, 1);
            this.cleanAndSetMealsList(date, availableItem, id);
        });
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
                    if (existingDay.mealsList === undefined || existingDay.mealsList.length === 0) {
                        existingDay.mealsList = this.MealModel.emptyMealsList();
                    } else {
                        for (let i = 0; i < this.meals.length; i++) {
                            let k = existingDay.mealsList.filter(b => b.mealNo === this.meals[i].mealNo);
                            if (k.length === 0) {
                                existingDay.mealsList.push(this.meals[i]);
                            } else if (k[0].dishesList === undefined ) {
                                //findIndex because in Object *i could be differ from *j
                                const j = existingDay.mealsList.findIndex(b => b.mealNo === this.meals[i].mealNo);
                                existingDay.mealsList.splice(j, 1, this.meals[i]);
                            } else {
                                //just leave as it is if all meals are there
                            }
                        }
                    }
                    resolved.push(existingDay);
                }
            })
        }

        resolved.map(day => {
            day.mealsList.forEach(a => a.hasMeals = a.dishesList.length > 0);
        });

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