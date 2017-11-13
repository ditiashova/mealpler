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
        let itemDate = moment(date).format('YYYY-M-D');
        let availableItems = service.getMealsList(); //get all items

        //check if we already have smth. for this DAY
        let oldDayContent = availableItems.length > 0 ? availableItems.filter(a => a.fullDate === itemDate) : []; 

        if (oldDayContent.length > 0) {
            //check if we already have smth. for this MEAL
            let oldItemContent = oldDayContent[0].mealsList.filter(old => old.mealNo === dayMeal.mealNo); 
            
            if (oldItemContent.length === 0) {
                availableItems.map(a => a.fullDate === itemDate ? a.mealsList.push(dayMeal) : '');
                service.updateMealsList(availableItems);
            } else if (oldItemContent.length > 0) {
                availableItems.map(a => a.fullDate === itemDate ? (a.mealsList.filter(old => old.mealNo === dayMeal.mealNo)[0].mealList = dayMeal.mealList) : '');
                service.updateMealsList(availableItems);
            }
        } else { //if there is no data for this day
            let itemContent = service.createNewDay(date);
            itemContent.mealsList.push(angular.copy(dayMeal));
            availableItems.push(itemContent);
            service.updateMealsList(availableItems);
        }
    };

    service.deleteAllMeal = function (mealName, date) {
        let itemDate = moment(date).format('YYYY-M-D');
        let availableItems = service.getMealsList(); //get all items
        let i = availableItems.filter(a => a.fullDate === itemDate)[0].mealsList.findIndex(b => b.mealName === mealName);
        availableItems.filter(a => a.fullDate === itemDate)[0].mealsList.splice(i, 1);
        service.updateMealsList(availableItems);

    };

    service.deleteItemMeal = function (item, mealName, date) {
        let itemDate = moment(date).format('YYYY-M-D');
        let availableItems = service.getMealsList(); //get all items
        let i = availableItems.filter(a => a.fullDate === itemDate)[0].mealsList.filter(b => b.mealName === mealName)[0].mealList.findIndex(b => b.name === item.name && b.quantity === item.quantity);
        availableItems.filter(a => a.fullDate === itemDate)[0].mealsList.filter(b => b.mealName === mealName)[0].mealList.splice(i, 1);
        service.updateMealsList(availableItems);
    };

    service.findMealList = function(forData) {
        let data = service.getMealsList().filter(a => a.fullDate === forData);
        if (data.length === 0) return meals;
        if (data != undefined) {
            if (data[0].mealsList === undefined) {
                return meals; //empty meals
            } else {
                for (let i = 0; i < meals.length; i++) {
                    let k = data[0].mealsList.filter(b => b.mealNo === meals[i].mealNo);
                    if (k.length === 0) {
                        data[0].mealsList.push(meals[i]);
                    } else {
                        //just leave as it is
                        /*data[0].mealsList.push(k[0]);*/
                    }
                }
                return data[0].mealsList;
            }
        }
    };

    service.getMealsList = function () {
        let all = [];
        try {
            all = JSON.parse(localStorage.getItem("MealData"));
        } catch (error) {
            console.log(error);
        }
        return all != null ? all : [];
    };

    service.updateMealsList = function (newData) {
        localStorage.setItem("MealData", JSON.stringify(newData));
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