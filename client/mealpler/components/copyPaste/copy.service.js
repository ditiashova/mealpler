class CopyService {
    constructor (NotifyService, LocalStorageData) {
        Object.assign(this, {NotifyService, LocalStorageData});
    }

    /**
     *
     * @param {string} name
     * @param {Object} content
     */
    copyFood(name, content) {
        if (name === 'day') {
            if (this._checkIfEmptyContent(content)) {
                this._proceedCopy(name, content);
            } else {
                this.NotifyService.show('Nothing to copy.', 'error');
            }
        } else {
            this._proceedCopy(name, content);
        }
    }

    _proceedCopy(name, content) {
        this.LocalStorageData.setDataToLocalStorage(name, content);
        this.NotifyService.show('Food has been copied successfully.', 'copy');
    }

    _checkIfEmptyContent(content) {
        let i = 0;
        content.forEach(meal => {
            if (meal.dishes && meal.dishes.length > 0) i++
        });
        return !!i;
    }

}

Mealpler.service('CopyService', CopyService);