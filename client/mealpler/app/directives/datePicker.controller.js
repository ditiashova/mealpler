Mealpler.controller('DatePickerCtrl', DatePickerController);

function DatePickerController () {
    this.getLocalization = () => {
        return {
            "format": "DD/MM/YYYY",
            "firstDay": 1
        };
    };
}