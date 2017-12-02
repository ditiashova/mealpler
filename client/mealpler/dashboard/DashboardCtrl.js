Mealpler.controller('DashboardCtrl', DashboardController);

function DashboardController () {
    const today = moment();
    this.weekStartDate = today.startOf('week');
    this.weekLength = 7;
}