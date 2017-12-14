class DayService {
    constructor(MealModel, StorageModel, DayModel) {
        Object.assign(this, {MealModel, StorageModel, DayModel});
    }

    pasteMenuForDay(forDay) {
        const stored = this.StorageModel.getStoredItem("menu");
        const day = this.DayModel.createNewDay(forDay);
        stored.forEach(a => day.mealsList.push(a));
        this.MealModel.updateMealsList(forDay.format("YYYY-M-D"), day);
    }
}
Mealpler.service('DayService', DayService);