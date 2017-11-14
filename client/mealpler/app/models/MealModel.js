Mealpler.service('MealModel', function () {
    let service = this;
    const meals = [
        {id: 1, mealNo: 1, mealName: 'breakfast', mealList: []},
        {id: 2, mealNo: 2, mealName: 'lunch', mealList: []},
        {id: 3, mealNo: 3, mealName: 'dinner', mealList: []},
        {id: 4, mealNo: 4, mealName: 'supper', mealList: []},
        {id: 5, mealNo: 5, mealName: 'snacks', mealList: []}
    ];
    service.saveMealInfo = function (dayMeal, date) {
        let storedDay = service.getMealsList(date.fullDate);

        //check if there is nothing for this day
        if (storedDay === null) {
            let itemContent = service.createNewDay(date);
            itemContent.mealsList.push(angular.copy(dayMeal));
            service.updateMealsList(date.fullDate,itemContent);
        } else {
            //check if we already have smth. for this MEAL
            let oldItemContent = storedDay.mealsList.filter(old => old.mealNo === dayMeal.mealNo);

            if (oldItemContent.length === 0) {
                storedDay.mealsList.push(dayMeal);
                service.updateMealsList(date.fullDate,storedDay);
            } else {
                storedDay.mealsList.filter(old => old.mealNo === dayMeal.mealNo)[0].mealList = dayMeal.mealList;
                service.updateMealsList(date.fullDate,storedDay);
            }
        }
    };

    service.deleteAllMeal = function (mealName, date) {
        let availableItem = service.getMealsList(date.fullDate);
        let i = availableItem.mealsList.findIndex(b => b.mealName === mealName);
        availableItem.mealsList.splice(i, 1);
        service.updateMealsList(date.fullDate,availableItem);
    };

    service.deleteItemMeal = function (item, mealName, date) {
        let availableItem = service.getMealsList(date.fullDate);
        let currentMeals = availableItem.mealsList.filter(b => b.mealName === mealName)[0].mealList;
        let i = currentMeals.findIndex(b => b.name === item.name && b.quantity === item.quantity);
        currentMeals.splice(i, 1);
        service.updateMealsList(date.fullDate, availableItem);
    };

    service.findMealList = function(date) {
        let data = service.getMealsList(date.fullDate);
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
        day.fullDate = moment(date).format('YYYY-M-D');
        day.dayName = moment(date).format('dddd');
        day.dayNo = moment(date).day();
        day.mealsList = [];
        return day;
    };

    service.emptyMealsList = function () {
        return meals;
    };
});