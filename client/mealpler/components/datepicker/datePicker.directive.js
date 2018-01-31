Mealpler.directive('datePicker', function () {
    const link = (scope, el, attrs, [dashboardCtrl, mainCtrl]) => {
        const datePickerCtrl = scope.datePickerCtrl;
        const targetInput = $('#' + attrs.name);

        dashboardCtrl.addDatePickerHandlers((startDate, endDate) => {
            const isSingle = attrs.single;
            targetInput.daterangepicker(
                datePickerCtrl.setDatePickerSettings(startDate, isSingle, endDate), datePickerCallback
            );
        });

        targetInput.daterangepicker(
            datePickerCtrl.setDatePickerSettings(scope.startDate, attrs.single), datePickerCallback
        );

        /**
         *
         * @param {Moment} start
         * @param {Moment} end
         */
        function datePickerCallback (start, end) {
            scope.onUpdate(start);
            //refresh week only from directive placed in week tmpl



            /*if (!!attrs.refreshWeek) {
                dashboardCtrl.runWeekMealsHandlers(void 0, start);
                //scope.onRefreshWeek(void 0, start);
                //scope.onChangeStartDate(void 0, start);
            }*/

            //fridge needs to be refreshed in both date pickers, but this check is still needed in case I'll decide to remove this logic etc.
            /*if (!!attrs.refreshFridge) {
                if (!!attrs.single) {
                    //if one date is chosen we need to find the start of week for this date to load data for specific week
                    const startOfWeek = start.startOf('week');

                    //scope.onChangeStartDate(void 0, startOfWeek);
                    dashboardCtrl.runDatePickerHandlers(start);
                    dashboardCtrl.runShopListHandlers(startOfWeek, datePickerCtrl.defaultWeekDuration);
                    //scope.onRefreshFridge(startOfWeek, datePickerCtrl.defaultWeekDuration);
                } else {
                    const duration = end.diff(start, 'days')+1;
                    //scope.onChangeRange(duration);
                    //if dates' range is chosen we can leave start date as received
                    //let duration = end.diff(start, 'days')+1;
                    //scope.onChangeRange(duration);
                    //scope.onChangeStartDate(void 0, start);
                    dashboardCtrl.runDatePickerHandlers(start, end);
                    dashboardCtrl.runShopListHandlers(start, duration);
                    //scope.onRefreshFridge(start, duration);
                }
            }*/
            scope.$apply();
        }
    };

    return {
        restrict: 'C',
        transclude: true,
        scope: {
            single: '=',
            name: '=',
            startDate: '=',
            onUpdate: '='
        },
        require: ['^^dashboard', '^^mainBlock'],
        controller: 'DatePickerCtrl',
        controllerAs: 'datePickerCtrl',
        link: link
    };
});