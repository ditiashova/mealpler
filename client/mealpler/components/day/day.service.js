class DayService {
    constructor(MealService, StorageService, DayModel) {
        Object.assign(this, {MealService, StorageService, DayModel});
    }

    pasteMenuForDay(date, userId) {
        const stored = this.StorageService.getLocalStorageData("menu");
        const dayNewContent = this.DayModel.createNewDay(date);
        stored.forEach(a => dayNewContent.mealsList.push(a));
        this.MealService.cleanAndSetMealsList(date, dayNewContent, userId);
    }
}
Mealpler.service('DayService', DayService);