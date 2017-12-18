Mealpler.directive( 'mainBlock', function () {
    const link = (scope, el, attrs, controller) => {

    };
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'scripts/components/main.tmpl.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        link: link
    };
});