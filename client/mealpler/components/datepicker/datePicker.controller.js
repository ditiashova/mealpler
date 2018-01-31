class DatePickerController {
    constructor () {
        this.defaultWeekDuration = 7;
        //this.defaultWeekStartDate = moment().startOf('week');
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