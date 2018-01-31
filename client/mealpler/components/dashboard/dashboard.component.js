Mealpler.component('dashboard', {
    bindings: {},
    require: {
        MainCtrl: '^^mainBlock'
    },
    transclude: true,
    controller: 'DashboardCtrl',
    templateUrl: 'scripts/components/dashboard/dashboard.html',
});