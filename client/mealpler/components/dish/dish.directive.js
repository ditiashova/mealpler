Mealpler.component('dishBlock', {
    bindings: {
        dish: '<',
        mealNo: '<',
        day: '<'
    },
    require: {
        MainCtrl: '^^mainBlock'
    },
    transclude: true,
    controller: 'DishCtrl',
    templateUrl: 'scripts/components/dish/dish.tmpl.html',
});