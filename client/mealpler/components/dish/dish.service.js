class DishService {
    constructor(DayService, StorageService) {
        Object.assign(this, {DayService, StorageService});
    }

    deleteDish(item, mealType, date) {
        const fullDateName = moment(date).format("YYYY-M-D");

        return this.StorageService.getSingleDateMealsList(fullDateName).then((response) => {
            const currentMeals = response.meals
                .find(b => b.type === mealType).dishes;
            const i = _.findIndex(currentMeals, b => b.name === item.name);
            currentMeals.splice(i, 1);

            return this.DayService.cleanAndSetDayMealsList(fullDateName, response);
        });

    };
}
Mealpler.service('DishService', DishService);