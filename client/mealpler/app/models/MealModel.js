Mealpler.service('MealModel', function () {
    let service = this;
    const meals = [
        {id: 1, letter: 'B', fullName: 'breakfast'},
        {id: 2, letter: 'L', fullName: 'lunch'},
        {id: 3, letter: 'D', fullName: 'dinner'},
        {id: 4, letter: 'Su', fullName: 'supper'},
        {id: 5, letter: 'Sn', fullName: 'snacks'}
    ];
    service.mealsList = function () {
        return meals;
    };
});