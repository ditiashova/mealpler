Mealpler.service('DayModel', DayModel);

function DayModel () {
    this.createNewDay = (date, i) => {
        return {
            "id": i,
            "fullDate": moment(date).format("YYYY-M-D"),
            "dateObj": date,
            "mealsList": []
        }
    };
}