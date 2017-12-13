Mealpler.directive('datePicker', function () {
    const link = (scope, el, attrs, controller) => {
        const dashboardCtrl = controller;
        const dateCtrl = scope.dateCtrl;
        const startDate = dashboardCtrl.getWeekStartDate();

        dateCtrl.datePickerTarget = $('#' + attrs.name);
        dateCtrl.datePickerTarget.daterangepicker({
            "locale": dateCtrl.getLocalization(),
            "singleDatePicker": !!attrs.single,
            "showDropdowns": true,
            "startDate": startDate
        }, (start, end, label) => {

            //refresh week only from directive placed in week tmpl
            if (!!attrs.refreshWeek) {
                dashboardCtrl.refreshMealDataForWeek(start);
            }

            //fridge needs to be refreshed in both date pickers, but this check is still needed in case I'll decide to remove this logic etc.
            if (!!attrs.refreshFridge) {
                if (!!attrs.single) {
                    //if one date is chosen
                    const startOfWeek = start.startOf('week');
                    dashboardCtrl.refreshShopList(startOfWeek, dashboardCtrl.defaultWeekDuration);
                } else {
                    let duration = end.diff(start, 'days');
                    dashboardCtrl.refreshShopList(start, duration);
                }
            }
            scope.$apply();
        });


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
        require: '^^dashboard',
        controller: 'DatePickerCtrl',
        controllerAs: 'dateCtrl',
        link: link
    };
});