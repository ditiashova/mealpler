Mealpler.
    filter('monthDay', () => {
        function monthDaythFilter(date) {
            if (date) return date.format("MMMM Do");
        }
        monthDaythFilter.$stateful = true;
        return monthDaythFilter;
    }).
    filter('fullDate', () => {
        function fullDateFilter(date) {
            if (date) return date.format("YYYY-M-D");
        }
        fullDateFilter.$stateful = true;
        return fullDateFilter;
    }).
    filter('dayName', () => {
        function dayNameFilter(date) {
            if (date) return date.format("dddd");
        }
        dayNameFilter.$stateful = true;
        return dayNameFilter;
    });

