const Mealpler = angular.module('Mealpler', ['ngRoute', 'requestSrvc', 'ui.bootstrap', 'ui.bootstrap.tpls']);
Mealpler.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'src/partials/dashboard/dashboard.html',
                controller: 'WeekPlannerCtrl',
                controllerAs: 'weekPlanner'
            })
        .otherwise({redirectTo: '/'});
});