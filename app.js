let Mealpler = angular.module('Mealpler', ['ngRoute', 'requestExecutor', 'ui.bootstrap', 'ui.bootstrap.tpls']);
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