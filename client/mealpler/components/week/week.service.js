class WeekService {
    constructor(DayModel) {
        Object.assign(this, {DayModel});
    }

    _getWeekStart(date) {
        const startOfWeek = moment(date).startOf('week');
        return this.DayModel.createNewDay(startOfWeek, 0);
    };

    _getWeekEnd(date, weekDuration) {
        const endOfWeek = moment(date).startOf('week').add(weekDuration - 1, 'day');
        return this.DayModel.createNewDay(endOfWeek, weekDuration);
    }

    getWeekList(start, duration) {
        const weekList = [];

        for (let i = 0; i < duration; i++) {
            weekList.push(moment(start).add(i, 'days').format("YYYY-M-D"));
        }

        return weekList;
    }
}
Mealpler.service('WeekService', WeekService);