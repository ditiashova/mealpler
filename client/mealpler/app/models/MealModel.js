Mealpler.service('MealModel', function () {
    let service = this;
    const meals = [
        {id: 1, letter: 'B', fullName: 'Breakfast'},
        {id: 2, letter: 'L', fullName: 'Lunch'},
        {id: 3, letter: 'D', fullName: 'Dinner'},
        {id: 4, letter: 'Su', fullName: 'Supper'},
        {id: 5, letter: 'Sn', fullName: 'Snacks'}
    ];
    service.mealsList = function () {
        return meals;
    };
});