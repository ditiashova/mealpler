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
        PNotify.prototype.options.delay = 300000;
        PNotify.prototype.options.animate_speed = "slow";
    });