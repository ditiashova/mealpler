let Mealpler = angular.module('Mealpler', ['ngRoute', 'requestSrvc', 'ui.bootstrap', 'ui.bootstrap.tpls']);
Mealpler.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'mealpler/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'
            })
        .otherwise({redirectTo: '/'});
});