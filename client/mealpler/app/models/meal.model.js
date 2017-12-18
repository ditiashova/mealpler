class MealModel {
    constructor () {}

    emptyMealsList() {
        return [
            {id: 1, mealNo: 1, mealName: 'breakfast', mealList: []},
            {id: 2, mealNo: 2, mealName: 'lunch', mealList: []},
            {id: 3, mealNo: 3, mealName: 'dinner', mealList: []},
            {id: 4, mealNo: 4, mealName: 'supper', mealList: []},
            {id: 5, mealNo: 5, mealName: 'snacks', mealList: []}
        ]}

    createDefaultProduct() {
        return {
            "name": "",
            "type": "product",
            "hasIngredients": false,
            "quantity": 1,
            "deletable": false
        }};

    createDefaultRecipe() {
        return {
            "name": "",
            "type": "recipe",
            "hasIngredients": true,
            "list": [],
            "deletable": false
        }}
}

Mealpler.service('MealModel', MealModel); //todo split model and service