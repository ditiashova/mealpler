Mealpler.component('dishBlock', {
    bindings: {
        dish: '<',
        mealType: '<',
        date: '<'
    },
    require: {},
    transclude: true,
    controller: 'DishCtrl',
    templateUrl: 'scripts/components/dish/dish.tmpl.html',
});