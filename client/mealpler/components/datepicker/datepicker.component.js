Mealpler.component('datePicker', {
    bindings: {
        single: '<',
        name: '<',
        firstDate: '=',
        onUpdate: '<',
        lastDate: '='
    },
    require: {},
    transclude: true,
    controller: 'DatePickerCtrl',
    template: `{{ctrl}} {{ $ctrl.firstDate | monthDay }} - {{ $ctrl.lastDate | monthDay }}`
});