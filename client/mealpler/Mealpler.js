let Mealpler = angular.module('Mealpler', ['ngAnimate', 'ngRoute', 'requestSrvc', 'ui.bootstrap', 'ui.bootstrap.tpls']);
Mealpler.
    config(function ($routeProvider) {
        $routeProvider
            .when('/',
                {
                    templateUrl: 'scripts/dashboard/dashboard.html',
                    controller: 'DashboardCtrl',
                    controllerAs: 'dashboard'
                })
            .otherwise({redirectTo: '/'});
}).
    config(function() {
        moment.locale('dow', {
            week : {
                dow: 1,
            }
        });
        moment.locale('dow');
});

