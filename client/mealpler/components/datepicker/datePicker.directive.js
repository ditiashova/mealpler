/*
Mealpler.directive('datePicker0', function () {
    const link = (scope, el, attrs, ctrl) => {
        //const datePickerCtrl = scope.datePickerCtrl;
        const targetInput = $('#' + attrs.name);

        refreshDatePicker(scope.startDate, attrs.single);

        scope.$on(EventType.WEEKSTART, (e, date) => {
            refreshDatePicker(date, attrs.single);
        });

        /!**
         *
         * @param {Moment} start
         * @param {Moment} end
         *!/
        function datePickerCallback (start, end) {
            scope.onUpdate(start);
            //scope.$apply();
        }

        function refreshDatePicker(date, isSingle) {
            targetInput.daterangepicker(
                ctrl.setDatePickerSettings(date, isSingle), datePickerCallback
            );
        }
    };

    return {
        restrict: 'E', //E
        transclude: true,
        scope: {
            single: '=',
            name: '=',
            startDate: '=',
            onUpdate: '=',
            endDate: '='
        },
        controller: 'DatePickerCtrl',
        template: `'ddasdasd'`,
        link: link
    };
});*/
