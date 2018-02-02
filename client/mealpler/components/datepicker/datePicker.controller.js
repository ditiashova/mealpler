class DatePickerController {
    constructor ($scope) {
        Object.assign(this, {$scope});
        this.defaultWeekDuration = 7;
        //this.defaultWeekStartDate = moment().startOf('week');
        this.datePickerCallback = this._datePickerCallback.bind(this);
    }

    $onInit() {
        this.targetInput = $('#' + this.name);

        this.refreshDatePicker(this.startDate, this.single);

        this.$scope.$on(EventType.WEEKSTART, (e, date) => {
            this.refreshDatePicker(date, this.single);
        });

        /**
         *
         * @param {Moment} start
         * @param {Moment} end
         */

    }

    _datePickerCallback (start, end) {
        this.onUpdate(start);
        //scope.$apply();
    }

    refreshDatePicker(date, isSingle) {
        this.targetInput.daterangepicker(
            this.setDatePickerSettings(date, isSingle), this.datePickerCallback
        );
    }

    getLocalization() {
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
    setDatePickerSettings(start, isSingle, end = null) {
        const endDate = end ? end : !!isSingle ? null : angular.copy(start).add(this.defaultWeekDuration-1, 'day');
        return {
            "locale": this.getLocalization(),
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