class CopyService {
    constructor (StorageService, NotifyService, LocalStorageData) {
        Object.assign(this, {StorageService, NotifyService, LocalStorageData});
    }

    /**
     *
     * @param {string} name
     * @param {Object} content
     */
    copyFood(name, content) {
        if (name === 'day') {
            if (this.checkIfEmptyContent(content)) {
                this.proceedCopy(name, content);
            } else {
                this.NotifyService.show('Nothing to copy.', 'error');
            }
        } else {
            this.proceedCopy(name, content);
        }
    }

    proceedCopy(name, content) {
        this.LocalStorageData.setDataToLocalStorage(name, content);
        this.NotifyService.show('Food has been copied successfully.', 'copy');
    }

    checkIfEmptyContent(content) {
        let i = 0;
        content.forEach(meal => {
            if (meal.dishes && meal.dishes.length > 0) i++
        });
        return !!i;
    }

}

Mealpler.service('CopyService', CopyService);