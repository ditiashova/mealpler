Mealpler.directive('formValidation', function () {
    const link = (scope, el, attrs, controller) => {
        scope.form = scope.$parent.itemListForm;
        scope.currFormField = scope.form[attrs.inputName];
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            inputName: '@'
        },
        controller: () => {},
        controllerAs: 'validationCtrl',
        templateUrl: 'scripts/components/meal/add/list/form-validation/form-validation.tmpl.html',
        link: link
    };
});