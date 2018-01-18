Mealpler.directive('datePicker', function () {
    const link = (scope, el, attrs, [dashboardCtrl, mainCtrl]) => {
        //const dashboardCtrl = controller;
        const dateCtrl = scope.dateCtrl;
        const startDate = dashboardCtrl.defaultWeekStartDate;

        dateCtrl.datePickerTarget = $('#' + attrs.name);
        dashboardCtrl.addDatePickerHandlers((startDate, endDate) => setDatePickerSettingsAndCallBack(startDate, endDate));

        setDatePickerSettingsAndCallBack(startDate);

        function setDatePickerSettingsAndCallBack(start, end) {
            dateCtrl.datePickerTarget.daterangepicker(setDatePickerSettings(start), datePickerCallback);
        }

        function setDatePickerSettings(start, end) {
            const endDate = end ? end : !!attrs.single ? null : angular.copy(start).add(dashboardCtrl.defaultWeekDuration-1, 'day');
            return {
                "locale": dateCtrl.getLocalization(),
                "singleDatePicker": !!attrs.single,
                "showDropdowns": true,
                "startDate": start,
                "endDate": endDate
            }
        }

        function datePickerCallback(start, end, label) {
            //refresh week only from directive placed in week tmpl

            const id = mainCtrl.uid;
            if (!!attrs.refreshWeek) {
                dashboardCtrl.runWeekMealsHandlers(null, start, id);
            }

            //fridge needs to be refreshed in both date pickers, but this check is still needed in case I'll decide to remove this logic etc.
            if (!!attrs.refreshFridge) {
                if (!!attrs.single) {
                    //if one date is chosen
                    const startOfWeek = start.startOf('week');
                    dashboardCtrl.runShopListHandlers(startOfWeek, dashboardCtrl.defaultWeekDuration, id);
                    dashboardCtrl.runDatePickerHandlers(start);
                } else {
                    let duration = end.diff(start, 'days')+1;
                    dashboardCtrl.runShopListHandlers(start, duration, id);
                    dashboardCtrl.runDatePickerHandlers(start, end);
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
        controllerAs: 'dateCtrl',
        link: link
    };
});