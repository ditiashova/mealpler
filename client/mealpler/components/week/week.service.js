class WeekService {
    constructor(DayModel) {
        Object.assign(this, {DayModel});
    }

    _getWeekStart(date) {
        const startOfWeek = moment(date).startOf('week');
        return this.DayModel.createNewDay(startOfWeek, 0);
    };

    _getWeekEnd(date, weekDuration) {
        const endOfWeek = moment(date).startOf('week').add(weekDuration, 'day');
        return this.DayModel.createNewDay(endOfWeek, weekDuration);
    }
}
Mealpler.service('WeekService', WeekService);