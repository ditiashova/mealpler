Mealpler.directive('datePicker', function () {
    const link = (scope, el, attrs, controller) => {
        const weekCtrl = controller;
        const dateCtrl = scope.dateCtrl;
        const datePickerTarget = $('#' + attrs.name);

        dateCtrl.pickerName = attrs.name;
        datePickerTarget.daterangepicker({
            "locale": dateCtrl.getLocalization(),
            "singleDatePicker": !attrs.single,
            "showDropdowns": true,
            "startDate": weekCtrl.weekStartDate
        }, (start, end, label) => {
            if (attrs.refreshFridge) {

            }
            weekCtrl.init(start);
            scope.$apply();
        });


    };

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            single: '=',
            refreshFridge: '=',
            name: '='
        },
        require: '^^weekManager',
        controller: 'DatePickerCtrl',
        controllerAs: 'dateCtrl',
        templateUrl: 'scripts/app/directives/datePicker.tmpl.html',
        link: link
    };
});