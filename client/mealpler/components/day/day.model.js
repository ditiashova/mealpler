class DayModel {
    constructor () {}

    createNewDay(date, i) {
        i = i || moment(date).weekday();
        return {
            "id": i,
            "fullDate": moment(date).format("YYYY-M-D"),
            "dateName": moment(date).format("dddd"),
            "dateMonthDate": moment(date).format("MMMM Do"),
            "mealsList": []
        }
    }
}

Mealpler.service('DayModel', DayModel);