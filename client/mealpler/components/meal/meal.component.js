Mealpler.component('mealManager', {
    bindings: {
        food: '<',
        day: '<'
    },
    require: {
        MainCtrl: '^^mainBlock'
    },
    transclude: true,
    controller: 'MealCtrl',
    templateUrl: 'scripts/components/meal/meal.tmpl.html',
});