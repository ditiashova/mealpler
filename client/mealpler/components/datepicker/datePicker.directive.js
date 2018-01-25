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
            datePickerCtrl.setDatePickerSettings(datePickerCtrl.defaultWeekStartDate, attrs.single), datePickerCallback
        );

        /**
         *
         * @param {Moment} start
         * @param {Moment} end
         */
        function datePickerCallback (start, end) {
            //refresh week only from directive placed in week tmpl
            const id = mainCtrl.uid;

            if (!!attrs.refreshWeek) {
                dashboardCtrl.runWeekMealsHandlers(void 0, start, id);
            }

            //fridge needs to be refreshed in both date pickers, but this check is still needed in case I'll decide to remove this logic etc.
            if (!!attrs.refreshFridge) {
                if (!!attrs.single) {
                    //if one date is chosen we need to find the start of week for this date to load data for specific week
                    const startOfWeek = start.startOf('week');
                    dashboardCtrl.runDatePickerHandlers(start);
                    dashboardCtrl.runShopListHandlers(startOfWeek, datePickerCtrl.defaultWeekDuration, id);
                } else {
                    //if dates' range is chosen we can leave start date as received
                    let duration = end.diff(start, 'days')+1;
                    dashboardCtrl.runDatePickerHandlers(start, end);
                    dashboardCtrl.runShopListHandlers(start, duration, id);
                }
            }
            scope.$apply();
        }
    };

    return {
        restrict: 'C',
        transclude: true,
        scope: {
            single: '=',
            refreshFridge: '=',
            name: '=',
            refreshWeek: '='
        },
        require: ['^^dashboard', '^^mainBlock'],
        controller: 'DatePickerCtrl',
        controllerAs: 'datePickerCtrl',
        link: link
    };
});