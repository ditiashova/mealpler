class DayModel {
    constructor () {}

    createNewDay(date, i) {
        i = i || moment(date).weekday();
        return {
            "id": i,
            "fullDate": moment(date).format("YYYY-M-D"),
            "dateObj": date,
            "mealsList": []
        }
    }
}

Mealpler.service('DayModel', DayModel);