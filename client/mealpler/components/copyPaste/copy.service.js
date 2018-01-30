class CopyService {
    constructor (StorageService, notify, Local) {
        Object.assign(this, {StorageService, notify, Local});
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
                this.notify.show('Nothing to copy.', 'error');
            }
        } else {
            this.proceedCopy(name, content);
        }
    }

    proceedCopy(name, content) {
        this.Local.setDataToLocalStorage(name, content);
        this.notify.show('Food has been copied successfully.', 'copy');
    }

    checkIfEmptyContent(content) {
        let i = 0;
        content.forEach(meal => {
            if (meal.dishes && meal.dishes.length > 0) i++
        });
        return !!i;
    }

}

Mealpler.service('copy', CopyService);