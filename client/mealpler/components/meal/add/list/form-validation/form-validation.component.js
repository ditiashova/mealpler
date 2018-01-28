Mealpler.component('formValidation', {
    bindings: {
        input: '@inputName'
    },
    transclude: true,
    controller: () => {},
    require: {
        form: '^form'
    },
    templateUrl: 'scripts/components/meal/add/list/form-validation/form-validation.tmpl.html',
});