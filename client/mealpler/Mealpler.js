let Mealpler = angular.module('Mealpler', ['ngAnimate', 'ngRoute', 'requestSrvc', 'ui.bootstrap', 'ui.bootstrap.tpls',
    'mwl.calendar']);
Mealpler.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: 'mealpler/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'
            })
        .otherwise({redirectTo: '/'});
})
    .config(['calendarConfig', function(calendarConfig) {

        calendarConfig.dateFormatter = 'moment'; // use moment to format dates
        calendarConfig.templates.calendarWeekView = 'mealpler/dashboard/week/weekTemplate.html';

    }]);