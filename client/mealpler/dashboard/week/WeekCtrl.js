Mealpler.controller('WeekCtrl', function (WeekModel) {
    let week = this;
    week.days = WeekModel.weekDays();
});