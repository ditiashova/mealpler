class DishService {
    constructor(MealService, FirebaseStorageService) {
        Object.assign(this, {MealService, FirebaseStorageService});
    }

    deleteDish(item, mealName, date, userId) {
        this.FirebaseStorageService.getSingleDateMealsList(date, userId).then((response) => {
            const availableItem = response;
            const currentMeals = availableItem.mealsList.find(b => b.mealName === mealName).dishesList;
            const i = currentMeals.findIndex(b => b.name === item.name);
            currentMeals.splice(i, 1);
            this.MealService.cleanAndSetMealsList(date, availableItem, userId);
        });

    };
}
Mealpler.service('DishService', DishService);