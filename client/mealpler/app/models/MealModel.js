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

    this.createDefaultProduct = () => defaultProduct;

    this.createDefaultRecipe = () => defaultRecipe;

    this.emptyMealsList = () => meals;
}