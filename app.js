let Mealpler = angular.module('Mealpler', [ngRoute]);
Mealpler.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'src/dashboard/tmpl/dashboard.tmpl.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard'
            })
        .otherwise({redirectTo: '/'})
});