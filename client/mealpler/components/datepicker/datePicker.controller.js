class DatePickerController {
    constructor ($scope) {
        Object.assign(this, {$scope});
        this.datePickerCallback = this._datePickerCallback.bind(this);

        this.$scope.$on(EventType.WEEKSTART, (e, date) => {
            this.refreshDatePicker(date, this.single);
        });
    }

    $onInit() {
        this.targetInput = $('#' + this.name);
        this.refreshDatePicker(this.startDate, this.single);
    }

    _datePickerCallback (start) {
        this.onUpdate(start);
    }

    refreshDatePicker(date, isSingle) {
        this.targetInput.daterangepicker(
            DatePickerController._setDatePickerSettings(date, isSingle), this.datePickerCallback
        );
    }

    static getLocalization() {
        return {
            "format": "DD/MM/YYYY",
            "firstDay": 1
        };
    }

    /**
     *
     * @param {Moment} start
     * @param {string} isSingle
     * @param {Moment || null} end
     * @return {{locale: {Object}|*, singleDatePicker: boolean, showDropdowns: boolean, startDate: *, endDate: null}}
     */
    static _setDatePickerSettings(start, isSingle, end = null) {
        const endDate = end ? end : !!isSingle ? null : angular.copy(start).add(WEEK_DURATION-1, 'day');
        return {
            "locale": DatePickerController.getLocalization(),
            "singleDatePicker": !!isSingle,
            "showDropdowns": true,
            "startDate": start,
            "endDate": endDate,
            "dateLimit": {
                "weeks": 2
            },
        }
    }
}

Mealpler.controller('DatePickerCtrl', DatePickerController);