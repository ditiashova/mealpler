const Mealpler = angular.module('Mealpler', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'firebase',
    'ngMaterial', 'ngMessages']);
Mealpler
    .config(function() {
        moment.locale('dow', {
            week : {
                dow: 1,
            }
        });
        moment.locale('dow');
    })
    .config(function () {
        PNotify.prototype.options.delay = 3000;
        PNotify.prototype.options.animate_speed = "slow";
    });

Mealpler.config(function($stateProvider, $urlRouterProvider) {
    const weekState = {
        name: 'week',
        url: '/',
        templateUrl: 'scripts/components/main.tmpl.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    };

    $stateProvider.state(weekState);
    $urlRouterProvider.otherwise('/');
});