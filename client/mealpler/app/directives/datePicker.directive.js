Mealpler.directive('datePicker', function () {
    const link = (scope, el, attrs, controller) => {
        const localization = {
            "format": "DD/MM/YYYY",
            "firstDay": 1
        };
        const WeekCtrl = controller;
        scope.pickerName = attrs.name;
        const datePickerTarget = $('#' + attrs.name);
        datePickerTarget.daterangepicker({
            "locale": localization,
            "singleDatePicker": !attrs.single,
            "showDropdowns": true,
            "startDate": WeekCtrl.weekStartDate
        }, (start, end, label) => {
            if (attrs.refreshFridge) {

            }
            WeekCtrl.weekStartDate = WeekCtrl.setNewWeekStart(start);
            WeekCtrl.init(WeekCtrl.weekStartDate);
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
        templateUrl: 'scripts/app/directives/datePicker.tmpl.html',
        link: link
    };
});