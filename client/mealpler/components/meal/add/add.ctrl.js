class AddMealController  {
    constructor (NotifyService, DayService) {
        Object.assign(this, {NotifyService, DayService});
        this.addProduct = true;
        this.newProducts = new Dish(1);
        this.newRecipe = new Dish(2);
        [this.newProducts, this.newRecipe].forEach(a => this.createNewItem(a));
        this.save = this.saveNew.bind(this);
        this.dismissModal = this.dismiss.bind(this);
    }

    toggleModal() {
        this.addProduct = !this.addProduct;
    };

    dismiss(reason) {
        this.modalInst.dismiss(reason);
    };

    saveNew(type, newItems) {
        this.DayService.updateDayInfo(newItems, this.date, type, this.mealNo)
            .then(() => this.modalInst.close())
            .then(() => this.NotifyService.show('New food has been added.', 'add'))
            .catch((e) => console.log('Saving new meal failed due to: '+ e.message));
    };

    createNewItem(forItems)  {
        if (forItems.type === DishType.RECIPE) {
            forItems.components.push(new Ingredient());
        } else if (forItems.type === DishType.PRODUCT) {
            forItems.components.push(new Dish());
        }
    }
}

Mealpler.controller('AddMealCtrl', AddMealController);