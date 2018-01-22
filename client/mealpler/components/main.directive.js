Mealpler.directive( 'mainBlock', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'scripts/components/main.tmpl.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    };
});