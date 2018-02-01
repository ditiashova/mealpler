Mealpler.component('dayManager', {
    bindings: {
        day: '<'
    },
    require: {},
    transclude: true,
    controller: 'DayCtrl',
    templateUrl: 'scripts/components/day/day.tmpl.html',
});