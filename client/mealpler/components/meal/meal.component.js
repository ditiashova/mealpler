Mealpler.component('mealManager', {
    bindings: {
        meal: '<',
        day: '<'
    },
    require: {},
    transclude: true,
    controller: 'MealCtrl',
    templateUrl: 'scripts/components/meal/meal.tmpl.html',
});