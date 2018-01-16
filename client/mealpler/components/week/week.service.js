class WeekService {
    constructor(DayModel) {
        Object.assign(this, {DayModel});
    }

    _getWeekStart(date) {
        return this.DayModel.createNewDay(moment(date).startOf('week'), 0);
    };

    _getWeekEnd(date, weekDuration) {
        return this.DayModel.createNewDay(moment(date).startOf('week').add(weekDuration, 'day'), weekDuration);
    }
}
Mealpler.service('WeekService', WeekService);