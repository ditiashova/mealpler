Mealpler.directive('formValidation', function () {
    const link = (scope, el, attrs, ctrl) => {
        ctrl.form = scope.$parent.itemListForm;
        ctrl.currFormField = ctrl.form[ctrl.inputName];
    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: () => {},
        controllerAs: '$ctrl',
        bindToController: {
            inputName: '@'
        },
        templateUrl: 'scripts/components/meal/add/list/form-validation/form-validation.tmpl.html',
        link: link
    };
});