const MealType = {
    BREAKFAST: 1,
    LUNCH: 2,
    DINNER: 3,
    SUPPER: 4,
    SNACKS: 5
};

class Meal {

    /**
     * @param {number} type
     * @param {Dish[]} dishes
     */
    constructor(type, dishes = []) {
        Object.assign(this, {type, dishes})
    }
}