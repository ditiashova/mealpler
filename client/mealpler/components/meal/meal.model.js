class MealModel {
    constructor () {}

    emptyMealsList() {
        return [
            {id: 1, mealNo: 1, mealName: 'breakfast', dishesList: []},
            {id: 2, mealNo: 2, mealName: 'lunch', dishesList: []},
            {id: 3, mealNo: 3, mealName: 'dinner', dishesList: []},
            {id: 4, mealNo: 4, mealName: 'supper', dishesList: []},
            {id: 5, mealNo: 5, mealName: 'snacks', dishesList: []}
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
            "productsList": [],
            "deletable": false
        }}
}

Mealpler.service('MealModel', MealModel);