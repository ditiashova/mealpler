Mealpler.controller('MainCtrl', MainController);

function MainController () {
    this.title = Mealpler.titles;
    this.openShopList = false;
    this.toggleShopList = () => {
        this.openShopList = !this.openShopList;
    };
}