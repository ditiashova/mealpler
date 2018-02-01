Mealpler.component('mealManager', {
    bindings: {
        meal: '<',
        date: '<'
    },
    require: {},
    transclude: true,
    controller: 'MealCtrl',
    templateUrl: 'scripts/components/meal/meal.tmpl.html',
});