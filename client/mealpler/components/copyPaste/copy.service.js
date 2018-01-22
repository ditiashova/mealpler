class CopyService {
    constructor (StorageService, notify) {
        Object.assign(this, {StorageService, notify});
    }

    /**
     *
     * @param {string} name
     * @param {Object} content
     */
    copyFood(name, content) {
        this.StorageService.setDataToLocalStorage(name, content);
        this.notify.show('Food has been copied successfully.', 'copy');
    }

}

Mealpler.service('copy', CopyService);