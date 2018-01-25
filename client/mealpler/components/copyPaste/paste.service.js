class PasteService {
    constructor (DayService, StorageService) {
        Object.assign(this, {DayService, StorageService});
    }

    /**
     *
     * @param {string} name
     * @param {number} mealNo
     * @param {Moment} date
     * @param {string} userId
     * @return {Promise<void>}
     */
    pasteMeal(name, mealNo, date, userId) {
        const storedOld = this.StorageService.getLocalStorageData(name);
        return this.DayService.updateDayInfo(storedOld, date, userId, 'stored', mealNo);
    };

    /**
     *
     * @param {Moment} date
     * @param {string} userId
     * @return {Promise<void>}
     */
    pasteDay(date, userId) {
        const stored = this.StorageService.getLocalStorageData("day");
        const fullDateName = date.format("YYYY-M-D");
        const dayNewContent = new Day(date);
        dayNewContent.meals = stored.slice();
        return this.DayService.cleanAndSetDayMealsList(fullDateName, dayNewContent, userId);
    }

}

Mealpler.service('paste', PasteService);