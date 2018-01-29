Mealpler.component('dayManager', {
    bindings: {
        day: '<'
    },
    require: {
        MainCtrl: '^^mainBlock'
    },
    transclude: true,
    controller: 'DayCtrl',
    templateUrl: 'scripts/components/day/day.tmpl.html',
});