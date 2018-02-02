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
    template: `<i class="fa fa-calendar"></i>{{ctrl}} {{ $ctrl.firstDate | monthDay }}th - {{ $ctrl.lastDate | monthDay }}th`
});