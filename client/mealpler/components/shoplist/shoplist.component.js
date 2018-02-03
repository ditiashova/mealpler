Mealpler.component('shopList', {
    bindings: {
        week: '<',
        onCloseShoplist: '<',
        opened: '<'
    },
    require: {},
    transclude: true,
    controller: 'ShoplistCtrl'
});