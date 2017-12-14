Mealpler.service('DayModel', DayModel);

function DayModel () {
    this.createNewDay = (date, i) => {
        i = i || moment(date).weekday();
        return {
            "id": i,
            "fullDate": moment(date).format("YYYY-M-D"),
            "dateObj": date,
            "mealsList": []
        }
    };
}
//todo remove
/*
class Day {
    constructor(id, date) {
        this.id = id;
        this.fullDate = moment(date).format("YYYY-M-D");
        this.dateObj = date;
        this.mealsList = [];
    }
}

class Weekend extends Day {
    constructor(id, date, mealsOut) {
        super(id, date);

        this.mealsOut = mealsOut;
    }
}

new Weekend(1, "date", ["salateira"])*/


