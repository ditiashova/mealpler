Mealpler.service('MealModel', function () {
    let service = this;
    const meals = [
        {id: 1, mealNo: 1, mealName: 'breakfast', mealList: []},
        {id: 2, mealNo: 2, mealName: 'lunch', mealList: []},
        {id: 3, mealNo: 3, mealName: 'dinner', mealList: []},
        {id: 4, mealNo: 4, mealName: 'supper', mealList: []},
        {id: 5, mealNo: 5, mealName: 'snacks', mealList: []}
    ];
    service.updateMealInfo = function (dayMeal) {
        let itemName = moment(dayMeal.currentDate).format('YYYY-M-D');
        let availableItems = service.getMealsList();

        //check if we have such already
        let oldItemContent = availableItems.filter(a => a.date === itemName);

        if (oldItemContent.length > 0) {
            let newItemContent = {};
            newItemContent.mealsList = angular.copy(dayMeal.mealsList);
            availableItems.map(a => a.date === itemName ? a.mealsList = angular.copy(dayMeal.mealsList) : '');
            localStorage.setItem("MealData", JSON.stringify(availableItems));
        } else {
            let itemContent = {};
            itemContent.date = itemName;
            itemContent.day = moment(dayMeal.currentDate).format('dddd');
            itemContent.dayNo = moment(dayMeal.currentDate).day();
            itemContent.mealsList = angular.copy(dayMeal.mealsList);
            availableItems.push(itemContent);
            localStorage.setItem("MealData", JSON.stringify(availableItems))
        }
    };

    service.findMealList = function(forData) {
        return service.getMealsList().filter(a => a.date === forData).mealsList;
    };

    service.getMealsList = function () {
        let all = [];
        try {
            all = JSON.parse(localStorage.getItem("MealData"));
        } catch (error) {
            console.log(error);
        }
        return all;
    };

    service.mealsList = function () {
        return meals;
    };
});