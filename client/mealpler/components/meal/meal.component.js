Mealpler.component('mealManager', {
    bindings: {
        meal: '<',
        day: '<'
    },
    require: {
        MainCtrl: '^^mainBlock'
    },
    transclude: true,
    controller: 'MealCtrl',
    templateUrl: 'scripts/components/meal/meal.tmpl.html',
});