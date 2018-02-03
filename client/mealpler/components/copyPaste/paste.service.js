class PasteService {
    constructor (DayService, NotifyService, LocalStorageData) {
        Object.assign(this, {DayService, NotifyService, LocalStorageData});
    }

    /**
     *
     * @param {number} mealNo
     * @param {string} date
     * @return {Promise<void>}
     */
    pasteMeal(mealNo, date) {
        const stored = this.LocalStorageData.getLocalStorageData('meal');
        if (stored === null) {
            return this._showPasteError();
        } else {
            return this.DayService.updateDayInfo(stored, date, 'stored', mealNo);
        }
    };

    /**
     *
     * @param {Moment} date
     * @return {Promise<void>}
     */
    pasteDay(date) {
        const stored = this.LocalStorageData.getLocalStorageData("day");
        if (stored === null) {
            return this._showPasteError();
        } else {
            const fullDateName = date.format("YYYY-M-D");
            const dayNewContent = new Day(date);
            dayNewContent.meals = stored.slice();
            return this.DayService.cleanAndSetDayMealsList(fullDateName, dayNewContent);
        }
    }

    /**
     *
     * @return {Promise<void>}
     */
    _showPasteError() {
        this.NotifyService.show('Nothing to paste. Copy something.', 'error');
        return Promise.reject(new Error('PasteError: Nothing to paste!'));
    }

}

Mealpler.service('PasteService', PasteService);