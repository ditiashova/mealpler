class DayService {
    constructor(MealModel, StorageService, DayModel) {
        Object.assign(this, {MealModel, StorageService, DayModel});
    }

    pasteMenuForDay(forDay) {
        const stored = this.StorageService.getStoredItem("menu");
        const day = this.DayModel.createNewDay(forDay);
        stored.forEach(a => day.mealsList.push(a));
        this.MealModel.updateMealsList(forDay.format("YYYY-M-D"), day);
    }
}
Mealpler.service('DayService', DayService);