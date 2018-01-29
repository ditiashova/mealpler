Mealpler.component('newFood', {
    bindings: {
        food: '=',
        onSave: '<',
        onCancel: '<',
        onCreateNew: '<'
    },
    transclude: true,
    controller: 'NewFoodCtrl',
    templateUrl: 'scripts/components/meal/add/list/new-food.tmpl.html',
});