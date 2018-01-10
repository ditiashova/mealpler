Mealpler.directive('formValidation', function () {
    const link = (scope, el, attrs, controller) => {
        scope.form = scope.$parent.itemListForm;
        scope.currFormField = scope.form[attrs.inputname];
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            inputName: '='
        },
        templateUrl: 'scripts/components/meal/add/list/form-validation/form-validation.tmpl.html',
        link: link
    };
});