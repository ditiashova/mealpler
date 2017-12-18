class DayService {
    constructor(MealService, StorageService, DayModel) {
        Object.assign(this, {MealService, StorageService, DayModel});
    }

    pasteMenuForDay(forDay) {
        const stored = this.StorageService.getStoredItem("menu");
        const day = this.DayModel.createNewDay(forDay);
        stored.forEach(a => day.mealsList.push(a));
        this.MealService.updateMealsList(forDay.format("YYYY-M-D"), day);
    }
}
Mealpler.service('DayService', DayService);