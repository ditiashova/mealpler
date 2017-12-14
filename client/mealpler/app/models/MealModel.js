Mealpler.service('MealModel', MealModel); //todo split model and service

function MealModel (DayModel) {
    const meals = [
        {id: 1, mealNo: 1, mealName: 'breakfast', mealList: []},
        {id: 2, mealNo: 2, mealName: 'lunch', mealList: []},
        {id: 3, mealNo: 3, mealName: 'dinner', mealList: []},
        {id: 4, mealNo: 4, mealName: 'supper', mealList: []},
        {id: 5, mealNo: 5, mealName: 'snacks', mealList: []}
    ];
    const defaultProduct = {
        "name": "",
        "type": "product",
        "hasIngredients": false,
        "quantity": 1,
        "deletable": false
    };

    const defaultRecipe = {
        "name": "",
        "type": "meal",
        "hasIngredients": true,
        "list": [],
        "deletable": false
    };

    this.saveMealInfo = (dayMeal, date) => {
        const storedDayName = date;
        let storedDay = this.getMealsList(storedDayName);

        //check if there is nothing for this day
        if (storedDay === null) {
            let itemContent = DayModel.createNewDay(moment(date));
            itemContent.mealsList.push(angular.copy(dayMeal));
            this.updateMealsList(storedDayName,itemContent);
        } else {
            //check if we already have smth. for this MEAL
            let oldItemContent = storedDay.mealsList.filter(old => old.mealNo === dayMeal.mealNo);

            if (oldItemContent.length === 0) {
                storedDay.mealsList.push(dayMeal);
                this.updateMealsList(storedDayName,storedDay);
            } else {
                storedDay.mealsList.filter(old => old.mealNo === dayMeal.mealNo)[0].mealList = dayMeal.mealList;
                this.updateMealsList(storedDayName,storedDay);
            }
        }
    };

    this.deleteAllMeal = (mealName, date) => {
        const storedDayName = date.format("YYYY-M-D");
        let availableItem = this.getMealsList(storedDayName);
        let i = availableItem.mealsList.findIndex(b => b.mealName === mealName);
        availableItem.mealsList.splice(i, 1);
        this.updateMealsList(storedDayName,availableItem);
    };

    this.findMealList = (forDate) => {
        let data = this.getMealsList(forDate);
        if (data === null) return meals;
        if (data != null) {
            if (data.mealsList === undefined) {
                return meals; //empty meals
            } else {
                for (let i = 0; i < meals.length; i++) {
                    let k = data.mealsList.filter(b => b.mealNo === meals[i].mealNo);
                    if (k.length === 0) {
                        data.mealsList.push(meals[i]);
                    } else {
                        //just leave as it is
                    }
                }
                return data.mealsList;
            }
        }
    };

    this.findDateRangeMealList = (start, q) => {
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

    this.getMealsList = (forDate) => {
        let all = [];
        try {
            all = JSON.parse(localStorage.getItem(forDate));
        } catch (error) {
            console.log(error);
        }
        return all;
    };

    this.updateMealsList = (date, newData) => {
        localStorage.setItem(date, JSON.stringify(newData));
    };

    /*this.createNewDay = (date) => {
        let day = {};
        day.dayNo = moment(date).day();
        day.mealsList = [];
        return day;
    };*/

    this.extractAndSortProducts = (listOfMeals) => {
        return this._sortProducts(this._extractProducts(listOfMeals));
        //const extractedProducts = this._extractProducts(listOfMeals);
        //const sortedProducts = this._sortProducts(extractedProducts);
        //return sortedProducts;
    };

    this._extractProducts = (listOfMeals) => {
        let extracted = [];
        listOfMeals.map(ingestion => ingestion.list.map(meal => meal.mealList.map(food => {
            if (!food.hasIngredients) {
                extracted.push(food)
            } else if (food.hasIngredients) {
                food.list.map(product => extracted.push(product));
            }
        })));
        extracted.forEach(a => {
            a.name = a.name.trim();
        });
        return extracted;
    };

    this._sortProducts = (listOfProducts) => {
        let sorted = [];
        listOfProducts.forEach((a) => {
            let thisNameIndex = sorted.findIndex(b => b.name === a.name);
            if (thisNameIndex > -1) {
                sorted[thisNameIndex].quantity++;
            } else {
                sorted.push(angular.copy(a));
            }
        });
        return sorted;
    };

    this.createDefaultProduct = () => defaultProduct;

    this.createDefaultRecipe = () => defaultRecipe;

    this.emptyMealsList = () => meals;
}