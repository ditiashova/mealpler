Mealpler.
    filter('monthDayth', function () {
        function monthDaythFilter(date) {
            return date.format("MMMM Do");
        }
        monthDaythFilter.$stateful = true;
        return monthDaythFilter;
    }).
    filter('fullDate', function () {
        function fullDateFilter(date) {
            return date.format("YYYY-M-D");
        }
        fullDateFilter.$stateful = true;
        return fullDateFilter;
    }).
    filter('dayName', function () {
        function dayNameFilter(date) {
            return date.format("dddd");
        }
        dayNameFilter.$stateful = true;
        return dayNameFilter;
    });

