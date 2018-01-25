class MealService {
    constructor(StorageService) {
        Object.assign(this, {StorageService});
    }

    editMeal(meal, newContent, contentType) {
        if (!meal.dishes) meal.dishes = [];

        if (contentType === 'list') {
            meal.dishes = meal.dishes.concat(newContent.components);
        } else if (contentType === 'recipe') {
            meal.dishes.push(newContent);
        } else if (contentType === 'stored') {
            if (!newContent.dishes) {
                //means that one meal has been copied with dbl click
                meal.dishes.push(newContent);
            } else {
                meal.dishes = meal.dishes.concat(newContent.dishes);
            }
        }

        return meal;
    }

    createNewMealWithNewContent(mealContent, mealNo, contentType) {
        const newMeal = new Meal(mealNo);
        return this.editMeal(newMeal, mealContent, contentType);
    }

    cleanEmptyMeals(data) {
        if (!data.meals) {
            return null;
        } else {
            _.remove(data.meals, a => a.dishes.length === 0);
            data.meals.forEach((a) => {
                _.remove(a.dishes, b => b.type === DishType.RECIPE && b.components.length === 0);
            });
            return data;
        }
    }

    getEmptyMeals() {
        const emptyMeals = [];
        for (const meal in MealType) {
            emptyMeals.push(new Meal(MealType[meal], []));
        }
        return emptyMeals;
    }
}

Mealpler.service('MealService', MealService);