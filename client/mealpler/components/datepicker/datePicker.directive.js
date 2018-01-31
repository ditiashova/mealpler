Mealpler.directive('datePicker', function () {
    const link = (scope, el, attrs, ctrl) => {
        const datePickerCtrl = scope.datePickerCtrl;
        const targetInput = $('#' + attrs.name);

        refreshDatePicker(scope.startDate, attrs.single);

        scope.$on('newFirstDate', (e, date) => {
            refreshDatePicker(date, attrs.single);
        });

        /*targetInput.daterangepicker(
            datePickerCtrl.setDatePickerSettings(scope.startDate, attrs.single), datePickerCallback
        );*/



        /**
         *
         * @param {Moment} start
         * @param {Moment} end
         */
        function datePickerCallback (start, end) {
            scope.onUpdate(start);
            //scope.$apply();
        }

        function refreshDatePicker(date, isSingle) {
            targetInput.daterangepicker(
                datePickerCtrl.setDatePickerSettings(date, isSingle), datePickerCallback
            );
        }
    };

    return {
        restrict: 'C', //E
        transclude: true,
        scope: {
            single: '=',
            name: '=',
            startDate: '=',
            onUpdate: '='
        },
        controller: 'DatePickerCtrl',
        controllerAs: 'datePickerCtrl',
        link: link
    };
});