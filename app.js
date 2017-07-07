let Mealpler = angular.module('Mealpler', [ngRoute]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'src/dashboard/tmpl/dashboard.tmpl.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard'
            })
        .otherwise({redirectTo: '/'})
});