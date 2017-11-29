Mealpler.service('MealModel', function () {
    let service = this;
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
        "deletable": false
    };

    const defaultRecipe = {
        "name": "",
        "type": "meal",
        "hasIngredients": true,
        "list": [],
        "deletable": false
    };

    service.saveMealInfo = function (dayMeal, date) {
        const storedDayName = date.format("YYYY-M-D");
        let storedDay = service.getMealsList(storedDayName);

        //check if there is nothing for this day
        if (storedDay === null) {
            let itemContent = service.createNewDay(date);
            itemContent.mealsList.push(angular.copy(dayMeal));
            service.updateMealsList(storedDayName,itemContent);
        } else {
            //check if we already have smth. for this MEAL
            let oldItemContent = storedDay.mealsList.filter(old => old.mealNo === dayMeal.mealNo);

            if (oldItemContent.length === 0) {
                storedDay.mealsList.push(dayMeal);
                service.updateMealsList(storedDayName,storedDay);
            } else {
                storedDay.mealsList.filter(old => old.mealNo === dayMeal.mealNo)[0].mealList = dayMeal.mealList;
                service.updateMealsList(storedDayName,storedDay);
            }
        }
    };

    service.deleteAllMeal = function (mealName, date) {
        const storedDayName = date.format("YYYY-M-D");
        let availableItem = service.getMealsList(storedDayName);
        let i = availableItem.mealsList.findIndex(b => b.mealName === mealName);
        availableItem.mealsList.splice(i, 1);
        service.updateMealsList(storedDayName,availableItem);
    };

    service.deleteItemMeal = function (item, mealName, date) {
        const storedDayName = date.format("YYYY-M-D");
        let availableItem = service.getMealsList(storedDayName);
        let currentMeals = availableItem.mealsList.filter(b => b.mealName === mealName)[0].mealList;
        let i = currentMeals.findIndex(b => b.name === item.name);
        currentMeals.splice(i, 1);
        service.updateMealsList(storedDayName, availableItem);
    };

    service.findMealList = function(date) {
        const storedDayName = date.format("YYYY-M-D");
        let data = service.getMealsList(storedDayName);
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

    service.getMealsList = function (forDate) {
        let all = [];
        try {
            all = JSON.parse(localStorage.getItem(forDate));
        } catch (error) {
            console.log(error);
        }
        return all;
    };

    service.updateMealsList = function (date, newData) {
        localStorage.setItem(date, JSON.stringify(newData));
    };

    service.createNewDay = function (date) {
        let day = {};
        day.dayNo = moment(date).day();
        day.mealsList = [];
        return day;
    };

    service.createDefaultProduct = function () {
        return defaultProduct;
    };

    service.createDefaultRecipe = function () {
        return defaultRecipe;
    };

    service.emptyMealsList = function () {
        return meals;
    };
});