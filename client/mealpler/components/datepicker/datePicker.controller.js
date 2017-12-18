class DatePickerController {
    constructor () {}

    getLocalization() {
        return {
            "format": "DD/MM/YYYY",
            "firstDay": 1
        };
    }
}

Mealpler.controller('DatePickerCtrl', DatePickerController);